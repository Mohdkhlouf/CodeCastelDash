"use client";
import StoriesList from "@/app/components/dashboard/storieslist/StoriesList";
import styles from "./stories.module.css";
import { useQuery } from "@tanstack/react-query";

const StoriesPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      fetch(
        "https://code-castle-backend.vercel.app/api/v1/stories/fetch-all-stories"
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading..</div>;
  }
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <StoriesList data={data} />
    </div>
  );
};

export default StoriesPage;
