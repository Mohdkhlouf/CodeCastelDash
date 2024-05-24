"use client";
import * as React from "react";
import Search from "../../components/dashboard/search/search.jsx";
import styles from "./chapters.module.css";

const ChaptersPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a story.."} />
      </div>
      <div className={styles.table}></div>
    </div>
  );
};

export default ChaptersPage;
