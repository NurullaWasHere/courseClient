import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { VideoLink } from "../../components/VideoLink/VideoLink";
import s from "./CoursePage.module.scss";
import axios from "../../axios";

const CoursePage = () => {
  const { courseId } = useParams();
  const [videos, setVideo] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await axios.get(`/user/courses/${courseId}`);
      setVideo(res.data.videos);
      console.log(res.data.videos);
    }
    fetchVideos();
  }, [courseId]);

  return (
    <div className={s.courseMainPage}>
      <Header />
      <div className={s.data}>
        <h2>Контент: </h2>
        {videos
          .sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          })
          .map((elem) => {
            return (
              <VideoLink key={elem.id} name={elem.name} link={elem.link} />
            );
          })}
      </div>
    </div>
  );
};

export default CoursePage;
