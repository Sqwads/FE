'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaProjectDiagram } from 'react-icons/fa';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BsDatabase } from 'react-icons/bs';

const Sidebar = ({
  onSelectTab
}: {
  onSelectTab?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link onClick={onSelectTab} href="/dashboard" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-100 rounded-md">
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
          © 2024 Sqwads
        </div>

      </div>
    </>
  );
};

export default Sidebar;
