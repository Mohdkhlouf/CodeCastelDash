"use client";
import * as React from "react";
import Search from "../../components/dashboard/search/search.jsx";
import styles from "./categories.module.css";

const CategoriesPAge = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a Category.."} />
      </div>
      <div className={styles.table}></div>
    </div>
  );
};

export default CategoriesPAge;
