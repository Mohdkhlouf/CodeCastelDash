"use client";
import * as React from "react";
import styles from "./stories.module.css";
import Search from "../../components/dashboard/search/search.jsx";

const storiesPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a story.."} />
      </div>
      <div className={styles.table}></div>
    </div>
  );
};

export default storiesPage;
