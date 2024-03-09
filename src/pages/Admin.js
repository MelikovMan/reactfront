import MainNavBar from '../components/MainNavBar';
import AdminIcons from '../components/AdminIcons';
import { Container } from '@mui/material';
import { Outlet } from 'react-router';
import AdminProvider from '../providers/AdminProvider';
export default function Admin(){
    return(
        <AdminProvider>
        <MainNavBar/>
        <Container maxWidth="lg" sx={{my:'10px'}}>
          <AdminIcons/>
          <Outlet/>
        </Container>
        </AdminProvider>
    )
}