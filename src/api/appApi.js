import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const appApi = axios.create({
    baseURL: VITE_API_URL,
});

// Interceptor para incluir el token en las peticiones privadas
appApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default appApi;