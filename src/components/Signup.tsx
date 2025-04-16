

import type React from "react"
import { useState } from "react"
import { Github, Twitter, Mail } from "lucide-react"
import { Link } from "react-router-dom"
export default function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("token", data.token)
        window.location.href = "/login"
        alert("Signup successful!")
        // Redirect or update UI accordingly
      } else {
        alert(data.message || "Signup failed")
      }
    } catch (error) {
      console.error("Signup error:", error)
      alert("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Card Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100">Create an account</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mt-1">Sign up to get started with our platform</p>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500
                        dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400
                        transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500
                        dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400
                        transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500
                        dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400
                        transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500
                        dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400
                        transition-all duration-200"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
              I agree to the{" "}
              <a href="#" className="text-slate-800 dark:text-slate-300 hover:underline font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-slate-800 dark:text-slate-300 hover:underline font-medium">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                      text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                      dark:bg-slate-700 dark:hover:bg-slate-600
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-200"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">Or sign up with</span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-3 gap-3">
          <button
            className="flex items-center justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                      text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 
                      hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                      transition-all duration-200"
          >
            <Github className="h-4 w-4 mr-2" />
            <span className="sr-only sm:not-sr-only sm:text-xs">GitHub</span>
          </button>
          <button
            className="flex items-center justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                      text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 
                      hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                      transition-all duration-200"
          >
            <Twitter className="h-4 w-4 mr-2" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Twitter</span>
          </button>
          <button
            className="flex items-center justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm 
                      text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 
                      hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                      transition-all duration-200"
          >
            <Mail className="h-4 w-4 mr-2" />
            <span className="sr-only sm:not-sr-only sm:text-xs">Google</span>
          </button>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-700 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <a
            href="/sign-up"
            className="text-slate-800 dark:text-slate-300 hover:underline font-medium transition-all duration-200"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
