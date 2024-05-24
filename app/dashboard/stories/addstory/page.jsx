"use client";
import React from "react";
import styles from "./addstory.module.css";

const AddStoryPage = () => {
  const [category, setCategory] = React.useState("");

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

export default AddStoryPage;
