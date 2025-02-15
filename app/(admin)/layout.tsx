"use client"
import React from 'react';
import AdminSidebar from './components/sidebar';
import TopNav from './components/topNav';
import { useRouter } from 'next/navigation';
import { instance } from '@/src/api/instance';
import { cookieStorage } from '@ibnlanre/portal';
import { useQuery } from '@tanstack/react-query';
import '@mantine/core/styles.css';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { data: response, isPending: userInfoIsLoading } = useQuery({
    queryFn: () => instance.get('/user/admin'),
    queryKey: ['admin'],
  });

  if (!response && !userInfoIsLoading) {
    cookieStorage.clear();
    router.push('/');
    return null;
  }

  return (
    <div className="flex h-screen">
  
      {/* Main Content Area */}
      <div className="w-64 hidden md:block">
           <AdminSidebar />
      </div>

       
      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-scroll  bg-[#F6F6F6] ">
        <TopNav />
        <div>
            {children}
        </div>
      </div>
     
    </div>
  );
}