import { Typography, Alert, Button, LinearProgress, Stack, Snackbar, IconButton} from "@mui/material";
import FormInputText from "../components/FormInputText";
import FormInputDropdown from "../components/FormInputDropdown";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { useOutletContext } from "react-router";
import { useAdmin } from "../providers/AdminProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddUser(){
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
      } = useForm();

    const [err,setErr]=useState(false);
    const [inProgress,setInProgress]=useState(false);
    const [open, setOpen] = useState(false);
    const {add,update} = useAdmin();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    const action = (
        <>
          <Button color="secondary" size="small" onClick={handleClose}>
            Отмена
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );
    
    const [info, handleCloseSelf] = useOutletContext();
    console.log(info);
    const handleFunc = info ? (data) => update(data) : (data) => add(data);
    const queryClient = useQueryClient();
    const userAddMutation = useMutation({
      mutationFn: data=>handleFunc(data),
      onSuccess: (data)=>{
        queryClient.invalidateQueries(["users"]);
        console.log(data);
        handleOpen();
        handleCloseSelf();
      },
      onSettled: (data)=>{
        setInProgress(false);
        },
      onError:(error)=>{setErr(true);
        console.log(error)},
    }
    );
    

    const onSubmit = async (data)=>{
        setInProgress(true);
        setErr(false);
        const body = info ? {id: info.id,...data} : data;
        console.log(body);
        userAddMutation.mutate(body);
    }
    const mainString = !info ? "Добавления пользователя" : `Изменение пользователя 
    ${info.last_name} ${info.first_name.substring(0,1)+"."} 
    ${info?.middle_name.substring(0,1) ? ".":""}`
    return(
        <>
        <Typography variant="h4" textAlign={"center"}> {mainString} </Typography>
        {err && <Alert severity="error">Ошибка {mainString}</Alert>}
        <Box
        style={{
          display: "grid",
          "grid-gap": "10px 10px",
          "grid-template-columns": "1fr 1fr",
          //padding: "20px",
          margin: "10px",
      }}
      >
        <Stack alignItems={"center"}>
        <FormInputText name="first_name" 
          control={control} 
          label="Имя" 
          rules={{required: true}}
          def={info?.first_name} />
        {errors.first_name && <Alert severity="error">Поле обязательно!</Alert>}
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputText name="last_name" 
          control={control} 
          label="Фамилия"
          rules={{required: true}}
          def={info?.last_name} />
        {errors.last_name && <Alert severity="error">Поле обязательно!</Alert>}
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputText name="middle_name" 
          control={control} 
          label="Отчество (при наличии)"
          rules={null}
          def={info?.last_name} />
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputText name="login" 
          control={control} 
          label="Логин"
          rules={{required: true}}
          def={info?.email} />
        {errors.login && <Alert severity="error">Поле обязательно!</Alert>}
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputText name="password" 
          control={control} 
          label="Пароль"
          rules={{required: true}}
          def={info?.password} />
        {errors.password && <Alert severity="error">Поле обязательно!</Alert>}
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputText name="passport" 
          control={control} 
          label="Паспорт"
          rules={{required: true}}
          def={info?.passport} />
        {errors.passport && <Alert severity="error">Поле обязательно!</Alert>}
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputText name="inn" 
          control={control} 
          label="ИНН"
          rules={{required: true}}
          def={info?.inn} />
        {errors.inn && <Alert severity="error">Поле обязательно!</Alert>}
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputText name="snils" 
          control={control} 
          label="СНИЛС"
          rules={{required: true}}
          def={info?.snils} />
        {errors.snils && <Alert severity="error">Поле обязательно!</Alert>}
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputText name="birthday" 
          control={control} 
          label="Дата рождения"
          rules={{required: true}}
          def={info?.birthday} />
        </Stack>
        <Stack alignItems={"center"}>
        <FormInputDropdown
          control={control}
          label="Роль"
          options={[
            {
                value:"ADMIN",
                label:"Администратор"
            },
            {
                value:"employee",
                label:"Пользователь"
            },
          ]}
          name={"role"}
          rules={{required: true}}
          def={info?.role}
          />
        {errors.role && <Alert severity="error">Поле обязательно!</Alert>}
        </Stack>
      </Box>
      <Button sx={{width:"100%"}} onClick={handleSubmit(onSubmit)} variant={"contained"}>
          Добавление
      </Button>
      {inProgress && <LinearProgress color="secondary"/>}
      {err && <Alert severity="error">Ошибка добавления</Alert>}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Новый пользователь добавлен"
        action={action}
      />
      </>
    )
}