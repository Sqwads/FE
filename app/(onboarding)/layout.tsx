"use client"
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/src/api/instance';
import { cookieStorage } from '@ibnlanre/portal';
import Preloader from '../components/preloader';

export default function OnBoardingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const { isPending: userInfoIsLoading, isError } = useQuery({
    queryFn: () => instance.get('/user'),
    queryKey: ['user'],
  });

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
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-5 md:px-10 px-3"
      style={{ backgroundImage: 'url("/images/signup_bg.png")' }}
    >
      {/* Top Section */}
      <div className="flex w-full md:mb-0 mb-7">
        <div className="flex-1">
          <Image
            src="/images/signup_1.png"
            alt="Sqwads Logo"
            width={50}
            height={50}
          />
        </div>

        {/* Close Icon */}
        <div className="">
          <button className="text-gray-500 hover:text-gray-700 text-lg">
            {/* Add close functionality if required */}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:w-[80%] mx-auto">
        {/* Dynamic Content */}
        <div className=" w-full">{children}</div>
      </div>

      {/* Footer */}
      <div className="text-center mt-5 w-full text-xs text-gray-400">
        Sqwads · Terms · Privacy · Copyright © 2024 | Sqwads
      </div>
    </div>
  );
}
