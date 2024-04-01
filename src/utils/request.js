import axios from "axios";

const request = axios.create({
  baseURL: "https://blogapp-rmn5.onrender.com",
});

export default request;
