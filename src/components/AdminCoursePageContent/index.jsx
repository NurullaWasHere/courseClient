import { useEffect, useState } from "react";
import AdminCourseCard from "../AdminCourseCard/index.jsx";
import s from "./AdminCoursePageContent.module.scss";
import axios from '../../axios.js';

export default function AdminCoursePageContent() {

  const [courses, setCourses] = useState([])

  useEffect( () => {
    async function fetchCourses(){
      const result = await axios.get('/admin/courses');
      setCourses(result.data.courses)
      console.log(courses)
    }
    fetchCourses();
  }, [])

  return (
    <div className={s.content}>
        {courses.map( elem => {
          return <AdminCourseCard id={elem.id} name={elem.name} key={elem.id}/>
        })}
    </div>
  );
}
