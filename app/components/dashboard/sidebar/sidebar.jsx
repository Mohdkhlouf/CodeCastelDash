import React from "react";
import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/MenuLink.jsx";
import Image from "next/image";

import {
  MdAutoStories,
  MdCategory,
  MdAssignmentInd,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Stories",
    list: [
      {
        title: "Show Categories",
        path: "/dashboard/categories",
        icon: <MdCategory />,
      },
      {
        title: "New Category",
        path: "/dashboard/categories/addcategory",
        icon: <MdAutoStories />,
      },
      {
        title: "Show Stories",
        path: "/dashboard/stories",
        icon: <MdCategory />,
      },
      {
        title: "New Story",
        path: "/dashboard/stories/addstory",
        icon: <MdAutoStories />,
      },
      {
        title: "chapters",
        path: "/dashboard/chapters",
        icon: <MdAutoStories />,
      },
      {
        title: "New chapter",
        path: "/dashboard/chapters/addchapter",
        icon: <MdAutoStories />,
      },
    ],
  },

  {
    title: "Users",
    list: [
      {
        title: "Users",
        path: "/Users",
        icon: <MdAssignmentInd />,
      },
    ],
  },
];

const Sidebar = () => {
  console.log("test");
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles["user-image"]}
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles["user-details"]}>
          <span className={styles["user-name"]}>CodeCastel</span>
          <span className={styles["user-role"]}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((category) => (
          <li key={category.title}>
            <span className={styles["category-name"]}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>

      <button className={styles.logout}>
        <MdLogout /> logout
      </button>
    </div>
  );
};

export default Sidebar;
