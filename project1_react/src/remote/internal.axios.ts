import Axios from "axios";

const server = "http://192.168.1.7:3001/";

export const internalAxios = Axios.create({
  baseURL: server,
  withCredentials: true,
});
