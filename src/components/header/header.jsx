import {Link,NavLink} from 'react-router-dom'
import React, {useContext} from 'react'
import {AuthContext} from "../../features/auth/context/AuthContext.jsx";

export default function Header() {
    const{user,logout} = useContext(AuthContext)
    return (
        <header className=" sticky z-50 top-0">
            <nav className="bg-transparent  px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="public/logo.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {user?(<>
                            <span className="text-white mr-4">
                                    👋 {user.email}
                                </span>
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                            >
                                Logout
                            </button>
                        </>):(<>   <Link
                            to="/login"
                            className="bg-gray-100 hover:bg-dark-100 text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                            <Link
                                to="#"
                                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Get started
                            </Link></>)}

                    </div>

                </div>
            </nav>
        </header>
    );
}

