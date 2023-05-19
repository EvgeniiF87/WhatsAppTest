import useAppContext from "../../hooks/useAppContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import style from "./login.module.scss";
import { useState } from "react";

const Login = () => {
  const { setIsUser, setIdInstance, setApiTokenInstance } = useAppContext();
  const [err, setErr] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (dataForm) => {
    const apiUrl = `https://api.green-api.com/waInstance${dataForm.id}/getStateInstance/${dataForm.token}`;

    axios
      .get(apiUrl)
      .then(({ data }) => {
        if (data.stateInstance && data.stateInstance === "authorized") {
          setIdInstance(dataForm.id);
          setApiTokenInstance(dataForm.token);
          setIsUser(true);
        }
      })
      .catch((error) => {
        if (error.response.statusText === "Unauthorized") {
          setErr(true);
        }
      });

    reset();
  };

  return (
    <div className={style.wrap}>
      <div className={style.header}></div>
      <div className={style.content}>
        <div className={style.content_title}>WHATSAPP WEB</div>
        <div className={style.content_body}>
          <h1>Авторизация</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("id")} placeholder="ID INSTANCE" />
            <input {...register("token")} placeholder="API TOKEN INSTANCE" />
            {err && <div className={style.error}>Введены не верные данные</div>}

            <button>войти</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
