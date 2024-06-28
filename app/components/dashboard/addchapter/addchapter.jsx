import { TextField, Button, Box } from "@mui/material";
import styles from "./addchapter.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import useFileUpload from "@/app/hooks/useFileUpload";

const imagePlaceHolder = "/imageplaceholder200x200.png";

const AddChapter = ({ setOpen, storyId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [animation, setAnimation] = useState("");
  const [thumbnailViewer, setThumbnailViewer] = useState(imagePlaceHolder);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();
  const { uploadFile } = useFileUpload();

  const chapterMutation = useMutation({
    mutationFn: async (chapter) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chapters/chapter`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(chapter),
          }
        );
        return response.json();
      } catch (error) {
        console.log("Error:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chapters"]);
      setOpen(false); // Close the form on success
    },
  });

  const handleImageChange = (e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailViewer(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !thumbnail || !animation) {
      return;
    }

    setIsSubmitting(true);

    uploadFile(thumbnail)
      .then((thumbnailUrl) => submitData(thumbnailUrl))
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setIsSubmitting(false));
  };

  const submitData = (thumbnailUrl) => {
    const data = {
      title,
      content,
      animation,
      thumbnail: thumbnailUrl,
      storyId,
    };

    return chapterMutation.mutateAsync(data);
  };

  return (
    <div className={styles.addTable}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <Box width="50%">
            <div className={styles.form}>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                id="outlined-basic"
                label="Chapter Title"
                variant="outlined"
                required
                className={styles.textField}
              />
              <TextField
                onChange={(e) => setContent(e.target.value)}
                value={content}
                id="outlined-basic"
                label="Chapter Content"
                multiline
                rows={4}
                required
                className={styles.textField}
              />
              <TextField
                onChange={(e) => setAnimation(e.target.value)}
                value={animation}
                id="outlined-basic"
                label="Chapter Animation"
                variant="outlined"
                required
                className={styles.textField}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </Box>
          <Box width="50%">
            <div className={styles.thumbnail}>
              <h3>Add your story thumbnail please</h3>
              <span>Size must be 200x200</span>
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
    </div>
  );
};

export default AddChapter;
