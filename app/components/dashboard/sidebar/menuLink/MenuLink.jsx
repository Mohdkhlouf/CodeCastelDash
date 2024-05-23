"use client";
import Link from "next/link";
import styles from "./MenuLink.module.css";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathName = usePathname();

  console.log(pathName);
  return (
    <div>
      <Link
        href={item.path}
        className={`${styles.container} ${
          pathName === item.path && styles.active
        }`}
      >
        <span>{item.icon}</span>
        <span>{item.title}</span>
      </Link>
    </div>
  );
};

export default MenuLink;
