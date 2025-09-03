import { useState, useEffect } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("authData"));
        if (stored) {
            setTokens(stored);
            setUser({
                email: stored.email,
                name: stored.name,
                uid: stored.uid,
                role: stored.role,
                loginTime: stored.loginTime,
            });
        }
        setLoading(false); // ✅ important
    }, []);


    async function register(name, email, password) {

        try{
            const res=await API.post("/register",{name,email,password});
            const authData={
                accessToken: res.data.AccessToken,
                refreshToken: res.data.RefreshToken,
                expiresAt: res.data.ExpiresAt,
                email: res.data.ReturnUserData.Email,
                name: res.data.ReturnUserData.Name,
                loginTime: res.data.ReturnUserData.loginDate,
                uid: res.data.ReturnUserData.Uid,
                role: res.data.ReturnUserData.Role,
            }
            localStorage.setItem("authData", JSON.stringify(authData));
            setTokens(authData);
            Cookies.set("refreshToken", JSON.stringify(authData.refreshToken));
            setUser({
                email: authData.email,
                name: authData.name,
                uid: authData.uid,
                role: authData.role,
                loginTime: authData.loginTime,
            })
        }catch(err){
            if (err.response) {
                console.error("Full error:", err.response.data);

                const msg =
                    err.response.data.error || // your API's error field
                    err.response.data.message ||
                    err.response.data.detail ||
                    "Invalid credentials";
    console.log("ERROR is "+msg);
                throw new Error(msg);
            } else if (err.request) {
                throw new Error("No response from server");
            } else {
                throw new Error("Request setup error");
            }
        }

    }
    async function login(email, password) {
        try {
            const res = await API.post("/login", { email, password });

            const authData = {
                accessToken: res.data.AccessToken,
                refreshToken: res.data.RefreshToken,
                expiresAt: res.data.ExpiresAt,
                email: res.data.ReturnUserData.Email,
                name: res.data.ReturnUserData.Name,
                loginTime: res.data.ReturnUserData.loginDate,
                uid: res.data.ReturnUserData.Uid,
                role: res.data.ReturnUserData.Role,
            };

            localStorage.setItem("authData", JSON.stringify(authData));
            Cookies.set("refreshToken", JSON.stringify(authData.refreshToken));
            setTokens(authData);
            setUser({
                email: authData.email,
                name: authData.name,
                uid: authData.uid,
                role: authData.role,
                loginTime: authData.loginTime,
            });
        } catch (err) {
            if (err.response) {
                console.error("Full error:", err.response.data);

                const msg =
                    err.response.data.error ||
                    err.response.data.message ||
                    err.response.data.detail ||
                    "Invalid credentials";
                console.log("ERROR is "+msg);
                throw new Error(msg);

            } else if (err.request) {
                throw new Error("No response from server");
            } else {
                throw new Error("Request setup error");
            }
        }
    }

    function logout() {
        localStorage.removeItem("authData");
        setTokens(null);
        setUser(null);
    }

    async function refreshToken() {
        if (!tokens?.refreshToken) return logout();

        try {
            const res = await API.post("/refresh-token", {
                refreshToken: tokens.refreshToken,
            });

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

    useEffect(() => {
        if (!tokens?.expiresAt) return;
        const expiry = new Date(tokens.expiresAt).getTime();
        const now = Date.now();
        const timeout = expiry - now - 60 * 1000;
        if (timeout > 0) {
            const timer = setTimeout(refreshToken, timeout);
            return () => clearTimeout(timer);
        } else {
            refreshToken();
        }
    }, [tokens]);

    return (
        <AuthContext.Provider value={{ user, login, register,logout, tokens, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
