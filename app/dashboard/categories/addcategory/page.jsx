"use client";
import React from "react";
import styles from "./addcategory.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
const AddCategoryPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles["form-section"]}>
        <div className={styles.thumbnail}>
          <Box></Box>
        </div>
        <div className={styles.form}>
          <FormControl>
            <TextField
              id="categoryTitle"
              label="Category Title"
              variant="outlined"
            />
          </FormControl>

          <FormControl>
            <TextField
              id="Category description"
              label="Category Description"
              multiline
              rows={4}
              defaultValue="What is this Category about?"
            />
          </FormControl>
          <Button variant="contained" endIcon={<SendIcon />}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
