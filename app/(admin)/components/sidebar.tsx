'use client';

import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaProjectDiagram, FaUsers, FaUserTie, FaBriefcase } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-gray-700 bg-white shadow-lg rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* AdminSidebar */}
      <div
        style={{ backgroundImage: 'url("/images/signup_bg.png")' }}
        className={`fixed top-0 left-0 h-full lg:w-64 w-56 p-5 flex flex-col transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} z-40`} // Added z-40
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Image src="/images/sqwads-logo-2.png" alt="Logo" width={100} height={50} />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-3 p-2 bg-blue-900 text-white rounded-md">
            <HiOutlineHome size={20} /> Dashboard
          </Link>
          <Link href="/projects" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <FaProjectDiagram size={20} /> Projects
          </Link>
          <Link href="/users" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <FaUsers size={20} /> Users
          </Link>
          <Link href="/mentors" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <FaUserTie size={20} /> Sqwad Mentors
          </Link>
          <Link href="/admin" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
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