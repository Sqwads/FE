import Image from 'next/image';
import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

const PasswordUpdatedPage = () => {
  return (
    <>
       <div className="flex flex-col mt-48 w-full p-10 items-center justify-center">
              {/* Card Container */}
              <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
                {/* Icon */}
                <div className="mb-6">
                  <Image
                    src="/images/success.png"
                    alt="success"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>
      
                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Password Updated! 
                </h1>
      
                {/* Subtitle */}
                <p className="text-sm text-gray-600 mb-6">
                    Your password has been successfully reset      
                </p>
      
                {/* Button */}
                <button className="flex items-center w-full mt-10 justify-center bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900">
                  Proceed to Login <FaLongArrowAltRight className="ml-2" />
                </button>
              </div>
            </div>
    </>
  );
}

export default PasswordUpdatedPage;
