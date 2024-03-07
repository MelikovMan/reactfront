import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login"
import Main from "../pages/Main"
import Dashboard from "../pages/Dashboard";
import { Link as LinkUI } from "@mui/material";
export const publicLinks = [
  <LinkUI component={Link} underline="none" color="inherit" to={"/service"}>Сервис</LinkUI>,
  <LinkUI component={Link} underline="none" color="inherit" to={"/about-us"}>О нас</LinkUI>,
]
export const privateLinks = [
  <LinkUI component={Link} underline="none" color="inherit" to={"/dashboard"}>Главная страница сервиса</LinkUI>,
  <LinkUI component={Link} underline="none" color="inherit" to={"/profile"}>Профиль</LinkUI>,
  <LinkUI component={Link} underline="none" color="inherit" to={"/logout"}>Выход</LinkUI>,
]
export const publicOnlyLinks = [
  <LinkUI component={Link} underline="none" color="inherit" to={"/"}>Главная страница</LinkUI>,
  <LinkUI component={Link} underline="none" color="inherit" to={"/login"}>Профиль</LinkUI>,
]
const Routes = () => {
    const { token } = useAuth();
  
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
        path: "/auth/login",
        element: <div>No pass!!</div>,
      },
    ];
  
    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
      {
        path: "/",
        element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
        children: [
          {
            path: "/dashboard",
            element: <Dashboard/>,
          },
          {
            path: "/profile",
            element: <div>User Profile</div>,
          },
          {
            path: "/logout",
            element: <div>Logout</div>,
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
      {
        path: "/login",
        element: <Login/>,
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