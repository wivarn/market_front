import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
