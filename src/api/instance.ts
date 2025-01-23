// import { cookieStorage } from "@ibnlanre/portal";
import axios from "axios";

export const instance = axios.create({
  baseURL: "/api/v1",
 
});

instance.interceptors.request.use(
  (config: any) => {
    const token: string = localStorage.getItem("access_token") as "";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Error", error);
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//     (response)=> response,
//     (error)=> error
// )
