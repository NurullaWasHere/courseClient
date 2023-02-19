import { Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import s from "./VideoModal.module.scss";

const VideoModal = ({ open, setOpen, name }) => {
  const handleClose = () => setOpen(false);

  const movName = name.replace(".mp4", ".mov");
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
          <video
            width={320}
            loop
            muted
            playsInline
            controls
            controlsList="nodownload"
            autoPlay
          >
            <source
              src={`https://courseserver-production.up.railway.app/user/courses/video/${name}`}
              type="video/mp4"
            />
              <source
              src={`https://courseserver-production.up.railway.app/user/courses/video/${movName}`}
              type="video/mp4"
            />
          </video>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            {name}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default VideoModal;
