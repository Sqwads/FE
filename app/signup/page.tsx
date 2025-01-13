// app/signup/page.js

import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

const Signup = () => {
  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl text-center text-[#001D69] mb-2">
          Your Sqwad, Your Story
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
              Sign up for free and start writing your Sqwads adventure!  
         </p>

        {/* Form */}
        <form className="space-y-6">
  <div className="flex space-x-4">
    {/* First Name */}
    <div className="flex-1">
      <label htmlFor="firstName" className="block text-sm text-gray-700 mb-1">
        First Name
      </label>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
        <input
          type="text"
          id="firstName"
          placeholder="e.g. Yusuf"
          className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>

    {/* Last Name */}
    <div className="flex-1">
      <label htmlFor="lastName" className="block text-sm text-gray-700 mb-1">
        Last Name
      </label>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
        <input
          type="text"
          id="lastName"
          placeholder="e.g. Bashar"
          className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  </div>

  <div className="flex space-x-4">
    {/* Username */}
    <div className="flex-1">
      <label htmlFor="username" className="block text-sm text-gray-700 mb-1">
        Username
      </label>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <input
          type="text"
          id="username"
          placeholder="e.g. yusfbash"
          className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>

    {/* Email Address */}
    <div className="flex-1">
      <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
        Email Address
      </label>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
        <input
          type="email"
          id="email"
          placeholder="e.g. yusufbashar@gmail.com"
          className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  </div>
   <div className="relative">
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
              <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>

              <input
                type="text"
                id="name"
                placeholder="*******"
                className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

         <div className="relative">
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
              <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>

              <input
                type="text"
                id="name"
                placeholder="*******"
                className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
 {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Signup
          </button>
</form>


       
        {/* Terms and Links */}
        <p className="text-xs text-center text-gray-500 mt-4">
          By creating an account, you agree to the{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>
          .
        </p>
        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-900 font-bold underline">
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
