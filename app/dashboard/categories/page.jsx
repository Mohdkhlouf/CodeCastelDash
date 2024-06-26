"use client";
import * as React from "react";
import Search from "../../components/dashboard/search/search.jsx";
import styles from "./categories.module.css";
import DataTable from "@/app/components/dashboard/datatable/datatable.jsx";
import { useQuery } from "@tanstack/react-query";
import AddCategory from "@/app/components/dashboard/addcategory/addcategory.jsx";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import withAuth from "@/app/utils/withAuth.js";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const CategoriesPAge = () => {
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    try {
      setOpen(true);
    } catch (e) {
      return console.log("error", e);
    }
  };
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      fetch(
        "https://code-castle-backend.vercel.app/api/v1/categories/categories"
      ).then((res) => res.json()),
    queryKey: ["categories"],
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  const { categories } = data;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a Category.."} />

        <button
          className={styles["add-button"]}
          onClick={(e) => {
            e.defaultPrevented;
            handleAdd();
          }}
        >
          New Category
        </button>
      </div>

      <div className={styles.table}>
        <div>
          {open && <AddCategory setOpen={setOpen} />}
          <h1 className={styles["page-title"]}>Categories</h1>

          <DataTable data={categories} slug="categories" />
        </div>
      </div>
    </div>
  );
};

export default withAuth(CategoriesPAge);
