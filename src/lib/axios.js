import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://chatty-api-m3oi.onrender.com/api/",
    withCredentials: true,
})