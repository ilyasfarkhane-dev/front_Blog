import axios from "axios";

const request = axios.create({
  baseURL: "https://blogapp-4jvw.onrender.com",
});

export default request;
