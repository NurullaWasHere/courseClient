import * as React from "react";
import Button from "@mui/material/Button";
import {  Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../axios.js";
import s from "./AdminCourseModal.module.scss";
import UserList from "../UserList/index.jsx";
import VideoList from "../VideoList/index.jsx";
import UserListForDelete from "../UserListForDelete/index.jsx";
import VideoListForDelete from "../VideoListForDelete/index.jsx";
import debounce from "lodash.debounce";

export default function AdminCourseModal({ open, setOpen, courseId }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [users, setUsers] = React.useState([]);
  const [videos, setVideos] = React.useState([]);

  const [option, setOption] = React.useState(0);

  const [userName, setUserName] = React.useState("");
  const [videoName, setVideoName] = React.useState("");

  const onClickAddUser = async () => {
    const result = await axios.get("/admin/users");
    console.log(result.data);
    if (result.data) {
      setUsers(result.data);
      setOption(1);
    }
  };

  const onClickAddVideo = async () => {
    const result = await axios.get("/admin/videos");
    console.log(result.data.courses);
    if (result.data.courses) {
      setVideos(result.data.courses);
      setOption(2);
    }
  };

  const onClickDeleteUser = async () => {
    const users = await axios.get(`/admin/users/${courseId}`);
    console.log(users.data.users);
    setOption(3);
    setUsers(users.data.users);
  };

  const onClickDeleteVideo = async () => {
    const videos = await axios.get(`/admin/videos/${courseId}`); // Не работает
    console.log(videos.data.videos);
    setOption(4);
    setVideos(videos.data.videos);
  };

  const onClickDeleteCourse = async () => {
    const res = await axios.delete("/admin/deleteCourse", {
      data: { courseId },
    });
    console.log(res.data);
  };

  const onChangeUserHandler = (event) => {
    const ads = debounce(() => {
      setUserName(event.target.value);
    }, 1300);
    ads();
  };

  const onChangeVideoHandler = (event) => {
    const ads = debounce(() => {
      setVideoName(event.target.value);
    }, 1300);
    ads();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modal}>
          <div className={s.modalOptions}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Button variant="outlined" onClick={onClickAddUser}>
                Добавить пользователя
              </Button>
            </Typography>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Button variant="outlined" onClick={onClickAddVideo}>
                Добавить видео
              </Button>
            </Typography>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Button variant="outlined" onClick={onClickDeleteUser}>
                Удалить пользвателя
              </Button>
            </Typography>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Button variant="outlined" onClick={onClickDeleteVideo}>
                Удалить видео
              </Button>
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Button variant="outlined" onClick={onClickDeleteCourse}>
                Удалить этот курс
              </Button>
            </Typography>
          </div>

          <div className={s.optionList}>
            {option === 1 && (
              <>
                <div className={s.elasticsearch}>
                  <h1>Найти</h1>
                  <TextField
                    label="Имя"
                    placeholder="Введите имя"
                    fullWidth
                    onChange={onChangeUserHandler}
                  />
                </div>
                <div className={s.firstOption}>
                  {userName
                    ? users
                        .filter((elem) => elem.name.includes(userName))
                        .map((elem) => {
                          return (
                            <UserList
                              className={s.userList}
                              id={elem.id}
                              name={elem.name}
                    
                              courseId={courseId}
                              key={elem.id}
                            />
                          );
                        })
                    : users.map((elem) => {
                        return (
                          <UserList
                            className={s.userList}
                            id={elem.id}
                            name={elem.name}
                            courseId={courseId}
                            key={elem.id}
                          />
                        );
                      })}
                </div>
              </>
            )}
            {option === 2 && (
              <>
                <div className={s.elasticsearch}>
                  <h1>Найти</h1>
                  <TextField
                    label="Имя"
                    placeholder="Введите имя"
                    fullWidth
                    onChange={onChangeVideoHandler}
                  />
                </div>
                <div className={s.firstOption}>
                  {videoName ? videos.filter(elem => elem.name.includes(videoName)).map((elem) => {
                    return (
                      <VideoList
                        id={elem.id}
                        name={elem.name}
                        courseId={courseId}
                        key={elem.id}
                      />
                    )}) : videos.map((elem) => {
                    return (
                      <VideoList
                        id={elem.id}
                        name={elem.name}
                        courseId={courseId}
                        key={elem.id}
                      />
                    );
                  })}
                </div>
              </>
            )}
            {option === 3 && (
              <>
                <div className={s.firstOption}>
                  {users.map((elem) => {
                    return (
                      <UserListForDelete
                        id={elem.id}
                        name={elem.name}
                        courseId={courseId}
                        key={elem.id}
                      />
                    );
                  })}
                </div>
              </>
            )}
            {option === 4 && (
              <>
                <div className={s.firstOption}>
                  {videos.map((elem) => {
                    return (
                      <VideoListForDelete
                        id={elem.id}
                        name={elem.name}
                        courseId={courseId}
                        key={elem.id}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography> */}
        </Box>
      </Modal>
    </>
  );
}
