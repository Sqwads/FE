"use client";
import AuthLayout from "@/components/AuthLayout";
import Image from "next/image";
import React, { useState } from "react";

const EmailAuthFail = () => {
  // State to track if the code validation has failed
  const [isFail, setIsFail] = useState(true);

  const handleCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length === 4) {
      setIsFail(false); // Assuming the code is correct after 4 digits are entered
    } else {
      setIsFail(true); // Still invalid if less than 4 digits
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
          <div className="flex justify-center space-x-4 mb-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className={`w-12 h-12 text-xl text-center border rounded-md focus:outline-none ${
                    isFail
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300 focus:ring focus:ring-blue-300"
                  }`}
                  onChange={handleCodeInput} // Handle input change
                />
              ))}
          </div>

          {/* Error Message */}
          {isFail && (
            <p className="text-sm text-red-500 mb-6">
              The code you entered is incorrect. Please try again.
            </p>
          )}

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

export default EmailAuthFail;
