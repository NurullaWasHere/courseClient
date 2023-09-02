import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import VideoModal from "../VideoModal/index.jsx";
import s from "./VideoLink.module.scss";

export const VideoLink = ({ id, name, link }) => {
  const [open, setOpen] = React.useState(false);
  console.log(link)
  return (
    <div className={s.videoLinkBlock}>
      <Accordion style={{ width: "100%", border: "1px solid blue" }}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{name}</Typography>
        </AccordionSummary>
        <hr />
        <AccordionDetails style={{ marginLeft: "25px" }}>
          <Typography style={{ color: "blue" }} onClick={() => setOpen(!open)}>
            video
          </Typography>
        </AccordionDetails>
      </Accordion>
      {open && <VideoModal setOpen={setOpen} open={open} name={name} link={link}/>}
    </div>
  );
};
