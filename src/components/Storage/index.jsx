import React from "react";
import s from "./Storage.module.scss";
import axios from "../../axios.js";
import {TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export const Storage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      link: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (result) => {
    console.log(result);
    await axios.post("/admin/createVideo", {
      name: result.name,
      link: result.link,
    });
  };

  return (
    <div className={s.main}>
      <div className={s.upload}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Заполните поля</h3>
          <TextField
            fullWidth
            label="name"
            className={s.textField}
            placeholder="Введите name"
            {...register("name", {
              required: "Укажите название курса",
              min: 4,
            })}
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="link"
            className={s.textField}
            placeholder="Введите ссылку"
            {...register("link", { required: "Нужна ссылка", min: 4 })}
            error={Boolean(errors.link?.message)}
            helperText={errors.link?.message}
          />
          <button type="submit"> Загрузить </button>
        </form>
      </div>
      <div className={s.delete}></div>
    </div>
  );
};
