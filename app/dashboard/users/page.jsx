"use client";
import withAuth from "../../utils/withAuth";

import styles from "@/app/dashboard/users/users.module.css";
import DataTable from "@/app/components/dashboard/datatable/datatable.jsx";
import UseFetchData from "@/app/hooks/useFetchData.jsx";

const slug = "users";
const UsersPage = () => {
  const { data, isLoading, error } = UseFetchData(slug);

  if (isLoading) {
    return <div className={styles.loading}>Loading..</div>;
  }

  if (error) return <div>Error: {error.message}</div>;
  const users = data.users;
  return (
    <div>
      <DataTable data={users} slug={slug} />
    </div>
  );
};

export default withAuth(UsersPage);
