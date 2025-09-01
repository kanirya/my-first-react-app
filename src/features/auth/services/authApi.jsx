import { useState, useEffect } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("authData"));
        if (stored) {
            setTokens(stored);
            setUser({ email: stored.email, name: stored.name }); // adjust to what backend gives
        }
    }, []);

    async function login(email, password) {
        const res = await API.post("/login", { email, password });

        const authData = {
            accessToken: res.data.AccessToken,
            refreshToken: res.data.RefreshToken,
            expiresAt: res.data.ExpiresAt,
            email: email, // optional if backend returns user
        };

        Cookies.set("accessToken", res.data.AccessToken);
        localStorage.setItem("authData", JSON.stringify(authData));
        setTokens(authData);
        setUser({ email: authData.email, name: authData.name });
    }

    async function register(name, email, password) {
        const res = await API.post("/register", { name, email, password });

        const authData = {
            accessToken: res.data.AccessToken,
            refreshToken: res.data.RefreshToken,
            expiresAt: res.data.ExpiresAt,
            email: email,
            name: name,
        };

        localStorage.setItem("authData", JSON.stringify(authData));
        setTokens(authData);
        setUser({ email: authData.email, name: authData.name });
    }


    function logout() {
        localStorage.removeItem("authData");
        setTokens(null);
        setUser(null);
    }

    async function refreshToken() {
        if (!tokens?.refreshToken) return logout();

        try {
            const res = await API.post("/refresh-token", { refreshToken: tokens.refreshToken });
            const updated = {
                ...tokens,
                accessToken: res.data.AccessToken,
                expiresAt: res.data.ExpiresAt,
            };
            localStorage.setItem("authData", JSON.stringify(updated));
            setTokens(updated);
            return updated.accessToken;
        } catch {
            logout();
        }
    }

    // auto refresh if token is near expiry
    useEffect(() => {
        if (!tokens?.expiresAt) return;
        const expiry = new Date(tokens.expiresAt).getTime();
        const now = Date.now();
        const timeout = expiry - now - 60 * 1000; // refresh 1 min before expiry

        if (timeout > 0) {
            const timer = setTimeout(refreshToken, timeout);
            return () => clearTimeout(timer);
        } else {
            refreshToken();
        }
    }, [tokens]);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, tokens }}>
            {children}
        </AuthContext.Provider>
    );
}
