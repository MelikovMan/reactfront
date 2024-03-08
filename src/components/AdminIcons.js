import PeopleIcon from '@mui/icons-material/People';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const ELEMS = 3;
const boxSX = {
    transition: "border-bottom 200ms",
    "transition-timing-function": "ease-out",
    "&:hover": {
      "border-bottom": "4px solid #1976d2",
    },
  };

  const imageSX = {
    "&:hover": {
      "color": "#1976d2",
    },
  };
export default function DashboardIcons(){
    const [hovered,setHovered]=useState(null);
    const navigate = useNavigate();
   return(
    <Stack 
    direction="row"
    justifyContent={"center"}
    alignItems={"center"}
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}>
      <Box onClick={()=>{navigate("users")}} sx={{...boxSX, width:`${100/ELEMS}vw`}}>
        <Stack alignItems={"center"}>
        <PeopleIcon sx={imageSX}/>
        <Typography>Список пользователей</Typography>
        </Stack>
      </Box>
    </Stack>
   ) 
}