import MainNavBar from '../components/MainNavBar';
import AdminIcons from '../components/AdminIcons';
import { Container } from '@mui/material';
import { Outlet } from 'react-router';
export default function Admin(){
    return(
        <>
        <MainNavBar/>
        <Container maxWidth="lg" sx={{my:'10px'}}>
          <AdminIcons/>
          <Outlet/>
        </Container>
        </>
    )
}