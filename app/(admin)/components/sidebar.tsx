'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaProjectDiagram, FaUsers, FaUserTie, FaBriefcase } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  // Function to check if the link is active
  const isActive = (path: string): boolean => pathname === path;

  return (
    <div className="relative h-screen">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-gray-700 bg-white shadow-lg rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        style={{ backgroundImage: 'url("/images/signup_bg.png")' }}
        className={`fixed top-0 left-0 h-full lg:w-64 w-56 p-5 flex flex-col transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} z-40`} 
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Image src="/images/sqwads-logo-2.png" alt="Logo" width={100} height={50} />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link 
            href="/admin_dashboard" 
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive('/dashboard') ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-blue-100'
            }`}
          >
            <HiOutlineHome size={20} /> Dashboard
          </Link>
          <Link 
            href="/projects" 
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive('/projects') ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-blue-100'
            }`}
          >
            <FaProjectDiagram size={20} /> Projects
          </Link>
          <Link 
            href="/users" 
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive('/users') ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-blue-100'
            }`}
          >
            <FaUsers size={20} /> Users
          </Link>
          <Link 
            href="/mentors" 
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive('/mentors') ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-blue-100'
            }`}
          >
            <FaUserTie size={20} /> Sqwad Mentors
          </Link>
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive('/admin') ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-blue-100'
            }`}
          >
            <FaBriefcase size={20} /> Admin Control
          </Link>
        </nav>

        {/* Footer - User Profile */}
        <div className="mt-auto flex items-center gap-3 p-4 text-white rounded-lg">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white font-bold rounded-full">
            Y
          </div>
          <div>
            <h2 className="font-bold text-sm text-[#001D69]">Yusuf Olowode</h2>
            <p className="text-xs text-[#16181BB2]">yusufolo@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
