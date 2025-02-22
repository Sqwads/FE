"use client"
import React, { useEffect } from 'react';
import AdminSidebar from './components/sidebar';
import TopNav from './components/topNav';
import { useRouter } from 'next/navigation';
import { instance } from '@/src/api/instance';
import { cookieStorage } from '@ibnlanre/portal';
import { useQuery } from '@tanstack/react-query';
import '@mantine/core/styles.css';
import { userWrapper } from '@/src/store';
import { LoadingOverlay } from '@mantine/core';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const {user, setUser} = userWrapper((state)=>({
    setUser: state.setUser,
    user: state.user
  }))
  console.log(user?.firstName)
  const { data: response, isPending: userInfoIsLoading } = useQuery({
    queryFn: () => instance.get('/user/admin'),
    queryKey: ['admin'],
    // enabled: !!user,
  });

  useEffect(()=>{
      setUser(response?.data)
  }, [response?.data])

  if (!response && !userInfoIsLoading) {
    cookieStorage.clear();
    router.push('/');
    return null;
  }

  return (
    <div className="flex h-screen">
      <LoadingOverlay visible={userInfoIsLoading} zIndex={1000} overlayProps={{ radius: "xl", blur: 1 }} />
      {/* Main Content Area */}
      <div className="w-64 hidden md:block">
           <AdminSidebar />
      </div>

       
      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-scroll  bg-[#fdfdfd] ">
        <TopNav />
        <div>
            {children}
        </div>
      </div>
     
    </div>
  );
}