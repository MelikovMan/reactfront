import InventoryIcon from '@mui/icons-material/Inventory';
import StorageIcon from '@mui/icons-material/Storage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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
      <Box onClick={()=>{navigate("/dashboard/wares")}} sx={{...boxSX, width:`${100/ELEMS}vw`}}>
        <Stack alignItems={"center"}>
        <InventoryIcon sx={imageSX}/>
        <Typography>Товары</Typography>
        </Stack>
      </Box>
      <Box onClick={()=>{navigate("/dashboard/storage")}} sx={{...boxSX, width:`${100/ELEMS}vw`}}>
        <Stack alignItems={"center"}>
        <StorageIcon sx={imageSX}/>
        <Typography>Склад</Typography>
        </Stack>
      </Box>
      <Box onClick={()=>{navigate("/dashboard/orders")}} sx={{...boxSX, width:`${100/ELEMS}vw`}}>
        <Stack alignItems={"center"}>
        <LocalShippingIcon sx={imageSX}/>
        <Typography>Заказы</Typography>
        </Stack>
      </Box>
    </Stack>
   ) 
}