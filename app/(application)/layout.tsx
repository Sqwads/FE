"use client"
import React from 'react';
import Sidebar from './components/sidebar';
import { instance } from '@/src/api/instance';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { cookieStorage } from '@ibnlanre/portal';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const router = useRouter()
    const {data:response, isPending: userInfoIsLoading} = useQuery({
      queryFn: ()=>instance.get('/user'),
      queryKey: ['user'],
    });

    if(!response && !userInfoIsLoading ){
      cookieStorage.clear()
      router.push('/')
      return
    }

    return(
        <div className="flex" >
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-100">
              {children}
            </div>
    </div>
    )
}