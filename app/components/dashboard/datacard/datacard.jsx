import React from "react";
import styles from "./datacard.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const DataCard = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 300, p: 4 }}>
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
      <CardActions>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default DataCard;
