import { TextField, Button, Box } from "@mui/material";
import styles from "./addcatefory.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AddCategory = ({ setOpen }) => {
  const [categoryName, setCategoryName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (category) => {
      try {
        const response = await fetch(
          `https://code-castle-backend.vercel.app/api/v1/categories/categories`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
          }
        );
        return response.json();
      } catch (error) {
        console.log("Error:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setOpen(false); // Close the form on success
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName) {
      mutation.mutate({ name: categoryName });
    }
  };

  return (
    <div className={styles.addtable}>
      <Box sx={{ height: "100%", width: "100%" }}>
        <form onSubmit={handleSubmit} className={styles.addform}>
          <TextField
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
            value={categoryName}
            id="outlined-basic"
            label="Category Name"
            variant="outlined"
            required
          />
          <div className={styles.addbuttons}>
            <Button type="submit" className={styles.button}>
              Submit
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default AddCategory;
