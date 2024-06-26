"use client";
import React from "react";
import styles from "./addcategory.module.css";
import Search from "@/app/components/dashboard/search/search";
import { TextField } from "@mui/material";
const AddCategoryPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["form-section"]}>
        <div className={styles.thumbnail}></div>
        <div className={styles.form}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
