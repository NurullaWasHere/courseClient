import { Button } from "@mui/material";
import React, { useState } from "react";
import s from "./VideoList.module.scss";
import axios from "../../axios.js";

const VideoList = ({ id, name, courseId }) => {
  const [added, setAdded] = useState(false);
  const [isNeed, setIsNeed] = useState(true);

  const onClickHandle = async () => {
    try {
      const res = await axios.put("/admin/addVideoToCourse", {
        courseId: courseId,
        videoId: id,
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
          <Button onClick={onClickHandle}>Добавить в курс</Button>
        </>
      )}
      {added && (
        <>
          <p style={{ color: "green" }}>Добавлен!</p>
        </>
      )}
    </div>
  );
};

export default VideoList;
