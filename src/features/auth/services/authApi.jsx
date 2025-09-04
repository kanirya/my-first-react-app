import { useState, useEffect } from "react"
import API from "../api/axios"
import { AuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

function extractRole(decoded) {
    return (
        decoded.role ||
        decoded.roles ||
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        null
    )
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [tokens, setTokens] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            const stored = JSON.parse(localStorage.getItem("authData"))
            if (stored?.accessToken) {
                try {
                    const decoded = jwtDecode(stored.accessToken)
                    const role = extractRole(decoded)
                    setTokens(stored)
                    setUser({
                        email: stored.email,
                        name: stored.name,
                        uid: stored.uid,
                        role,
                        loginTime: stored.loginTime,
                    })
                } catch {
                    setUser(null)
                    setTokens(null)
                }
            }
            setLoading(false)
        }
        init()
    }, [])

    async function register(name, email, password) {
        try {
            const res = await API.post("/register", { name, email, password })

            const decoded = jwtDecode(res.data.AccessToken)
            const extractedRole = extractRole(decoded)

            const authData = {
                accessToken: res.data.AccessToken,
                expiresAt: res.data.ExpiresAt,
                email: res.data.ReturnUserData.Email,
                name: res.data.ReturnUserData.Name,
                loginTime: res.data.ReturnUserData.loginDate,
                uid: res.data.ReturnUserData.Uid,
            }

            localStorage.setItem("authData", JSON.stringify(authData))
            Cookies.set("refreshToken", res.data.RefreshToken, {
                secure: true,
                sameSite: "strict",
            })

            setTokens(authData)
            setUser({
                email: authData.email,
                name: authData.name,
                uid: authData.uid,
                role: extractedRole,
                loginTime: authData.loginTime,
            })
        } catch (err) {
            throw new Error(
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.response?.data?.detail ||
                "Invalid credentials"
            )
        }
    }

    async function login(email, password) {
        try {
            const res = await API.post("/login", { email, password })

            const decoded = jwtDecode(res.data.AccessToken)
            const extractedRole = extractRole(decoded)

            const authData = {
                accessToken: res.data.AccessToken,
                expiresAt: res.data.ExpiresAt,
                email: res.data.ReturnUserData.Email,
                name: res.data.ReturnUserData.Name,
                loginTime: res.data.ReturnUserData.loginDate,
                uid: res.data.ReturnUserData.Uid,
            }

            localStorage.setItem("authData", JSON.stringify(authData))
            Cookies.set("refreshToken", res.data.RefreshToken, {
                secure: true,
                sameSite: "strict"
            })

            setTokens(authData)
            setUser({
                email: authData.email,
                name: authData.name,
                uid: authData.uid,
                role: extractedRole,
                loginTime: authData.loginTime,
            })
        } catch (err) {
            throw new Error(
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.response?.data?.detail ||
                "Invalid credentials"
            )
        }
    }

    function logout() {
        localStorage.removeItem("authData")
        Cookies.remove("refreshToken")
        setTokens(null)
        setUser(null)
    }

    async function refreshToken() {
        const refreshToken = Cookies.get("refreshToken")
        if (!refreshToken) return logout()

        try {
            const res = await API.post("/refresh", { refreshToken })

            const decoded = jwtDecode(res.data.AccessToken)
            const extractedRole = extractRole(decoded)

            const updated = {
                ...tokens,
                accessToken: res.data.AccessToken,
                expiresAt: res.data.ExpiresAt,
            }

            localStorage.setItem("authData", JSON.stringify(updated))
            Cookies.set("refreshToken", res.data.RefreshToken, {
                secure: true,
                sameSite: "strict"
            })

            setTokens(updated)
            setUser((prev) =>
                prev
                    ? { ...prev, role: extractedRole }
                    : { email: "", name: "", uid: "", role: extractedRole }
            )

            return updated.accessToken
        } catch {
            logout()
        }
    }

    useEffect(() => {
        if (!tokens?.expiresAt) return
        const expiry = new Date(tokens.expiresAt).getTime()
        const now = Date.now()
        const timeout = expiry - now - 60 * 1000
        if (timeout > 0) {
            const timer = setTimeout(refreshToken, timeout)
            return () => clearTimeout(timer)
        } else {
            refreshToken()
        }
    }, [tokens])

    return (
        <AuthContext.Provider value={{ user, login, register, logout, tokens, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
