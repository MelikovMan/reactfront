import { instance } from "../auth_config";
import { createContext, useContext, useMemo } from "react";
const GETUSER_ENDPOINT = '/admin/employees'
const DELETEUSER_ENDPOINT = '/admin/employees/delete'
const СHANGEUSER_ENDPOINT = '/admin/employees/change'

const AdminService = {

    get () {
        return instance.get(GETUSER_ENDPOINT)
    },
    
    update(body) {
        return instance.post(СHANGEUSER_ENDPOINT,body);
    },
    
    add(body) {
        return instance.post(GETUSER_ENDPOINT,body)
    },
    delete(body) {
        return instance.post(DELETEUSER_ENDPOINT,body)
    },
}
const AdminContext = createContext();
const AdminProvider = ({ children }) => {
    // State to hold the authentication token
    const get = async () =>{
        const results = await AdminService.get();
        console.log(results);
        return results.data.data;
    }
    const add = async ({
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
        const json = await JSON.stringify({
            first_name:first_name,
            last_name:last_name,
            middle_name:middle_name,
            email:login,
            password:password,
            passport:passport,
            inn:inn,
            snils:snils,
            birthday:birthday,
            role:role,
        });
        const results = await AdminService.add(json);
        console.log(results);
        return results.data.data;

    }
    const deleteUser = async ({id})=>{
        console.log(id);
        const json = await JSON.stringify({
            employee_id:id
          });
        console.log(json);
        const results = await AdminService.delete(json);
        return results.data.status
    }
    const update = async ({
        id,
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
        const json = await JSON.stringify({
            employee_id:id,
            first_name:first_name,
            last_name:last_name,
            middle_name:middle_name,
            email:login,
            password:password,
            passport:passport,
            inn:inn,
            snils:snils,
            birthday:birthday,
            role:role,
        });
        console.log(json);
        const results = await AdminService.update(json);
        return results.data.status;
    }
    const contextValue = useMemo(
        () => ({
          get,
          add,
          deleteUser,
          update
        }),
        [get,add,deleteUser,update]
      );
      return (
        <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>
      );
}
export const useAdmin = () => {
    return useContext(AdminContext);
};
  
  export default AdminProvider;
