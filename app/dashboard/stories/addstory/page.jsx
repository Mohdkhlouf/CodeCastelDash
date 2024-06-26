// AddStories.jsx
"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import useFileUpload from "@/app/hooks/useFileUpload.jsx";
import styles from "@/app/dashboard/stories/addstory/addstory.module.css";

const imagePlaceHolder = "/imageplaceholder200x200.png";

const AddStories = ({ setOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [storyThumbnail, setStoryThumbnail] = useState(null);
  const [thumbnailViewer, setThumbnailViewer] = useState(imagePlaceHolder);
  const [categoryId, setCategoryId] = useState("");
  const [chapters, setChapters] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { uploadFile } = useFileUpload();
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/categories`
      );
      return response.json();
    },
  });

  const storyMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stories/stories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["stories"]);
      setSnackbarMessage("Story submitted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setStoryThumbnail(null);
      setThumbnailViewer(imagePlaceHolder);
      setCategoryId(""); // Set to initial value or leave empty, based on your requirements
      setChapters([]); // Set to initial value or leave empty, based on your requirements
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !storyThumbnail || !categoryId) {
      setSnackbarMessage("Please fill all fields and add a thumbnail image.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setIsSubmitting(true);

    uploadFile(storyThumbnail)
      .then((thumbnailUrl) => submitData(thumbnailUrl))
      .catch((error) => {
        console.error("Error:", error);
        setSnackbarMessage("Error submitting the story.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      })
      .finally(() => setIsSubmitting(false));
  };

  const submitData = (thumbnailUrl) => {
    const data = {
      title,
      description,
      storyThumbnail: thumbnailUrl,
      categoryId,
    };

    const ExistingStories = queryClient.getQueryData(["stories"]) || [];
    const isDuplicate = ExistingStories.some(
      (story) => story.title === title && story.description === description
    );

    if (isDuplicate) {
      setSnackbarMessage("This story already exists.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return Promise.reject("Duplicate story");
    }

    return storyMutation.mutateAsync(data);
  };

  const handleImageChange = (e) => {
    setStoryThumbnail(e.target.files[0]);
    setThumbnailViewer(URL.createObjectURL(e.target.files[0]));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div className={styles.tablel}>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-section"]}>
          <Box width="50%">
            <div className={styles.form}>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                id="outlined-basic"
                label="Story Title"
                variant="outlined"
                required
              />
              <TextField
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                id="outlined-basic"
                label="Description"
                multiline
                rows={4}
                required
              />
              <FormControl fullWidth>
                <InputLabel id="story-category-label">Category</InputLabel>
                <Select
                  labelId="story-category-label"
                  id="story-category"
                  value={categoryId}
                  label="Story Category"
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  {categories.categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </Box>
          <Box width="50%">
            <div className={styles.thumbnail}>
              <h3>Add your story thumbnail please</h3>
              <span>size must be 200X200</span>
              <Image
                width="200"
                height="200"
                src={thumbnailViewer}
                alt="thumbnail"
              />
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageChange}
                required
              />
            </div>
          </Box>
        </div>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddStories;
