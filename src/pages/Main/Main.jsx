import React, { useEffect, useState } from "react";
import Course from "../../components/Course/Course";
import Header from "../../components/Header/Header";
import s from "./Main.module.scss";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/user/courses").catch((error) => {
        navigate("/login");
      });
      setCourses(res.data.userCourses);
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className={s.main}>
      <Header />
      <div className={s.courses}>
        <h1>Список курсов: </h1>
        {courses.map((elem) => {
          return <Course name={elem.name} id={elem.id} key={elem.id} />;
        })}
      </div>
    </div>
  );
};
