"use client";
import React from "react";
import styles from "../../../dashboard/stories/stories.module.css";
import { Grid } from "@mui/material";
import DataCard from "../datacard/datacard";

const StoriesList = ({ data }) => {
  return (
    <div>
      <h1>Stories</h1>
      <ul>
        <div className={styles.table}>
          <Grid container spacing={2}>
            {data?.stories.map((story) => (
              <Grid key={story._id} xs={12} sm={6} md={4} gap={3}>
                {/* <DataCard data={data} onDelete={() => deleteStory(story._id)} /> */}
                <DataCard data={story} />
              </Grid>
            ))}
          </Grid>
        </div>
      </ul>
    </div>
  );
};

export default StoriesList;
