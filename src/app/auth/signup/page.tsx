"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long")
      return
    }

    setLoading(true)

    try {
      // Register user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        setLoading(false)
        return
      }

      // Auto sign in after successful registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setError("Registration successful but sign in failed. Please try signing in manually.")
        setLoading(false)
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_20px)]"></div>

      <div className="max-w-md w-full space-y-8 relative">
        {/* Card-style form container */}
        <div className="bg-white rounded-xl shadow-2xl p-8 border-8 border-[#BF1736] relative">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#243CBF] rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#BF1736] rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#BF1736] rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#243CBF] rounded-br-xl"></div>

          <div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 mb-2">
              ♣ Create Account ♦
            </h2>
            <p className="mt-2 text-center text-sm text-gray-900 font-medium">
              Or{" "}
              <Link href="/auth/signin" className="font-bold text-[#BF1736] hover:text-[#2944D9] border-b-2 border-[#BF1736] hover:border-[#2944D9]">
                sign in to existing account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border-4 border-[#BF1736] text-red-900 px-4 py-3 rounded-lg font-bold shadow-lg">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-bold text-gray-900 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-400 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF1736] focus:border-[#BF1736] sm:text-sm font-medium shadow"
                  placeholder="Choose a username"
                />
                <p className="mt-1 text-xs text-gray-700 font-medium">At least 3 characters</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-400 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF1736] focus:border-[#BF1736] sm:text-sm font-medium shadow"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-400 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF1736] focus:border-[#BF1736] sm:text-sm font-medium shadow"
                  placeholder="Create a password"
                />
                <p className="mt-1 text-xs text-gray-700 font-medium">At least 6 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-900 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-400 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF1736] focus:border-[#BF1736] sm:text-sm font-medium shadow"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[#BF1736] focus:ring-[#BF1736] border-gray-400 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-bold text-gray-900">
                  I agree to the{" "}
                  <a href="#" className="text-[#243CBF] hover:text-[#2944D9] border-b-2 border-[#243CBF] hover:border-[#2944D9]">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border-4 border-gray-900 text-base font-bold rounded-lg text-white bg-[#BF1736] hover:bg-[#2944D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF1736] disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg transition"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "♥ Sign Up ♠"
                )}
              </button>
            </div>

            <div className="text-center pt-4 border-t-2 border-gray-300">
              <p className="text-sm text-gray-900 font-medium">
                Already have an account?{" "}
                <Link href="/auth/signin" className="font-bold text-[#BF1736] hover:text-[#2944D9] border-b-2 border-[#BF1736] hover:border-[#2944D9]">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
