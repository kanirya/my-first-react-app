import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const API = axios.create({
    baseURL: "https://localhost:7168/api/Auth",
    withCredentials: true,
});

let store = {
    tokens: null,
    refreshToken: async () => null,
};

export const attachAuthStore = (tokensRef, refreshTokenFn) => {
    store.tokens = tokensRef;
    store.refreshToken = refreshTokenFn;
};

// Request interceptor → attach or refresh token
API.interceptors.request.use(async (config) => {
    if (!store.tokens?.accessToken) return config;

    const now = Date.now();
    if (store.tokens.accessTokenExpiry <= now) {
        const newAccessToken = await store.refreshToken();
        if (newAccessToken) {
            config.headers.Authorization = `Bearer ${newAccessToken}`;
        }
    } else {
        config.headers.Authorization = `Bearer ${store.tokens.accessToken}`;
    }

    return config;
});

// Response interceptor → handle 401
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Refresh token is invalid OR user is logged out
            store.tokens = null;
            history.push("/login"); // force redirect
        }
        return Promise.reject(error);
    }
);

export default API;
