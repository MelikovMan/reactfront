import { useForm } from "react-hook-form"
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
import { useMemo, useState } from "react";
import logo from '../logo.svg';
import { Button, Paper, Typography, Alert, LinearProgress } from "@mui/material";
import FormInputText from "../components/FormInputText";
import AuthService from '../Auth.js'

export default function Login() {
    const {
      register,
      handleSubmit,
      watch,
      control,
      reset,
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
        setErr(false);
        let res = await login(log,password);
        setErr(!res);
        if(res) {
          navigate("/dashboard");
          //localStorage.removeItem("login");
          //localStorage.removeItem("password");
        }

    }
    const onfakeSubmit = async ({log,password}) => {
        await fakelogin();
        setErr(!!token);
        if(token) navigate("/dashboard");

    }
    const defValues = useMemo(()=>{
      return {
        login: localStorage.getItem("login") ?? "",
        password: localStorage.getItem("password") ?? "",
      }
    }, [watch("login"),watch("password")])
    localStorage.setItem("login",watch("login"));
    localStorage.setItem("password",watch("password"))
  
    return (
    <div className="login-wrapper">
      <Paper
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          margin: "10px 300px",
      }}
      >
        <Typography variant="h4"> Вход в складскую систему</Typography>
        {err && <Alert severity="error">Ошибка входа в систему</Alert>}
        <FormInputText name="login" 
          control={control} 
          label="Имя пользователя" 
          rules={{required: true}}
          def={defValues.login} />
        {errors.login && <Alert severity="error">Поле обязательно!</Alert>}
        <FormInputText name="password" 
          control={control} 
          label="Пароль"
          rules={{required: true}}
          def={defValues.password} />
        {errors.password && <Alert severity="error">Поле обязательно!</Alert>}
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"} disabled={authInProgress}>
          Войти в систему
        </Button>
        <Button onClick={async ()=>{
          const res = await fetch("http://172.19.0.2:8080/test");
          console.log(res);}} variant={"contained"} disabled={authInProgress}>
          Тест
        </Button>
        {authInProgress && <LinearProgress />}
      </Paper>
    </div>
    )
  }