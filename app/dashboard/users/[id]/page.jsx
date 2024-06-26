"use client";
import styles from "@/app/components/dashboard/singlestorypage/singlestorypage.module.css";
import useFetchSingleData from "@/app/hooks/useFetchSingleData.jsx";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import DataTable from "@/app/components/dashboard/datatable/datatable";

const SingleUserPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { data, error, isLoading } = useFetchSingleData(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  if (!data || !data.story) {
    return <p>No story found</p>;
  }

  const { title, storyThumbnail, description, createdAt, chapters } =
    data.story;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.thumbnail}>
          <CldImage
            width="200"
            height="200"
            priority={true}
            src={storyThumbnail}
            alt="Story Thumbnail"
            placeholder="empty"
          />
        </div>
        <div className={styles.content}>
          <div className={styles["single-page-header"]}>
            <h1 className={styles["story-title"]}>{title}</h1>
            <span>{createdAt}</span>
          </div>
          <div className={styles["single-page-body"]}>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
      <div className={styles.chapters}>
        <DataTable data={chapters} slug="chapters" />
      </div>
    </div>
  );
};

export default SingleUserPage;
