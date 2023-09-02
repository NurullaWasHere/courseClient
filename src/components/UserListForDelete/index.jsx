import { Button } from "@mui/material";
import React, { useState } from "react";
import s from "./UserListForDelete.module.scss";
import axios from "../../axios.js";

const UserListForDelete = ({ id, name, courseId }) => {
  const [added, setAdded] = useState(false);
  const [isNeed, setIsNeed] = useState(true);

  const onClickHandle = async () => {
    try {
      const res = await axios.delete("/admin/deleteUserFromCourse", {
        data: {
            courseId: courseId,
            userId: id,
        }
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
          <Button onClick={onClickHandle}>Удалить из курса</Button>
        </>
      )}
      {added && (
        <>
          <p style={{ color: "red" }}>Пользватель удален!</p>
        </>
      )}
    </div>
  );
};

export default UserListForDelete;
