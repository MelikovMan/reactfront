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
            setAuthProgress(true);
            const json = await JSON.stringify({
              email:login,
              password:password
            });
            const resp = await AuthService.login(json);
            console.log(resp.data.data);
            const parsed = resp.data.data;
            localStorage.setItem("token", parsed.access_token_string);
            setToken({...parsed});
            success=true;
      
           } catch (err) {
            console.log(err);
           } finally {
            setAuthProgress(false);
            return success;
          } 
    });
    const refresh = useCallback(async ()=>{
      setAuthProgress(true);
    try {
      const resp = await AuthService.refreshToken();
      localStorage.setItem("token", resp.data.data.access_token_string);
      setToken(resp.data.data.access_token_string);

     } catch (err) {
      console.log(err);
     } finally {
      setAuthProgress(false);
    } 
    });
    const logout = useCallback(async () =>{
        try {
            setAuthProgress(true)
            //const resp = await AuthService.logout();
            localStorage.removeItem("token");
            setToken();
      
           } catch (err) {
            console.log("logout error");
           } finally {
            setAuthProgress(false);
          } 
    });

    const register = useCallback(async ({
      first_name,
      last_name,
      middle_name,
      login,
      password,
      passport,
      inn,
      snils,
      birthday,
      role
    }) =>{
      let resl = null;
      try {
          const json = await JSON.stringify({
            first_name:first_name,
            last_name:last_name,
            middle_name:middle_name,
            login:login,
            password:password,
            passport:passport,
            inn:inn,
            snils:snils,
            birthday:birthday,
            role:role,
          });
          const resp = await AuthService.register(json);
          resl=resp;
    
         } catch (err) {
          resl=err;
         } finally {
          console.log(resl);
          return resl;
        } 
  });
  
    // Memoized value of the authentication context
    const contextValue = useMemo(
      () => ({
        token,
        authInProgress,
        login,
        logout,
        refresh,
        register,
      }),
      [token, authInProgress, login,logout,refresh,register]
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
  
  