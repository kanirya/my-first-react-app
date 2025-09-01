import axios from "axios";

const API = axios.create({
    baseURL: "https://localhost:7168/api/Auth", // your backend URL
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
