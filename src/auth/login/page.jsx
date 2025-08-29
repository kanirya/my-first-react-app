import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Welcome Back
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    Login to continue exploring
                </p>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
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
