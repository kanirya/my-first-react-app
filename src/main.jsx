import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import Layout from "./Layout.jsx";
import LoginPage from "./features/auth/pages/login/page.jsx";
import Home from "./App.jsx";
import Contact from "./pages/testing_page.jsx";
import Registration from "./features/auth/pages/register/page.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Dashboard from "./features/dashboard/dashboard.jsx";
import {AuthProvider} from "./features/auth/services/authApi.jsx";
import GlobalErrorPage from "./utils/errorBoundry.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <GlobalErrorPage />, // ✅ here
        children: [
            { index: true, element: <Home /> },
            { path: "/contact/:id", element: <Contact /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <Registration /> },
            {
                element: <PrivateRoute />,
                children: [{ path: "/dashboard", element: <Dashboard /> }],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <AuthProvider>
            <RouterProvider router={router} />
    </AuthProvider>
</React.StrictMode>
);

