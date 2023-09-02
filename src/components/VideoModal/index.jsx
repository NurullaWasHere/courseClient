import { Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import s from "./VideoModal.module.scss";

const VideoModal = ({ open, setOpen, name, link }) => {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      width="100%"
    >
      <Fade  in={open}>
        <Box  className={s.videoModal}>
          {/* <video
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
          </video> */}
          <div className={s.frameDiv}>
            <iframe
              src={link}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="bbb.mp4"
              width="100%"
            ></iframe>
          </div>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            {name}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default VideoModal;
