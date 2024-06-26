"use client";
import Card from "../components/dashboard/card/card";
import styles from "./dashboard.module.css";

import withAuth from "../utils/withauth";
const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};
export default withAuth(HomePage);
