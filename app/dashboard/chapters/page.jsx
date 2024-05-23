"use client";
import * as React from "react";
import Search from "../../components/dashboard/search/search.jsx";
import styles from "./chapters.module.css";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Chapter Title", width: 130 },
  { field: "content", headerName: "Content", width: 300 },
  { field: "animation", headerName: "Animation", width: 130 },
  { field: "createddate", headerName: "Created Date", width: 130 },
  { field: "actions", headerName: "Actions", width: 130 },
];

const rows = [
  {
    id: 1,
    title: "Snow",
    content: "",
    animation: "Jon",
    createddate: "Jon",
    actions: "",
  },
];

const ChaptersPage = () => {
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

export default ChaptersPage;
