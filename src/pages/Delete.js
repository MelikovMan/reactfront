import {Box, Typography, Button} from '@mui/material';
import { useOutletContext } from 'react-router';
import { useAdmin } from '../providers/AdminProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export default function Delete(){
    const [info,handleClose] = useOutletContext();
    console.log(info);
    const {deleteUser} = useAdmin();
    const queryClient = useQueryClient();
    const deleteUserMutation = useMutation({
        mutationFn: id=>deleteUser(id),
        onSuccess: () =>{
            queryClient.invalidateQueries("users");
            handleClose();
        },
        onError: (error)=>{
            console.log(error)
        }
    })
    return(
        <Box>
            <Typography>{`Вы действительно хотите удалить пользователя 
                ${info.last_name} ${info.first_name.substring(0,1)+"."} 
                ${info?.middle_name.substring(0,1) ? ".":""}?`}
            </Typography>
            <Button onClick={()=>deleteUserMutation.mutate({id:info.id})} color={"error"}>ДА</Button>
            <Button onClick={()=>handleClose()}> НЕТ</Button>
        </Box>
    )
}