import Image from 'next/image';
import React from 'react';

const UpdatePasswrod = () => {


  return (
    <>
      <div className="flex items-center justify-center mt-28">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/images/lock.png"
                    alt="email_icon"
                    width={100}
                    height={50}
                    className="mx-auto"
                  />
                </div>
      
                {/* Title */}
                <h2 className="text-2xl font-medium text-[#001D69] mb-2">
                    Update your Password 
                 </h2>
                <p className="text-sm text-gray-600 mb-8">
                  We have emailed a four-digit code to{" "}
                  <span className="font-medium text-gray-800">
                    yusufyusuf@email.com
                  </span>
                  .{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Incorrect?
                  </a>
                </p>
      
                {/* Code Input */}
                <div className="flex justify-center space-x-4 mb-6">
                  {Array(4)
                    .fill("")
                    .map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    ))}
                </div>
      
                {/* Resend Code and Timer */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <button className="text-blue-500 hover:underline">Resend Code</button>
                  <span>|</span>
                  <span>00:30</span>
                </div>
              </div>
            </div>
    </>
  )
}

export default UpdatePasswrod;
