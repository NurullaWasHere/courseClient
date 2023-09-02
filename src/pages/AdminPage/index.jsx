import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminCoursePageContent from "../../components/AdminCoursePageContent/index.jsx";
import { AdminUserPageContent } from "../../components/AdminUserPageContent/index.jsx";
import { Storage } from "../../components/Storage/index.jsx";
import s from "./AdminPage.module.scss";
import axios from '../../axios.js'

const AdminPage = ({ name }) => {
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [courseName, setCourseName] = useState("")
  const navigate = useNavigate();
  const onChangeHandler = event => {
    setCourseName(event.target.value);
  }

  const onClickHandler = async ( ) => {
    try{
      await axios.post('/admin/createCourse', {name: courseName});
    }catch(err){
      console.log(err)
    }
  }

  useEffect( () => {
    try{
        async function ads(){
          const res = await axios.get('/admin/users')
          if(res.data.message === "No access"){
            navigate('/');
          }
        }

        ads();
    }catch(err){
      console.log(err);
    }
  }, [])

  return (
    <div className={s.admin}>
      <div className={s.header}>
        <h2> Панель админа </h2>
        <p> {name}</p>
      </div>
      <div className={s.bottom}>
        <div className={s.leftBar}>
          <ul>
            <li>
              <Link
                to="/admin/courses"
                onClick={() => setIsContentChanged(!isContentChanged)}
              >
                <Button className={s.btn} variant="contained" disableElevation>
                  Управление курсами
                </Button>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                onClick={() => setIsContentChanged(!isContentChanged)}
              >
                <Button className={s.btn} variant="contained" disableElevation>
                  Управление пользвателями
                </Button>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/storage"
                onClick={() => setIsContentChanged(!isContentChanged)}
              >
                <Button className={s.btn} variant="contained" disableElevation>
                  Управление хранилищем
                </Button>
              </Link>
            </li>
          </ul>
        </div>
        <div className={s.infoSide}>
          {window.location.pathname === "/admin/courses" && (
            <>
              <div className={s.createCourse}>
                <h2>Создать курс</h2>
                <TextField
                  label="Название"
                  placeholder="Введите название курса"
                  onChange={onChangeHandler}
                />
                <Button variant="outlined" onClick={onClickHandler}>  Создать курс </Button>
              </div>
              <AdminCoursePageContent />
            </>
          )}

          {window.location.pathname === "/admin/users" && (
            <>
              <AdminUserPageContent />
            </>
          )}
          {window.location.pathname === "/admin/storage" && (
            <>
              <Storage />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
