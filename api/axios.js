import axios from "axios";

import { BACKEND_URL } from "../config/env";

axios.defaults.baseURL = BACKEND_URL;

axios.interceptors.request.use(
  (config) => {
    const accessToken = useCookie("accessToken");
    const token = accessToken.value?.accessToken
    // console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axios;
