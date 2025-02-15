"use client"
import React from 'react';
import AdminSidebar from './components/sidebar';
import TopNav from './components/topNav';
import { useRouter } from 'next/navigation';
import { instance } from '@/src/api/instance';
import { cookieStorage } from '@ibnlanre/portal';
import { useQuery } from '@tanstack/react-query';

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
    <div className="flex flex-col min-h-screen">
      {/* TopNav */}
      <TopNav />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-200 ml-64">
          {children}
        </div>
      </div>
    </div>
  );
}