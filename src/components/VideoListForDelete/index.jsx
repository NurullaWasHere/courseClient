import { Button } from "@mui/material";
import React, { useState } from "react";
import s from "./VideoListForDelete.module.scss";
import axios from "../../axios.js";

const VideoListForDelete = ({ id, name, courseId }) => {
  const [added, setAdded] = useState(false);
  const [isNeed, setIsNeed] = useState(true);

  const onClickHandle = async () => {
    try {
      const res = await axios.delete("/admin/deleteVideoFromCourse", {
        data: {
          courseId: courseId,
          videoId: id,
        },
      });
      if (res.status === 200) {
        setAdded(true);
        setIsNeed(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={s.main}>
      <p>{name}</p>
      {isNeed && (
        <>
          <Button onClick={onClickHandle}>Удалить видео из курса</Button>
        </>
      )}
      {added && (
        <>
          <p style={{ color: "green" }}>Удален!</p>
        </>
      )}
    </div>
  );
};

export default VideoListForDelete;
