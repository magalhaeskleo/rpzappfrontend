import axios from "axios";

const api = axios.create({
  baseURL: "https://rpzappbackend.herokuapp.com",
});

export default api;
