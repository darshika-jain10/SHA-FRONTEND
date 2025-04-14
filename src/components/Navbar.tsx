
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#333] text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative left-[-10px]">
            {/* Replace with your actual logo */}
            <div className="h-[60px] w-[60px] bg-yellow-200 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">Logo</span>
            </div>
          </div>
          <h2 className="text-[#e6d086] text-2xl font-bold">SMART ERA</h2>
        </div>

        <div 
          className={cn("hamburger", isMenuOpen && "active")} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav>
          <ul 
            className={cn(
              "nav-menu flex space-x-4", 
              isMenuOpen && "active"
            )}
          >
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
