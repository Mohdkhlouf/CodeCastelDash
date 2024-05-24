"use client";
import React from "react";
import styles from "./addcategory.module.css";

const AddCategoryPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles["form-section"]}>
        <div className={styles.thumbnail}></div>
        <div className={styles.form}></div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
