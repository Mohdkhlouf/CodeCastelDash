import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./datatable.module.css";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const DataTable = ({ data, slug }) => {
  // Get dynamic columns from data
  const excludedFields = ["_id", "createdAt", "updatedAt", "__v"];

  function getColumnsFromData(data) {
    if (data.length === 0) {
      return [];
    }

    // Get the keys from the first object in the data array
    const keys = Object.keys(data[0]);

    // Filter out excluded fields
    const filteredKeys = keys.filter((key) => !excludedFields.includes(key));

    // Convert keys to column format required by DataGrid
    return filteredKeys.map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
      width: 150, // Set width as needed
    }));
  }

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${slug}/${slug}/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([slug]);
    },
  });

  const handleDelete = async (id) => {
    try {
      await mutation.mutate(id);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const dynamicColumns = getColumnsFromData(data);

  // Define the actions column
  const actionsColumn = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={styles.actionButtons}>
          <div className={styles.editButton}>
            <Link href={`/edit/${params.row._id}`}>
              <FaRegEdit />
            </Link>
          </div>
          <div className={styles.deleteButton}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(params.row._id, slug);
              }}
            >
              <MdDeleteForever />
            </Link>
          </div>
        </div>
      );
    },
  };

  // Combine dynamic columns with actions column
  const columns = [...dynamicColumns, actionsColumn];

  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={data.map((item, index) => ({
          id: index + 1,
          ...item,
        }))}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;
