import { useContext } from "react";
import { AuthContext } from "./features/auth/context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="text-white">Loading...</div>;
    return user ? <Outlet /> : <Navigate to="/login" />;
}
