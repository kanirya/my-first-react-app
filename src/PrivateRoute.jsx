import { useContext } from "react";
import { AuthContext } from "./features/auth/context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ roles }) {
    const { user, loading } = useContext(AuthContext)

    if (loading) return <div className="text-white">Loading...</div>

    if (!user) return <Navigate to="/login" />

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" /> // or maybe home page
    }

    return <Outlet />
}
