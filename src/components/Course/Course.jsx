import React from "react";
import { Link } from "react-router-dom";
import s from "./Course.module.scss";

const Course = ({ name, id }) => {
  return (
    <div className={s.courseMainBlock}>
      <img src="science.jpg" alt="" height={132} />
      <div className={s.courseInfo}>
        <h2>{name}</h2>
      </div>
      <div className={s.buttons}>
        <Link to={`/course/${id}`}>
          <button>Посмотреть курс</button>
        </Link>
      </div>
    </div>
  );
};

export default Course;
