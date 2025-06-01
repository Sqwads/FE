import Image from 'next/image';
import React from 'react';
import '@mantine/core/styles.css';
import '../globals.css';
import { AiOutlineClose } from 'react-icons/ai';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-5 md:px-10 px-3"
      style={{ backgroundImage: 'url("/images/signup_bg.png")' }}
    >
      <div className="flex w-full md:mb-0 mb-7  ">
        <div className="flex-1">
          <Image src="/images/signup_1.png" alt="Sqwads Logo" width={50} height={50} />
        </div>

        {/* Close Icon */}
        <div className="">
          <button className="text-gray-500 hover:text-gray-700 text-lg">
            <AiOutlineClose className="size-6" /> 
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-center h-fit ">
        {children}
        </div>

      {/* Footer */}
      <div className="text-center mt-5 w-full text-xs text-gray-400">
        Sqwads · Terms · Privacy · Copyright © 2024 | Sqwads
      </div>
    </div>
  );
}
