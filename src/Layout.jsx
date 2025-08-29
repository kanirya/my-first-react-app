import React from 'react'
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import {Outlet} from "react-router-dom";
function Layout() {
    return (
        <>
            <Header />
            <Outlet />

            <Footer />
        </>

    )
}

export default Layout
