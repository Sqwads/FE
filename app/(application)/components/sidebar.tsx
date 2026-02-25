'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { IoMdPeople } from "react-icons/io";
import { FaProjectDiagram } from 'react-icons/fa';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BsDatabase } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { userWrapper } from '@/store';
import { IoBagRemove } from 'react-icons/io5';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { Collapse } from '@mantine/core';

const Sidebar = ({
  onSelectTab
}: {
  onSelectTab?: () => void;
}) => {


  const pathname = usePathname();
  const { user } = userWrapper((state: any) => ({
    user: state.user,
  }));
  const [mentorsOpen, setMentorsOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)

  const trimText = (email: string) => {
    if (!email) return null;
    const [localPart, domain] = email?.split('@');
    return localPart.length > 5 ? `${localPart.slice(0, 5)}...@${domain}` : email;
  };

  const activeClasses = 'bg-[#001D69] text-white font-medium';
  const inactiveClasses = 'text-gray-700 hover:bg-blue-100 rounded-md';

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
            className={`flex items-center gap-x-3 px-4 py-3  rounded-md 
                ${['/dashboard'].includes(pathname) ? activeClasses : inactiveClasses}`}
          >
            <HiOutlineHome size={20} /> Home
          </Link>
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setProjectsOpen((open) => !open)}
              className={`flex items-center justify-between px-4 py-3 rounded-md w-full text-left ${(pathname?.startsWith('/user-projects') || pathname?.startsWith('/explore-projects')) ? activeClasses : inactiveClasses
                }`}
            >
              <div className="flex items-center gap-3">
                <FaProjectDiagram size={20} /> Projects
              </div>
              {projectsOpen ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
            </button>
            <Collapse in={projectsOpen}>
              <div className="pl-7 pt-2 flex flex-col gap-2">
                <Link href={'/user-projects'} onClick={onSelectTab} className={`py-2 cursor-pointer text-sm text-gray-700 px-3 rounded-md ${pathname === '/user-projects' ? 'bg-blue-100 font-medium' : 'hover:bg-blue-100'}`}>My projects</Link>
                <Link href={'/explore-projects'} onClick={onSelectTab} className={`py-2 cursor-pointer px-3 text-sm text-gray-700 rounded-md  ${pathname === '/explore-projects' ? 'bg-blue-100 font-medium' : 'hover:bg-blue-100'}`}>Explore projects</Link>
              </div>
            </Collapse>
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setMentorsOpen((open) => !open)}
              className={`flex items-center justify-between px-4 py-3 rounded-md w-full text-left ${pathname?.startsWith('/mentors') ? activeClasses : inactiveClasses
                }`}
            >
              <div className="flex items-center gap-3">
                <IoMdPeople size={20} /> Sqwad Mentors
              </div>
              {mentorsOpen ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
            </button>
            <Collapse in={mentorsOpen}>
              <div className="pl-7 pt-2 flex flex-col gap-2">
                <Link href={'/mentors'} className={`py-2 cursor-pointer text-sm px-3 rounded-md ${pathname == '/mentors' && 'bg-blue-100'}`}>My Sessions </Link>
                <Link href={'/mentors_explore'} className={`py-2 cursor-pointer px-3 text-sm rounded-md  ${pathname == '/mentors_explore' && 'bg-blue-100'}`}>Explore Mentor</Link>
              </div>
            </Collapse>
          </div>
          <Link
            onClick={onSelectTab}
            href="/portfolio"
            className={`flex items-center gap-3 px-4 py-3 text-gray-700  rounded-md
              ${pathname?.startsWith('/portfolio') ? activeClasses : inactiveClasses}`}
          >
            <IoBagRemove /> Portfolio
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 text-center">
          <div className="flex items-center gap-3 p-4 rounded-lg">
            {user?.profileImage ?
              <img src={user?.profileImage} className="w-10 h-10 rounded-full border object-cover" alt="" />
              :
              <div className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white font-bold rounded-full">
                {user?.firstName?.[0]}
              </div>}
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

