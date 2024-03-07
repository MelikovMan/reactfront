import axios from "axios";
export const URL = "localhost"
export const PORT = "8080"
export const REFRESH_ENDPOINT='update_access_token';
export const LOGIN_ENDPOINT='login';
export const LOGOUT_ENDPOINT='logout';
export const instance = axios.create({
  withCredentials: true,
  baseURL: `http://${URL}:${PORT}/`,
});

instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
      return config
    }
  )

  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
     const originalRequest = {...error.config};
     originalRequest._isRetry = true; 
      if (
        error.response.status === 401 && 
        error.config &&
        !error.config._isRetry
      ) {
        try {
          const resp = await instance.get(`${REFRESH_ENDPOINT}`);
          localStorage.setItem("token", resp.data.accessToken);
          return instance.request(originalRequest);
        } catch (error) {
          console.log("AUTH ERROR");
        }
      }
      throw error;
    }
  );