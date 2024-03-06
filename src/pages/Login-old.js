import { useForm } from "react-hook-form"
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
import { useState } from "react";
import logo from '../logo.svg';
import { Button, Paper, Typography } from "@mui/material";

export default function Login() {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm({
        defaultValues: {
            login: localStorage.getItem("login") ?? "",
            password: localStorage.getItem("password") ?? "",
          },
    });
    const {        token,
        authInProgress,
        login,
        fakelogin,
        logout,fakelogout}= useAuth();

        const navigate=useNavigate();
    const [err,setErr]=useState(false);
    const onSubmit = async ({log,password}) => {
        let err = await login(log,password);
        setErr(!err);
        if(err) navigate("/dashboard");

    }
    const onfakeSubmit = async ({log,password}) => {
        await fakelogin();
        setErr(!!token);
        if(token) navigate("/dashboard");

    }
    localStorage.setItem("login",watch("login"));
    localStorage.setItem("password",watch("password"))
  
    return (
    <div className="login-wrapper">
    {authInProgress && <div className="login-form">
        <br/>
        <img src={logo} className="App-logo" alt="logo" />
        <span>Аутентификация..</span>
        </div>}
      {!authInProgress &&<form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div>
            <h3>Вход в складскую систему</h3>
        </div>
        <div>
        <label for="login">Имя пользователя</label>
        <input name="login" {...register("login", { required: true })} />
        {errors.login && <div>Это поле обязательно!</div>}
        </div>
        <div>
        <label for="password">Пароль</label>
        <input name="password" {...register("password", { required: true })} />

        {errors.password && <div>Это поле обязательно!</div>}
        </div>
        <br/>
        {<input type="submit" disabled={authInProgress} />}
        
        {authInProgress && <>
        <br/>
        <img src={logo} className="App-logo" alt="logo" />
        <span>Аутентификация..</span>
        </>}
        {err && <><br/><span>Ошибка Аутентификации, обосрамс</span></>}
      </form>}
    </div>
    )
  }