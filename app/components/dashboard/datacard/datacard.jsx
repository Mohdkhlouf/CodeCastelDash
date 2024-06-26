import React from "react";
import styles from "./datacard.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { useQueryClient, useMutation } from "@tanstack/react-query";

const DataCard = ({ data, slug }) => {
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

  return (
    <Card sx={{ maxWidth: 300, p: 4 }}>
      <Link href={`stories/${data._id}`}>
        <CardMedia
          sx={{ height: 300, width: 300 }}
          image={data.storyThumbnail}
          title="Story Thumbnail"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(data.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button
          onClick={(e) => {
            try {
              e.preventDefault();
              handleDelete(data._id);
            } catch (error) {
              console.log("error", error);
            }
          }}
          size="small"
        >
          Delete
        </Button>
        <Link href={`stories/${data._id}`}>
          <Button>View</Button>
        </Link>
        <Link href={`stories/updatestory/${data._id}`}>
          <Button>Edit</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
export default DataCard;
