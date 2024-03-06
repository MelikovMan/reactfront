import { useNavigate, Link } from "react-router-dom"
import MainNavBar from '../components/MainNavBar'
import { Outlet } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
export default function  Main (){
    const navigate = useNavigate()
    const {token} = useAuth();
    return(
        <>
        <MainNavBar/>
          {!token ? <div className="main-greet">
              <h2>Система складского учета</h2>
              <button onClick={()=>navigate("/login")}>Вход в систему</button>
          </div>:
          <Outlet/>}
        </>
    )

}