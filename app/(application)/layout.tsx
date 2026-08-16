"use client"
import React, { useEffect } from 'react';
import Sidebar from './components/sidebar';
import { instance } from '../../src/api/instance';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { cookieStorage } from '@ibnlanre/portal';
import { userWrapper } from '../../src/store';
import TopNav from './components/topNav';
import Preloader from '../components/preloader';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const setUser = userWrapper((state) => state.setUser);
  const router = useRouter();

  const { data: response, isPending: userInfoIsLoading, isError } = useQuery({
    queryFn: () => instance.get('/user'),
    queryKey: ['user'],
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
        <Sidebar />
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
