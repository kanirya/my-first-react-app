import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../../../../utils/utils.jsx";



export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const[isLoading,setisLoading]=useState(false);
    const[seePass,setseePass]=useState(false);




    async function handleSubmit(e) {
        e.preventDefault();
        const newErrors = {};

        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

            setErrors({});


        try {
            setisLoading(true);
            await login(form.email, form.password);
            navigate("/dashboard");
            setisLoading(false);
        } catch (err) {
            if (err.message.toLowerCase().includes("email")) {
                setErrors({ email: err.message });
            } else if (err.message.toLowerCase().includes("password")) {
                setErrors({ password: err.message });
            } else {
                setErrors({ general: err.message });
            }
        }finally {
            setisLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
            <div className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-white text-center">Login</h2>
                <p className="text-gray-400 text-center mb-6 text-sm">
                    Access your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="relative w-full">
                        <input
                            type={seePass ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setseePass(!seePass)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        >
                            {seePass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {errors.general && (
                        <p className="text-red-500 text-center text-sm">{errors.general}</p>
                    )}
                    {isLoading ? <Loader/>:
                        <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 text-white font-semibold rounded-lg transition duration-300 
                              bg-indigo-600 hover:bg-indigo-700"`}
                    >
                       Login
                    </button>}

                </form>

                <div className="mt-6 space-y-3">
                    <button className="w-full py-2 flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>

                    <button className="w-full py-2 flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition">
                        <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-5 h-5" />
                        Continue with GitHub
                    </button>
                </div>

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
