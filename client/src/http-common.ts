import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: "http://120.126.18.131:8081/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
