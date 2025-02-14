"use client"
import React from 'react';
import AdminSidebar from './components/sidebar';
import TopNav from './components/topNav';
import { useRouter } from 'next/navigation';
import { instance } from '@/src/api/instance';
import { cookieStorage } from '@ibnlanre/portal';
import { useQuery } from '@tanstack/react-query';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const router = useRouter()
    const {data:response, isPending: userInfoIsLoading} = useQuery({
      queryFn: ()=>instance.get('/user/admin'),
      queryKey: ['admin', ],
    });

    if(!response && !userInfoIsLoading ){
      cookieStorage.clear()
      router.push('/')
      return
    }

    return(
        <div className="flex" >
           
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-100 ml-64">
                 <TopNav />
              {children}
            
            </div>
    </div>
    )
}
