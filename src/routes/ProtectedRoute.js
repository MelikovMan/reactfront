import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const ProtectedRoute = () => {
    const { token, authInProgress } = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
      if(token) navigate("/dashboard");
    },[token]);
  
    // Check if the user is authenticated
    if (authInProgress) {
        return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>);
      }
    if (!token) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
  
    // If authenticated, render the child routes
    return <Outlet />;
  };
  