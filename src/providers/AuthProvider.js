import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AuthService from '../Auth.js'
import { useNavigate } from "react-router";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem("token"));

    const [authInProgress, setAuthProgress] = useState(false)
  
    // Function to set the authentication token
    const setToken = (newToken) => {
      setToken_(newToken);
    };
    const login = useCallback(async (login, password) =>{
        let success = false;
        try {
            setAuthProgress(true)
            const resp = await AuthService.login(login,password);
            localStorage.setItem("token", resp.data.accessToken);
            setToken(resp.data.accessToken);
            success=true;
      
           } catch (err) {
            console.log(err);
           } finally {
            setAuthProgress(false);
            return success;
          } 
    });
    const fakelogin = useCallback(async () =>{
      try {
          setAuthProgress(true)
          let test = "ass";
          const resp = await async function (){
            setTimeout(()=>{
              localStorage.setItem("token", test);
              setToken(resp.data.accessToken);
            },3000);

          } 
         } catch (err) {
          console.log(err);
         } finally {
          setAuthProgress(false);
        } 
  });
    const logout = useCallback(async () =>{
        try {
            setAuthProgress(true)
            const resp = await AuthService.logout();
            localStorage.removeItem("token");
            setToken();
      
           } catch (err) {
            console.log("logout error");
           } finally {
            setAuthProgress(false);
          } 
    });
    const fakelogout = useCallback(async () =>{
      try {
          setAuthProgress(true)
          localStorage.removeItem("token");
          setToken();
    
         } catch (err) {
          console.log("logout error");
         } finally {
          setAuthProgress(false);
        } 
  });
  
    // Memoized value of the authentication context
    const contextValue = useMemo(
      () => ({
        token,
        authInProgress,
        login,
        fakelogin,
        logout,
        fakelogout,
      }),
      [token, authInProgress, login, fakelogin, logout, fakelogout]
    );
  
    // Provide the authentication context to the children components
    return (
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export default AuthProvider;
  
  