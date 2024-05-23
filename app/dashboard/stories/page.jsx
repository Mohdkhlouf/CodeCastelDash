"use client";
import * as React from "react";
import styles from "./stories.module.css";
import Search from "../../components/dashboard/search/search.jsx";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Story Title", width: 130 },
  { field: "description", headerName: "Description", width: 260 },
  { field: "thumbnail", headerName: "Thumbnail", width: 130 },
  { field: "createddate", headerName: "Created Date", width: 130 },
];

const rows = [
  {
    id: 1,
    title: "Snow",
    description: "Jon",
    thumbnail: "Jon",
    createddate: "Jon",
  },
];

const storiesPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a story.."} />
        <Button
          variant="contained"
          className={styles["add-button"]}
          href="#contained-buttons"
        >
          Add New
        </Button>
      </div>
      <div className={styles.table}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default storiesPage;
