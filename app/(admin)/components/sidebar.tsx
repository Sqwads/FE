'use client';

import { usePathname } from 'next/navigation';
import { FaProjectDiagram, FaUsers, FaUserTie, FaBriefcase } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import { userWrapper } from '@/src/store';
// import { userWrapper } from '@/src/store';

const AdminSidebar = () => {
 
  const pathname = usePathname(); // Get current route
  const { user } = userWrapper((state) => ({
    user: state.user,
  }));

  console.log(user)
  // Function to check if the link is active
  const isActive = (path: string): boolean => pathname === path;

  return (
    <>
    
      {/* Sidebar */}
      <div
        className={` bg-[#EBF1FF] h-full  p-5 flex flex-col`} 
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-14">
          <Image src="/images/sqwads-logo-2.png" alt="Logo" width={100} height={50} />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link 
            href="/admin_dashboard" 
            className={`flex items-center gap-3 px-2 py-3 rounded-md ${
              isActive('/admin_dashboard') ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-blue-100'
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
            {user?.firstName && user?.firstName[0]}
          </div>
          <div>
            <h2 className="font-bold text-sm text-[#001D69]">{user?.firstName} {user?.astName}</h2>
            <p className="text-xs text-[#16181BB2]">{user?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
