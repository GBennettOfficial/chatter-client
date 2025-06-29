import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE == 'development' ? 'http://localhost:5001/api/' : "https://chatty-api-m3oi.onrender.com/api/",
    withCredentials: true,
})