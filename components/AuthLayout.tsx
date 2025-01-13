import Image from 'next/image';
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white" style={{backgroundImage: 'url("/images/signup_bg.png")'}}>
    {/* Logo */}
    <div className="absolute top-4 left-4">
      <Image
        src="/images/signup_1.png"
        alt="Sqwads Logo"
        width={50}
        height={50}
      />
    </div>

    {/* Close Icon */}
    <div className="absolute top-4 right-4">
      <button className="text-gray-500 hover:text-gray-700 text-lg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

      </button>
    </div>

    {/* Content */}
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>

    {/* Footer */}
    <div className="absolute bottom-4 text-center w-full text-xs text-gray-400">
      Sqwads · Terms · Privacy · Copyright © 2024 | Sqwads
    </div>
  </div>
  );
};

export default AuthLayout;
