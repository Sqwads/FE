'use client'
import { useState } from "react";
import { FiBell, FiBookmark } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

export default function TopNav() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="px-6 flex items-center justify-between z-50">
      {/* Search Bar */}
      <div className="flex-1 mx-6 hidden md:block relative">
        {/* Input Field */}
        <input
          type="text"
          className="w-[80%] px-4 py-2 pl-10 rounded-md shadow-sm text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Search Icon and Placeholder Text (Conditional Rendering) */}
        {!isFocused && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
            <span className="ml-2 text-gray-400">Search anything here...</span>
          </div>
        )}
      </div>

      {/* Right Side - Icons and Profile */}
      <div className="flex items-center gap-4">
        <FiBookmark className="text-gray-700 text-xl cursor-pointer" />
        <FiBell className="text-gray-700 text-xl cursor-pointer" />

        {/* User Profile */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            Y {/* First letter of user’s name */}
          </div>
        </div>
      </div>
    </nav>
  );
}