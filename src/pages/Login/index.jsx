import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import s from "./Login.module.scss";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [ip, setIp] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)

  const navigate = useNavigate();

  const { isLoading, error, data } = useVisitorData();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      setIp(data.visitorId);
    }
  }, [data]);

  const onSubmit = async (result) => {

    await axios
      .post("/user/login", {
        name: result.name,
        password: result.password,
        ip: ip,
      })
      .then((res) => {
        const { token } = res.data;
        if(!token){
          setIsLoaded(true)
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
            <button type="submit"> Войти </button>
            {isLoaded && <>
              <p style={{color: "red"}}>Неверный никнейм или пароль!</p>
            </>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
