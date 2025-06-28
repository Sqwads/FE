'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { userWrapper } from '@/store';
import { 
  FiHome, 
  FiCalendar, 
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiGrid
} from 'react-icons/fi';
import { BsChatDots } from 'react-icons/bs';

const Sidebar = ({
  onSelectTab
}: {
  onSelectTab?: () => void;
}) => {
  const pathname = usePathname();
  const { user } = userWrapper((state: any) => ({
    user: state.user,
  }));

  // State for dropdown menus
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [chatsOpen, setChatsOpen] = useState(false);

  const trimText = (email: string) => {
    if(!email) return null;
    const [localPart, domain] = email?.split('@');
    return localPart.length > 5 ? `${localPart.slice(0, 5)}...@${domain}` : email;
  };

  // Navigation item styling
  const navItemClasses = "flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors";
  const activeClasses = "bg-blue-900 text-white";
  const inactiveClasses = "text-blue-900 hover:bg-blue-100";

  return (
    <div className="bg-[#F5F3FF] h-full flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="text-blue-900 font-bold text-xl">
            <Image src="/images/sqwads-logo-2.png" alt="SQWADS" width={100} height={30} />
          </div>
        </div>
        <button className="text-blue-900 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {/* Home */}
          <li>
            <Link 
              href="/dashboard" 
              onClick={onSelectTab}
              className={`${navItemClasses} ${pathname === '/dashboard' ? activeClasses : inactiveClasses}`}
            >
              <div className="flex items-center">
                <FiHome className="mr-3" size={20} />
                <span>Home</span>
              </div>
            </Link>
          </li>

          {/* Sessions with dropdown */}
          <li>
            <button 
              onClick={() => setSessionsOpen(!sessionsOpen)}
              className={`${navItemClasses} ${pathname.includes('/sessionfeed') ? activeClasses : inactiveClasses}`}
            >
              <div className="flex items-center">
                <FiCalendar className="mr-3" size={20} />
                <span>Sessions</span>
              </div>
              {sessionsOpen ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
            </button>
            {sessionsOpen && (
              <ul className="pl-10 mt-1 space-y-1">
                <li>

                    <Link href="/sessionfeed?tabs=upcoming" 
                    onClick={onSelectTab}
                    className={`block py-2 px-3 rounded-md ${pathname === '/sessionfeed/tabs/upcoming' ? 'text-blue-900 font-medium' : 'text-blue-800'} hover:bg-blue-100`}
                  >
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link href="/sessionfeed?tabs=pending" 
                    onClick={onSelectTab}
                    className={`block py-2 px-3 rounded-md ${pathname === '/sessionfeed/tabs/pending' ? 'text-blue-900 font-medium' : 'text-blue-800'} hover:bg-blue-100`}
                  >
                    Pending
                  </Link>
                </li>
                <li>
                  
                    <Link href="/sessionfeed?tabs=complete"
                    onClick={onSelectTab}
                    className={`block py-2 px-3 rounded-md ${pathname === '/sessionfeed/tabs/history' ? 'text-blue-900 font-medium' : 'text-blue-800'} hover:bg-blue-100`}
                  >
                    History
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Projects */}
          <li>
            <Link 
              href="/projects" 
              onClick={onSelectTab}
              className={`${navItemClasses} ${pathname.includes('/projects') ? activeClasses : inactiveClasses}`}
            >
              <div className="flex items-center">
                <FiGrid className="mr-3" size={20} />
                <span>Projects</span>
              </div>
            </Link>
          </li>

          {/* Chats with dropdown */}
          <li>
            <button 
              onClick={() => setChatsOpen(!chatsOpen)}
              className={`${navItemClasses} ${pathname.includes('/chats') ? activeClasses : inactiveClasses}`}
            >
              <div className="flex items-center">
                <BsChatDots className="mr-3" size={20} />
                <span>Chats</span>
              </div>
              {chatsOpen ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
            </button>
            {chatsOpen && (
              <ul className="pl-10 mt-1 space-y-1">
                <li>
                  <Link 
                    href="/chats/mentees" 
                    onClick={onSelectTab}
                    className={`block py-2 px-3 rounded-md ${pathname === '/chats/mentees' ? 'text-blue-900 font-medium' : 'text-blue-800'} hover:bg-blue-100`}
                  >
                    Mentees
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/chats/groups" 
                    onClick={onSelectTab}
                    className={`block py-2 px-3 rounded-md ${pathname === '/chats/groups' ? 'text-blue-900 font-medium' : 'text-blue-800'} hover:bg-blue-100`}
                  >
                    Groups
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Settings */}
          <li>
            <Link 
              href="/settings" 
              onClick={onSelectTab}
              className={`${navItemClasses} ${pathname.includes('/settings') ? activeClasses : inactiveClasses}`}
            >
              <div className="flex items-center">
                <FiSettings className="mr-3" size={20} />
                <span>Settings</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-100">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-medium">
            {user?.firstName?.[0] || 'Y'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-900">
              {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Yusuf Olowode'}
            </p>
            <p className="text-xs text-blue-700">
              {user?.email ? trimText(user.email) : 'yusufolo@gmail.com'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
