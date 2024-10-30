import axios from "axios";

const newRequest = axios.create({
  baseURL: `https://skillstream.onrender.com/api/`,
  withCredentials: true,
});

export default newRequest;