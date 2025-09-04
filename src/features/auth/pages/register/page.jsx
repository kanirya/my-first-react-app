"use client"

import React, {useContext, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext.jsx";

const EyeIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
    </svg>
)

const EyeOffIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
        />
    </svg>
)

const CheckIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
)

const XIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
)

const UserIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
    </svg>
)

const MailIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
    </svg>
)

const LockIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
    </svg>
)



const GoogleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
    </svg>
)

const GithubIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
)

const passwordRules = [
    {
        id: "length",
        test: (password) => password.length >= 8,
        message: "At least 8 characters",
    },
    {
        id: "uppercase",
        test: (password) => /[A-Z]/.test(password),
        message: "One uppercase letter",
    },
    {
        id: "lowercase",
        test: (password) => /[a-z]/.test(password),
        message: "One lowercase letter",
    },
    {
        id: "number",
        test: (password) => /[0-9]/.test(password),
        message: "One number",
    },
    {
        id: "special",
        test: (password) => /[^a-zA-Z0-9]/.test(password),
        message: "One special character",
    },
]

export default function Registration() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [focusedField, setFocusedField] = useState(null)
    const {register}=useContext(AuthContext)

    const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))

        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors((prev) => {
                const updated = { ...prev }
                delete updated[name]
                return updated
            })
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const getPasswordStrength = (password) => {
        const passedRules = passwordRules.filter((rule) => rule.test(password)).length
        return (passedRules / passwordRules.length) * 100
    }

    const getStrengthLabel = (strength) => {
        if (strength === 0) return { label: "Enter password", color: "bg-gray-300" }
        if (strength < 40) return { label: "Weak", color: "bg-red-500" }
        if (strength < 80) return { label: "Fair", color: "bg-yellow-500" }
        if (strength < 100) return { label: "Good", color: "bg-blue-500" }
        return { label: "Strong", color: "bg-green-500" }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!form.name.trim()) {
            newErrors.name = "Name is required"
        } else if (form.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters"
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!validateEmail(form.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!form.password) {
            newErrors.password = "Password is required"
        } else {
            const failedRules = passwordRules.filter((rule) => !rule.test(form.password))
            if (failedRules.length > 0) {
                newErrors.password = "Password doesn't meet all requirements"
            }
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match"
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = validateForm()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)
        setErrors({})

        try {
            // Simulate API call
           await register(form.name,form.email, form.password)
            navigate("/dashboard")
            // Handle successful registration
        } catch (err) {
            setErrors({ general: `Registration failed. Please try again. ${err.message}` })
        } finally {
            setIsLoading(false)
        }
    }

    const passwordStrength = getPasswordStrength(form.password)
    const strengthInfo = getStrengthLabel(passwordStrength)

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
            <div className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-xl py-5 ">
                <h2 className="text-2xl mt-2 font-bold text-white text-center">Create account</h2>
                <p className="text-gray-400 text-center mb-6 text-sm">
                    Join thousands of users and get started today
                </p>

                <div className="px-8 py-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-2">

                            <div className="relative">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("name")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Full Name"

                                    className={`w-full pl-4 pr-4 text-white py-3 bg-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl transition-all duration-200 focus:outline-none ${
                                        errors.name
                                            ? "border-red-500 ring-1  focus:border-red-500 "
                                            : focusedField === "name"
                                                ? "border-indigo-300  focus:border-indigo-500  "
                                                : ""
                                    }`}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                                    <XIcon className="w-4 h-4" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">

                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="you@example.com"
                                    className={`w-full pl-4 pr-4 text-white py-3 bg-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl transition-all duration-200 focus:outline-none ${
                                        errors.email
                                            ? "border-red-600 ring-1 focus:border-red-500 focus:ring-1 focus:ring-red-100"
                                            : focusedField === "email"
                                                ? "border-indigo-300  focus:border-indigo-500 "
                                                : "border-gray-200 hover:border-gray-300"
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                                    <XIcon className="w-4 h-4" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Create a strong password"
                                    className={`w-full pl-4 pr-4 text-white py-3 bg-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl transition-all duration-200  ${
                                        errors.password
                                            ? "border-red-500 focus:border-red-500 ring-1 focus:ring-1 focus:ring-red-100"
                                            : focusedField === "password"
                                                ? "border-indigo-300  focus:border-indigo-500 "
                                                : "border-gray-200 hover:border-gray-300"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>

                            {form.password && (
                                <div className="space-y-3 ">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-600">Password strength</span>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                strengthInfo.color === "bg-red-500"
                                                    ? "bg-red-100 text-red-700"
                                                    : strengthInfo.color === "bg-yellow-500"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : strengthInfo.color === "bg-blue-500"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : strengthInfo.color === "bg-green-500"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                      {strengthInfo.label}
                    </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${strengthInfo.color}`}
                                            style={{ width: `${passwordStrength}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {(focusedField === "password" || form.password) && (
                                <div className="space-y-2 p-4 bg-gray rounded-xl border border-gray-200">
                                    <p className="text-xs font-semibold text-gray-700 mb-3">Password must contain:</p>
                                    {passwordRules.map((rule) => {
                                        const isValid = rule.test(form.password)
                                        return (
                                            <div
                                                key={rule.id}
                                                className={`flex items-center gap-3 text-sm transition-all duration-200 ${
                                                    isValid ? "text-green-700" : "text-gray-500"
                                                }`}
                                            >
                                                <div
                                                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                                                        isValid ? "bg-green-100" : "bg-gray-200"
                                                    }`}
                                                >
                                                    {isValid ? (
                                                        <CheckIcon className="w-3 h-3 text-green-600" />
                                                    ) : (
                                                        <XIcon className="w-3 h-3 text-gray-400" />
                                                    )}
                                                </div>
                                                <span className={isValid ? "font-medium" : ""}>{rule.message}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                            {errors.password && (
                                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                                    <XIcon className="w-4 h-4" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">

                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("confirmPassword")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Confirm your password"
                                    className={`w-full pl-4 pr-4 text-white py-3 bg-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl transition-all duration-200 focus:outline-none ${
                                        errors.confirmPassword
                                            ? "border-red-500 ring-1 border-red focus:border-red-500 focus:ring-1 focus:ring-red-100"
                                            : form.confirmPassword && form.password === form.confirmPassword
                                                ? "border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                                                : focusedField === "confirmPassword"
                                                    ? "border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
                                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>

                            {form.confirmPassword && form.password === form.confirmPassword && (
                                <p className="text-sm text-green-600 flex items-center gap-2 mt-1">
                                    <CheckIcon className="w-4 h-4" />
                                    Passwords match perfectly!
                                </p>
                            )}

                            {errors.confirmPassword && (
                                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                                    <XIcon className="w-4 h-4" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* General Error */}
                        {errors.general && (
                            <div className="p-4 bg-dark-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-700 flex items-center gap-2">
                                    <XIcon className="w-4 h-4" />
                                    {errors.general}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating your account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-gray-800 px-4 rounded-lg text-gray-500 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-400 rounded-xl font-semibold text-gray-700
                         hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                            <GoogleIcon className="w-5 h-5" />
                            Google
                        </button>
                        <button className="flex items-center  justify-center gap-3 py-3 px-4 border-2 border-gray-400 rounded-xl font-semibold text-gray-500
                         hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                            <GithubIcon className="w-5 h-5" />
                            GitHub
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
