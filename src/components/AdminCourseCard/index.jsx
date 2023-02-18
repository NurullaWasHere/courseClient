import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

import s from "./AdminCourseCard.module.scss";
import AdminCourseModal from "../AdminCourseModal";

export default function AdminCourseCard({ id, name }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card style={{ width: "220px" }} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/science.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/admin/course/${id}`}><Button size="small">Посмотреть</Button></Link>
          <Button size="small" onClick={handleOpen}>
            Настройки
          </Button>
        </CardActions>
      </Card>
      {open && <AdminCourseModal setOpen={setOpen} open={open} courseId={id}/>}
    </>
  );
}
