import {instance, URL, PORT, REFRESH_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER_ENDPOINT} from './auth_config';


const AuthService = {

    login (body) {
        return instance.post(LOGIN_ENDPOINT, body)
    },
    
    refreshToken() {
        return instance.get(REFRESH_ENDPOINT);
    },
    
    logout() {
        return instance.post(LOGOUT_ENDPOINT)
    },
    register(body) {
        return instance.post(REGISTER_ENDPOINT,body)
    },
}

export default AuthService