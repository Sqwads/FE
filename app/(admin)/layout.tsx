"use client"
import React, { useEffect } from 'react';
import AdminSidebar from './components/sidebar';
import TopNav from './components/topNav';
import { useRouter } from 'next/navigation';
import { instance } from '@/src/api/instance';
import { cookieStorage } from '@ibnlanre/portal';
import { useQuery } from '@tanstack/react-query';
import { userWrapper } from '@/src/store';
import Preloader from '../components/preloader';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const setUser = userWrapper((state) => state.setUser);

  const { data: response, isPending: userInfoIsLoading, isError } = useQuery({
    queryFn: () => instance.get('/user/admin'),
    queryKey: ['admin'],
  });

  useEffect(() => {
    setUser(response?.data);
  }, [response?.data, setUser]);

  useEffect(() => {
    if (!userInfoIsLoading && isError) {
      cookieStorage.clear();
      router.push('/');
    }
  }, [isError, userInfoIsLoading, router]);

  if (userInfoIsLoading) {
    return <Preloader />;
  }

  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="w-64 hidden md:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-scroll">
        <TopNav />
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
