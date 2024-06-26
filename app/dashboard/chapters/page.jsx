"use client";
import * as React from "react";
import Search from "../../components/dashboard/search/search.jsx";
import styles from "./chapters.module.css";
import Link from "next/link.js";
import DataTable from "@/app/components/dashboard/datatable/datatable.jsx";
import UseFetchData from "@/app/hooks/useFetchData.jsx";
import { useState, useEffect } from "react";
const slug = "chapters";

const ChaptersPage = () => {
  const [chaptersData, setChaptersData] = useState([]);
  const { data, isLoading, error } = UseFetchData(slug);

  useEffect(() => {
    if (data && data.chapters) {
      setChaptersData(data.chapters);
    }
  }, [data]);

  if (isLoading) {
    return <div className={styles.loading}>Loading..</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a chapter.."} />
        <Link href="/dashboard/chapters/addchapter">
          <button className={styles["add-button"]}>New chapter</button>
        </Link>
      </div>
      <div className={styles.table}>
        <DataTable data={chaptersData} slug={"chapters"} />
      </div>
    </div>
  );
};

export default ChaptersPage;
