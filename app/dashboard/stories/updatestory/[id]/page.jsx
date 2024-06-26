// AddStories.jsx
"use client";
import React, { useEffect, useState } from "react";
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
import useFetchSingleData from "@/app/hooks/useFetchSingleData";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const FetchStoryData = () => {
    const {
      data: storyData,
      error: storyError,
      isloading: storyIsLoading,
    } = useFetchSingleData(id);
    if (storyIsLoading) {
      return <p>Loading...</p>;
    }
    if (storyError) {
      return <p>Error loading data: {storyError.message}</p>;
    }
    if (!storyData || !storyData.story) {
      return <p>No story found</p>;
    }

    return storyData;
  };
  const FeatchedStory = FetchStoryData();

  const FetchCategorydata = () => {
    const {
      data: categories,
      isLoading: cateogriesIsloading,
      error: categoriesError,
    } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const response = await fetch(
          `https://code-castle-backend.vercel.app/api/v1/categories/categories`
        );
        return response.json();
      },
    });
    if (cateogriesIsloading) return <div>Loading...</div>;
    if (categoriesError) return <div>Error loading categories</div>;

    return categories;
  };
  const FetchedCategory = FetchCategorydata();

  useEffect(() => {
    if (FeatchedStory?.story) {
      setTitle(FeatchedStory.story.title);
      setDescription(FeatchedStory.story.description);
      setCategoryId(FeatchedStory.story.categoryId || "");
      setThumbnailViewer(FeatchedStory.story.storyThumbnail);
      setStoryThumbnail(FeatchedStory.story.storyThumbnail);
    }
  }, [FeatchedStory]);

  const StoryMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stories/stories/${id}`,
        {
          method: "PUT",
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
      setOpenSnackbar(false);
      // Reset form fields after successful submission
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await uploadFile(storyThumbnail)
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

    return StoryMutation.mutateAsync(data);
  };

  const handleImageChange = async (e) => {
    await setStoryThumbnail(e.target.files[0]);
    await setThumbnailViewer(URL.createObjectURL(e.target.files[0]));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

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
                  {FetchedCategory?.categories?.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
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
