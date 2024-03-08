import { useAuth } from "../providers/AuthProvider";
import DashboardIcons from "../components/DashboardIcons";
import MainNavBar from "../components/MainNavBar"
import { Outlet } from "react-router";
import { Container } from "@mui/material";
export default function Dashboard(){
    const {        token,
        authInProgress,
        login,
        logout, fakelogout}= useAuth();
    return(
        <>
        <MainNavBar/>
        <Container maxWidth="lg" sx={{my:'10px'}}>
          <DashboardIcons/>
          <Outlet/>
        </Container>
        </>
    )
}