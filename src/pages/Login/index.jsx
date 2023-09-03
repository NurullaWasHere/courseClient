import { CircularProgress, TextField } from "@mui/material";
import React from 'react';
import s from "./Login.module.scss";
import { useForm } from "react-hook-form";
import axios from "../../axios.js";
import { useNavigate } from "react-router-dom";
import {load} from '@fingerprintjs/fingerprintjs';

const Login = () => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
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
    const fingerPrint = await load();
    const visitorIdentifier = await fingerPrint.get();
    await axios
    .post("/user/login", {
      name: result.name,
      password: result.password,
      ip: visitorIdentifier.visitorId,
    })
    .then((res) => {
      const { token } = res.data;
      if(!token){
        window.localStorage.removeItem('token');
        setIsLoaded(true)
        setLoading(false);
      }
      if (token) {
        window.localStorage.setItem("token", token);
        navigate("/");
      }
    });
  };
  return (
    <div className={s.loginWrapper}>
      <div className={s.loginField}>
        <h3>Авторизация</h3>
        <div className={s.userData}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <p>Username: </p>
                <input type="text" name="" id="" /> */}
            <TextField
              fullWidth
              label="name"
              className={s.textField}
              placeholder="Введите name"
              {...register("name", { required: "Укажите имя", min: 4 })}
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="password"
              className={s.textField}
              placeholder="Введите пароль"
              {...register("password", { required: "Введите пароль", min: 4 })}
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              type="password"
            />
            <button type="submit" onClick={ () => setLoading(true)}> Войти </button>
            {isLoaded && <>
              <p style={{color: "red"}}>Неверный никнейм или пароль!</p>
            </>}
            {loading && <CircularProgress />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
