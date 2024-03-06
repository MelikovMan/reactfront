import { useAuth } from "../providers/AuthProvider";
export default function Dashboard(){
    const {        token,
        authInProgress,
        login,
        logout}= useAuth();
    return(
        <div>
            <button onClick={()=>logout()}>Logout</button>
        </div>
    )
}