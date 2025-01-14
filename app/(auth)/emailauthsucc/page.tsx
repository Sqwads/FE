"use client";
import AuthLayout from "@/components/AuthLayout";
import Image from "next/image";
import React, { useState } from "react";

const EmailAuthSuccess = () => {
  // State to track if the code is successfully validated
  const [isSuccess, setIsSuccess] = useState(true);

  const handleCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length === 4) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/email.png"
              alt="email_icon"
              width={100}
              height={50}
              className="mx-auto"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Verify your email address
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
                  className={`w-12 h-12 text-xl text-center border rounded-md focus:outline-none ${
                    isSuccess
                      ? "border-green-500 ring-1 ring-green-500"
                      : "border-gray-300 focus:ring focus:ring-blue-300"
                  }`}
                  onChange={handleCodeInput} // Handle input change
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
    </AuthLayout>
  );
};

export default EmailAuthSuccess;
