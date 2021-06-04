import Axios from "axios";

const version = 0;

export const base = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}/v${version}`,
  timeout: 30000, // 30 seconds
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
