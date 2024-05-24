"use client";
import React from "react";
import styles from "./addstory.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const AddStoryPage = () => {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles["form-section"]}>
        <div className={styles.thumbnail}>
          <Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={""}
            >
              Upload Thumbnail
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
        </div>
        <div className={styles.form}>
          <FormControl>
            <TextField id="storyTitle" label="Story Title" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="categoty-label">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={10}>Happy Stories</MenuItem>
              <MenuItem value={20}>Fairy Tail Stories</MenuItem>
              <MenuItem value={30}>Technical Stories</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              id="story description"
              label="Story Description"
              multiline
              rows={4}
              defaultValue="What is the story about?"
            />
          </FormControl>
          <Button variant="contained" endIcon={""}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddStoryPage;
