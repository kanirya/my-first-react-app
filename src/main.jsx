import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import Layout from "./Layout.jsx";
import LoginPage from "./auth/login/page.jsx";
import Home from "./App.jsx";
import Contact from "./pages/testing_page.jsx";


const router=createBrowserRouter([
    {
        path: "/",
        element:<Layout/>,
        children:[
            {index: true, element:<Home/>},
            {path:"login",element:<LoginPage/>},
            {path:"/contact",element:<Contact/>},
            {path:"/login",element:<LoginPage/>}
        ]

    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <RouterProvider router={router}/>
</React.StrictMode>
);