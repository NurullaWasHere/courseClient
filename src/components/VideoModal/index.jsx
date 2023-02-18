import { Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import axios from "../../axios";
import ReactPlayer from "react-player";

import s from "./VideoModal.module.scss";

const VideoModal = ({ open, setOpen, name }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box className={s.videoModal}>
          <video src={`http://localhost:3008/user/courses/video/${name}`} controls controlsList="nodownload" autoPlay/>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            {name}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default VideoModal;
