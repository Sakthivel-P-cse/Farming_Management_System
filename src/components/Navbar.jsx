import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthstore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    // Add event listener when dropdown is shown
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };
  
  // Determine if user is district or village officer
  const isDistrictOfficer = user?.role === 'district';
  
  return (
    <div className="w-full h-16 bg-green-600/80 text-white flex items-center justify-between px-8 shadow-md">
      
      {/* Left Section — Logo / Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide">
          Vital Dashboard
        </h1>
      </div>

      {/* Center Section — Navigation Links */}
      <div className="flex gap-10 text-lg font-medium">
        {/* District Officer Links */}
        {isDistrictOfficer ? (
          <>
            <Link
              to="/overview"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/village-list"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Villages
            </Link>
            <Link
              to="/issues"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Issues
            </Link>
            <Link
              to="/godown"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Godown
            </Link>
            <Link
              to="/merchants"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Merchants
            </Link>
          </>
        ) : (
          /* Village Officer Links */
          <>
            <Link
              to="/overview"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/farmers-list"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Farmers
            </Link>
            <Link
              to="/Dealers-list"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Dealers
            </Link>
            <Link
              to="/issues"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Issues
            </Link>
            <Link
              to="/godown"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Godown
            </Link>
            <Link
              to="/merchants"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Merchants
            </Link>
          </>
        )}
      </div>

      {/* Right Section — User Profile */}
      <div className="flex items-center relative" ref={dropdownRef}>
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden hover:bg-white/30 transition-colors duration-200 border-2 border-white/40">
            <img
              src="\Screenshot 2025-10-04 202456.png"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col ml-3 leading-tight">
            <h2 className="text-lg font-semibold">{user?.name || 'User'}</h2>
            <h3 className="text-sm opacity-80">{isDistrictOfficer ? 'District Officer' : 'Village Officer'}</h3>
          </div>
          
          {/* Dropdown arrow indicator */}
          <div className="ml-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Dropdown menu with improved styling and animation */}
        <div 
          className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100 transform transition-all duration-150 ease-out origin-top-right ${
            showDropdown 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }`}
          style={{
            transitionProperty: 'transform, opacity, visibility',
            visibility: showDropdown ? 'visible' : 'hidden'
          }}
        >
            {/* User info section in dropdown */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-medium text-gray-800">{user?.email || 'user@example.com'}</p>
            </div>
            

            {/* Logout button */}
            <div className="py-1 border-t border-gray-100">
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500"
                onClick={handleLogout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
      </div>

    </div>
  );
};

export default Navbar;

