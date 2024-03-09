import { RouterProvider, createBrowserRouter, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Users from "../pages/Users"
import Main from "../pages/Main"
import Dashboard from "../pages/Dashboard";
import LoginRedirectRoute from "./LoginRedirectRoute";
import { Link as LinkUI } from "@mui/material";
import { useEffect } from "react";
import Admin from "../pages/Admin";
import AddUser from "../pages/AddUser";
import Delete from "../pages/Delete";
export const publicLinks = [
  <LinkUI component={Link} underline="none" color="inherit" to={"/service"}>Сервис</LinkUI>,
  <LinkUI component={Link} underline="none" color="inherit" to={"/about-us"}>О нас</LinkUI>,
]
export const privateLinks = [
  <LinkUI component={Link} underline="none" color="inherit" to={"/dashboard"}>Главная страница сервиса</LinkUI>,
  <LinkUI component={Link} underline="none" color="inherit" to={"/profile"}>Профиль</LinkUI>,
  //<LinkUI component={Link} underline="none" color="inherit" to={"/logout"}>Выход</LinkUI>,
]
export const publicOnlyLinks = [
  <LinkUI component={Link} underline="none" color="inherit" to={"/"}>Главная страница</LinkUI>,
  <LinkUI component={Link} underline="none" color="inherit" to={"/login"}>Профиль</LinkUI>,
]
const Routes = () => {
    const { token,refresh } = useAuth();
    useEffect(()=>{
      if(token) refresh();
    }, [token])
  
    // Define public routes accessible to all users
    const routesForPublic = [
      {
        path: "/service",
        element: <div>Service Page</div>,
      },
      {
        path: "/about-us",
        element: <div>About Us</div>,
      },
      {
        path: "/login",
        element: <LoginRedirectRoute/>,
      },
    ];
  
    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
      {
        path: "/",
        element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
        children: [
          {
            path: "dashboard",
            element: <Dashboard/>,
            children: [
              {
                path: "wares",
                element: <div>Ware List</div>,
              },
              {
                path: "storage",
                element: <div>Storage Info</div>,
              },
              {
                path: "orders",
                element: <div>Order List</div>,
              },
            ]
          },
          {
            path: "profile",
            element: <div>User Profile</div>,
          },
          {
            path: "logout",
            element: <div>Logout</div>,
          },
          {
            path: "dashboardAdmin",
            element: <Admin/>,
            children: [
              {
                path: "users",
                element: <Users/>,
                children: [
                  {
                    path: "add",
                    element: <AddUser/>,
                  },
                  {
                    path: "delete",
                    element: <Delete/>,
                  },
                ]
              },
            ]
          },
          
        ],
      },
    ];
  
    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
      {
        path: "/",
        element: <Main/>,
      },
    ];
  
    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
  
    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
  };
  
  export default Routes;