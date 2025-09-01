import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function LoginPage() {


    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate("/home");
        } catch {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Welcome Back
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    Login to continue exploring
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e)=>setForm({ ...form, email: e.target.value })}
                            className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e)=>setForm({ ...form, password: e.target.value })}
                            className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-gray-400 text-sm">
                            <input
                                type="checkbox"
                                className="mr-2 rounded bg-gray-700 border-gray-600"
                            />
                            Remember me
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-sm text-indigo-400 hover:text-indigo-300"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
