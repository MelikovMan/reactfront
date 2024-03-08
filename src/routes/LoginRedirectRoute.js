import { useNavigate, Navigate } from "react-router";
import Login from "../pages/Login";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

export default function LoginRedirectRoute(){
    const {token} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if (token) navigate("/dashboard")
    },[token]);
    return(<>
    {token ? 
        <Navigate to="/dashboard"/>:
        <Login/>}
    </>
    )
}