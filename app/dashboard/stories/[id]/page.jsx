"use client";
import styles from "@/app/components/dashboard/singlestorypage/singlestorypage.module.css";
import useFetchSingleData from "@/app/hooks/useFetchSingleData.jsx";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import ChaptersOfCategory from "@/app/components/dashboard/chaptersofcategory/chaptersofcategory";
import AddChapter from "@/app/components/dashboard/addchapter/addchapter";
const SingleStoryPage = () => {
  const [open, setOpen] = useState(false);
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

  console.log(data);
  const { title, storyThumbnail, description, createdAt } = data.story;

  const handleAdd = () => {
    try {
      setOpen(true);
    } catch (e) {
      return console.log("error", e);
    }
  };
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
      <button
        className={styles["add-button"]}
        onClick={(e) => {
          e.defaultPrevented;
          handleAdd();
        }}
      >
        New Category
      </button>
      {open && <AddChapter setOpen={setOpen} />}
      <div className={styles.chapters}>
        <ChaptersOfCategory id={id} slug="chapters" />
      </div>
    </div>
  );
};

export default SingleStoryPage;