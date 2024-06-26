"use client";

import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/MenuLink.jsx";
import Image from "next/image";

import { signOut } from "next-auth/react";

import {
  MdAutoStories,
  MdCategory,
  MdAssignmentInd,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Main", // Adding a title for each category
    list: [
      {
        title: "Categories",
        path: "/dashboard/categories",
        icon: <MdCategory />,
      },
      {
        title: "Stories",
        path: "/dashboard/stories",
        icon: <MdCategory />,
      },
      {
        title: "Chapters",
        path: "/dashboard/chapters",
        icon: <MdAutoStories />,
      },
      {
        title: "New chapter",
        path: "/dashboard/chapters/addchapter",
        icon: <MdAutoStories />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdAssignmentInd />,
      },
    ],
  },
];

const Sidebar = () => {
  const HandleLogout = async () => {
    const data = await signOut({ redirect: true, callbackUrl: "/dashboard" });
    console.log("Sign out success!", data);
  };

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
          <span className={styles["user-name"]}>{"user"}</span>
          <span className={styles["user-role"]}>{"role"}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((category, categoryIndex) => (
          <li key={categoryIndex} id={`category-${categoryIndex}`}>
            <span className={styles["category-name"]}>{category.title}</span>
            {category.list.map((item, itemIndex) => (
              <MenuLink
                item={item}
                id={`item-${itemIndex}`}
                key={item.title}
                className={styles["menu-link"]}
              />
            ))}
          </li>
        ))}
      </ul>

      <button className={styles.logout} onClick={HandleLogout}>
        <MdLogout /> logout
      </button>
    </div>
  );
};

export default Sidebar;
