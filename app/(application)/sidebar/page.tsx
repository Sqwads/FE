'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaProjectDiagram } from 'react-icons/fa';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BsDatabase } from 'react-icons/bs';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-screen" >
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-gray-700 bg-white shadow-lg rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 p-5 flex flex-col transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ backgroundImage: 'url("/images/signup_bg.png")' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Image src="/images/sqwads-logo-2.png" alt="Logo" width={100} height={50} />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <HiOutlineHome size={20} /> Home
          </Link>
          <Link href="/projects" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <FaProjectDiagram size={20} /> Projects
          </Link>
          <Link href="/board" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <HiOutlineClipboardList size={20} /> Board
          </Link>
          <Link href="/database" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <BsDatabase size={20} /> Database
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 text-center">
          © 2024 Sqwads
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
