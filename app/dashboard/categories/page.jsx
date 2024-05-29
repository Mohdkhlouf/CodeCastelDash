"use client";
import * as React from "react";
import Search from "../../components/dashboard/search/search.jsx";
import styles from "./categories.module.css";
import Link from "next/link.js";
import DataTable from "@/app/components/dashboard/datatable/datatable.jsx";

import { useQuery } from "@tanstack/react-query";

const CategoriesPAge = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      fetch(
        "https://code-castle-backend.vercel.app/api/v1/categories/fetch-all-categories"
      ).then((res) => res.json()),
    queryKey: ["categories"],
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading..</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  const { categories } = data;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a Category.."} />
        <Link href="/dashboard/categories/addcategory">
          <button>New Category</button>
        </Link>
      </div>
      <div className={styles.table}>
        <DataTable data={categories} />
      </div>
    </div>
  );
};

export default CategoriesPAge;
