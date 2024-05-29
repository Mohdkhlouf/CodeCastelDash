"use client";
import Navbar from "../components/dashboard/navbar/navbar";
import Sidebar from "../components/dashboard/sidebar/sidebar";
import styles from "../components/dashboard/dashboard.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Navbar />
          {children}
        </div>
      </div>
    </QueryClientProvider>
  );
};
export default Layout;
