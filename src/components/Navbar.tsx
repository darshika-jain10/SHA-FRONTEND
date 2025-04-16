import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  )
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true")
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setIsMenuOpen(false)
    navigate('/login') // Redirect to login page
  }

  return (
    <header className="bg-[#333] text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="relative left-[-10px]">
            <div className="h-[60px] w-[0px] rounded-full flex items-center justify-center">
              <span className="text-black font-bold">
                <img
                  src="\src\components\navlogo.png"
                  alt="Logo"
                  className="h-[60px] w-[60px] rounded-full"
                />
              </span>
            </div>
          </div>
          <h2 className="text-[#e6d086] text-2xl font-bold">SMART ERA</h2>
        </div>

        {/* Hamburger Menu */}
        <div
          className={cn('hamburger', isMenuOpen && 'active')}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation */}
        <nav>
          <ul className={cn('nav-menu flex space-x-4', isMenuOpen && 'active')}>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-[#575757] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/devices"
                    className="block px-4 py-2 hover:bg-[#575757] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Devices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/automation"
                    className="block px-4 py-2 hover:bg-[#575757] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Automation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-[#575757] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 bg-[#e6d086] text-black rounded hover:bg-[#d5c375] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 border border-[#e6d086] text-[#e6d086] rounded hover:bg-[#e6d086] hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
