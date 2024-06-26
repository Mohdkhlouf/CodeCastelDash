import { TextField, Button, Box } from "@mui/material";
import styles from "./addchapter.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AddChapter = ({ setOpen }) => {
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterText, setChapterText] = useState("");
  const [chapterThumbnail, setChapterThumbnail] = useState("");
  const [chapterAnimation, setChapterAnimation] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chapterTitle) {
      mutation.mutate({ name: chapterTitle });
    }
  };

  return (
    <div className={styles.addtable}>
      <Box sx={{ height: "100%", width: "100%" }}>
        <form onSubmit={handleSubmit} className={styles.addform}>
          <TextField
            onChange={(e) => {
              setChapterTitle(e.target.value);
            }}
            value={chapterTitle}
            id="outlined-basic"
            label="Category Name"
            variant="outlined"
            required
          />
          <TextField
            onChange={(e) => {
              setChapterText(e.target.value);
            }}
            value={chapterText}
            id="outlined-basic"
            label="Chapter Text"
            variant="outlined"
            required
          />
          <TextField
            onChange={(e) => {
              setChapterThumbnail(e.target.value);
            }}
            value={chapterThumbnail}
            id="outlined-basic"
            label="Chapter Thumbnail"
            variant="outlined"
            required
          />
          <TextField
            onChange={(e) => {
              setChapterAnimation(e.target.value);
            }}
            value={chapterAnimation}
            id="outlined-basic"
            label="Chapter Animation"
            variant="outlined"
            required
          />
          <div className={styles.addbuttons}>
            <Button type="submit" className={styles.button}>
              Submit
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default AddChapter;
