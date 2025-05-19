'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FaProjectDiagram, FaUsers, FaUserTie, FaBriefcase } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import Link from 'next/link'; 
import type { Route } from 'next'; 
import Image from 'next/image';
import { userWrapper } from '@/src/store';
import { cookieStorage } from '@ibnlanre/portal';

const AdminSidebar = ({
  onSelectTab
}: {
  onSelectTab?: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = userWrapper((state) => ({
    user: state.user,
  }));

  const logout = () => {
    cookieStorage.clear();
    localStorage.clear();
    router.push('/admin_login');
  };

  const isActive = (path: string): boolean => pathname === path;

  const navItems: { href: Route; icon: any; label: string }[] = [
    { href: '/admin_dashboard', icon: <HiOutlineHome size={20} />, label: 'Dashboard' },
    { href: '/projects', icon: <FaProjectDiagram size={20} />, label: 'Projects' },
    { href: '/users', icon: <FaUsers size={20} />, label: 'Users' },
    { href: '/mentorship', icon: <FaUserTie size={20} />, label: 'Sqwad Mentors' },
    { href: '/admin', icon: <FaBriefcase size={20} />, label: 'Admin Control' },
  ];

  return (
    <div className="bg-[#EBF1FF] h-full p-5 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-14">
        <Image 
          src="/images/sqwads-logo-2.png" 
          alt="Logo" 
          width={100} 
          height={50} 
          priority
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            onClick={onSelectTab}
            href={item.href}
            className={`flex items-center gap-3 p-2 rounded-md ${
              pathname.startsWith(item.href) 
                ? 'bg-blue-900 text-white' 
                : 'text-gray-700 hover:bg-blue-100'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 p-4 rounded-lg">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white font-bold rounded-full">
            {user?.firstName?.[0]}
          </div>
          <div>
            <h2 className="font-bold text-sm text-[#001D69]">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-xs text-[#16181BB2]">{user?.email}</p>
          </div>
        </div>

        <button 
          onClick={logout} 
          className="w-full text-red-500 cursor-pointer text-center font-semibold py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;