import React, { useEffect, useState } from "react";
import Course from "../../components/Course/Course";
import Header from "../../components/Header/Header";
import s from "./Main.module.scss";
import axios from "../../axios";

export const Main = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/user/courses");

      setCourses(res.data.userCourses);
    };

    fetchCourses();
  }, []);

  return (
    <div className={s.main}>
      <Header />
      <div className={s.courses}>
        <h1>Список курсов: </h1>
        {courses.map((elem) => {
          return <Course name={elem.name} id={elem.id} />;
        })}
      </div>
    </div>
  );
};
