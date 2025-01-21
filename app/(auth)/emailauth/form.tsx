"use client"
import { PinInput } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {  useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { instance } from "@/src/api/instance";
import { base64decode } from "nodejs-base64";

const EmailAuthForm = () => {

  const [otp, setOtp] = useState('')
  const searchParams = useSearchParams();
  const router = useRouter()

  const email = searchParams.get("email")
  // if(!email) return router.push('/signup')


  const {mutate: verifyEmail, isPending} = useMutation({
    mutationFn: (data:any)=>instance.post('/auth/verify-email', data),
    mutationKey: ['auth', 'verfiyMail'],
    onSuccess( response  ) {
      console.log(response)
       toast.success("Verification Succesful")
       localStorage.setItem('access_token', response.data?.data?.token)
       router.push(`/onboarding`)
    },
    onError(error:any) {
      console.log(error?.response.data)
      toast.error(error?.response?.data?.message || 'Action Failed')
      // toast.error('Failed to create category')
    },
  })

  const handleSubmit = ()=>{
    if (otp == "") return;
    const values = { otp, email: base64decode(email as string) };
    console.log(values);
    verifyEmail(values);
  }

  return (
    <>
      <div className="flex  justify-center mt-14">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/email.png"
              alt="email_icon"
              width={70}
              height={35}
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
              {base64decode(email as string)}
            </span>
            .{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Incorrect?
            </a>
          </p>

          {/* Code Input */}
          <div className="flex  justify-center space-x-4 mb-6">
            <PinInput
              length={6}
              placeholder=" "
              onChange={(value) => setOtp(value)}
            />

          
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className={`px-10 py-3 bg-[#001D69] text-white rounded mb-5  transition ${isPending && 'opacity-50'}`}
          >
            {isPending? 'Submitting...':'Submit'}
          </button>

          {/* Resend Code and Timer */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <button className="text-blue-500 hover:underline">Resend Code</button>
            <span>|</span>
            <span>00:30</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailAuthForm;
