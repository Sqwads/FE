'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaProjectDiagram } from 'react-icons/fa';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BsDatabase } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { userWrapper } from '@/store';

const Sidebar = ({
  onSelectTab
}: {
  onSelectTab?: () => void;
}) => {
  

  const pathname = usePathname();
  const {user} = userWrapper((state: any) => ({
    user: state.user,
  }));

  const trimText = (email: string) => {
    if(!email) return null;
    const [localPart, domain] = email?.split('@');
    return localPart.length > 5 ? `${localPart.slice(0, 5)}...@${domain}` : email;
  };

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
              onClick={onSelectTab} 
              href="/dashboard" 
              className={`flex items-center gap-x-3 px-4 py-3  rounded-md ${['/dashboard'].includes(pathname) ? 'bg-[#001D69] text-white font-medium': 'text-gray-700'}`}
          >
            <HiOutlineHome size={20} /> Home
          </Link>
          <Link onClick={onSelectTab} href="/projects" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <FaProjectDiagram size={20} /> Projects
          </Link>
          <Link onClick={onSelectTab} href="/board" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <HiOutlineClipboardList size={20} /> Board
          </Link>
          <Link onClick={onSelectTab} href="/database" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
            <BsDatabase size={20} /> Database
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 text-center">
        <div className="flex items-center gap-3 p-4 rounded-lg">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white font-bold rounded-full">
            {user?.firstName?.[0]}
          </div>
          <div>
            <h2 className="font-bold text-sm text-[#001D69]">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-xs text-[#16181BB2]">{trimText(user?.email)}</p>
          </div>
        </div>
          © 2024 Sqwads
        </div>

      </div>
    </>
  );
};

export default Sidebar;
