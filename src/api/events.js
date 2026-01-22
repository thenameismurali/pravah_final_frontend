import axios from "axios";

export const api = axios.create({
  baseURL: "https://pravah-final.onrender.com/api",
});
