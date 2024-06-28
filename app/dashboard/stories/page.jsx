"use client";

import styles from "./stories.module.css";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "@mui/material";
import DataCard from "@/app/components/dashboard/datacard/datacard";
import Search from "@/app/components/dashboard/search/search";
import Link from "next/link";
import withAuth from "@/app/utils/withAuth";

const StoriesPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories/stories`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading..</div>;
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className={styles.top}>
        <Search placeholder={"Search for a Category.."} />

        <Link href="stories/addstory" cursor="hand">
          <button className={styles["add-button"]}>New story</button>
        </Link>
      </div>

      <h1 className={styles["page-title"]}>Stories</h1>
      <ul>
        <div className={styles.table}>
          <Grid container spacing={2}>
            {data?.stories.map((story) => (
              <Grid key={story._id} xs={12} sm={6} md={4} gap={3}>
                <DataCard data={story} slug={"stories"} />
              </Grid>
            ))}
          </Grid>
        </div>
      </ul>
    </div>
  );
};

export default withAuth(StoriesPage);
