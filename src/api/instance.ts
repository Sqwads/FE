// import { cookieStorage } from "@ibnlanre/portal";
import { cookieStorage } from "@ibnlanre/portal";
import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}/api/v1`,
 
});

instance.interceptors.request.use(
  (config: any) => {
    const token: string = cookieStorage.getItem("access_token") as "";
    // console.log(token)
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
