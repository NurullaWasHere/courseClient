import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./AdminUserPageContent.module.scss";
import axios from "../../axios.js";
import debounce from "lodash.debounce";

export const AdminUserPageContent = () => {
  const [created, setCreated] = useState(false);
  const [users, setUsers] = useState([]);
  const [username, setName] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (result) => {
    console.log(result);
    const res = await axios.post("/admin/createUser", {
      name: result.name,
      password: result.password,
    });
    if (res) {
      setCreated(true);
      setTimeout(() => setCreated(false), 2000);
    }
  };

  const onChangeHandler = (event) => {
    const ads = debounce(() => {
      setName(event.target.value);
      console.log(event.target.value);
    }, 1000);
    ads();
  };

  const showAll = () => {
    async function fetchUsers() {
        const res = await axios.get("/admin/users");
        console.log(res.data);
        setUsers(res.data);
      }
      fetchUsers();
  }

  const deleteUser =  async (id) => {
    await axios.delete('/admin/deleteUser', {data: {id}})
  }

  return (
    <div>
      <div className={s.addUser}>
        <h2>Добавить пользвателя</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="name"
            className={s.textField}
            placeholder="Введите name"
            {...register("name", { required: "Укажите name", min: 4 })}
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
          />
          <TextField
            label="password"
            className={s.textField}
            placeholder="Введите пароль"
            {...register("password", { required: "Введите пароль", min: 4 })}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            type="password"
          />
          <button type="submit"> Создать </button>
        </form>

        {created && (
          <>
            <p className={s.created}>Пользватель создан успешно!</p>
          </>
        )}
      </div>

      <div className={s.find}>
        <h2>Удалить пользвателя</h2>
        <Button variant="outlined" onClick={showAll} style={{width: "250px"}}> Показать всех </Button>
        <TextField
          label="Найти пользвателя"
          className={s.textField}
          placeholder="Введите имя пользвателя"
          onChange={onChangeHandler}
        />
        <div className={s.deleteUser}>
          {username
            ? users
                .filter((elem) => elem.name.includes(username))
                .map((elem) => {
                  return (
                    <>
                      <div className={s.user}>
                        <p>Имя пользвателя: {elem.name}</p>
                        <button className={s.delete}>
                          Удалить пользвателя
                        </button>
                      </div>
                    </>
                  );
                })
            : users.map((elem) => {
                return (
                  <>
                    <div className={s.user}>
                      <p>Имя пользвателя: {elem.name}</p>
                      <p>Пароль: {elem.password}</p>
                      <button className={s.delete} onClick={() => deleteUser(elem.id)}>Удалить пользвателя</button>
                    </div>
                  </>
                );

              })}
        </div>
      </div>
    </div>
  );
};
