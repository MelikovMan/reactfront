import {instance, URL, PORT, REFRESH_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, TEST_ENDPOINT} from './auth_config';


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
    test() {
        return instance.get(TEST_ENDPOINT)
    },
}

export default AuthService