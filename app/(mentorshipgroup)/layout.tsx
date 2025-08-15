"use client"
import React, { useEffect } from 'react';
import Sidebar from './components/sidebar';
import { instance } from '../../src/api/instance';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { cookieStorage } from '@ibnlanre/portal';
import { LoadingOverlay } from '@mantine/core';
import '@mantine/core/styles.css';

import { userWrapper } from '../../src/store';
import TopNav from './components/topNav';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const {user, setUser} = userWrapper((state)=>({
      setUser: state.setUser,
      user: state.user
    }))

    const router = useRouter()
    const {data:response, isPending: userInfoIsLoading} = useQuery({
      queryFn: ()=>instance.get('/mentors/me'),
      queryKey: ['mentor-profile'],
    });

   

    useEffect(()=>{
          setUser(response?.data?.data)
    }, [response?.data])
    

    if(!response && !userInfoIsLoading ){
    //   cookieStorage.clear()
    //   router.push('/')
    //   return
    }

    return(
       <div className="flex h-screen ">
             <LoadingOverlay visible={false} zIndex={1000} overlayProps={{ radius: "xl", blur: 1 }} />
             {/* Main Content Area */}
             <div className="w-64 hidden md:block">
                  <Sidebar />
             </div>
       
              
             {/* Main Content */}
             <div  className="flex-1 h-screen overflow-y-scroll   ">
               <TopNav />
               <div  className='  '>
                   {children}
               </div>
             </div>
            
        </div>
    )
}