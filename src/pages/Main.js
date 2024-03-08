import { useNavigate, Link } from "react-router-dom"
import MainNavBar from '../components/MainNavBar'
import { Outlet } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
import { Button } from "@mui/material"
export default function  Main (){
    const {token,fakelogin} = useAuth()
    const navigate = useNavigate()
    return(
        <>
        <MainNavBar/>
          {!token ? <div className="main-greet">
              <h2>Система складского учета</h2>
              <Button onClick={()=>{
                fakelogin();
                navigate("/dashboard")
              }}>Фейк вход как админ</Button>
          </div>:
          <Outlet/>}
        </>
    )

}