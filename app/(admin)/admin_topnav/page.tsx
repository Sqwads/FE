import Image from "next/image";
import { FiBell, FiBookmark } from "react-icons/fi";

export default function TopNav() {
  return (
    <nav className="shadow-md px-6 py-4 flex items-center justify-between top-0 z-50">
      {/* Search Bar */}
      <div className="flex-1 mx-6 hidden md:block">
        <input
          type="text"
          placeholder="Search anything here..."
          className="w-full px-4 py-2 rounded-md bg-white shadow-sm text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
