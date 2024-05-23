import Card from "../components/dashboard/card/card";
import styles from "./dashboard.module.css";

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
export default HomePage;
