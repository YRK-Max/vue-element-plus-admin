import axios from "axios";
import { getToken } from "./token";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 50 * 1000
})

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
})

export default service