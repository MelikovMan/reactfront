import {instance, URL, PORT, REFRESH_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT} from './auth_config';


const AuthService = {

    login (email, password) {
        return instance.post(LOGIN_ENDPOINT, {email, password})
    },
    
    refreshToken() {
        return instance.get(REFRESH_ENDPOINT);
    },
    
    logout() {
        return instance.post(LOGOUT_ENDPOINT)
    },
}

export default AuthService