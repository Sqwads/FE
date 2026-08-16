"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/src/api/instance';
import { cookieStorage } from '@ibnlanre/portal';
import Preloader from '../components/preloader';

export default function InterviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  // const { isPending: userInfoIsLoading, isError } = useQuery({
  //   queryFn: () => instance.get('/user'),
  //   queryKey: ['user'],
  // });

  // useEffect(() => {
  //   if (!userInfoIsLoading && isError) {
  //     cookieStorage.clear();
  //     router.push('/');
  //   }
  // }, [isError, userInfoIsLoading, router]);

  // if (userInfoIsLoading) {
  //   return <Preloader />;
  // }

  return <>{children}</>;
}
