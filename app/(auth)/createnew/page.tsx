"use client"

import { instance } from '@/api/instance';
import { PasswordInput, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import toast from 'react-hot-toast';
import { CiLock } from 'react-icons/ci';
import * as yup from 'yup';

const CreateNewPassword = () => {

  
  const searchParams = useSearchParams();
  const user_type = searchParams.get('type');
  const email = searchParams.get('email');
  const router = useRouter()

   const validator = yup.object({
      password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
      confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
      otp: yup
        .string()
        .required('OTP is required')
      
  })

  const form = useForm({
    initialValues: {
      confirm_password: '',
      password:'',
      otp:''
    },
    validate: yupResolver(validator)
  });

  const { mutate, isPending } = useMutation({
      mutationFn: (data: any) => instance.post(user_type=='user'?"/auth/reset-password":"/mentors/reset-password", data),
      mutationKey: ["auth", "sendOtp"],
      onSuccess() {
        toast.success("Password updated successfully");
        router.push(user_type=='user'?'/login':'/mentor_login');
      },
      onError(error: any) {
        // console.error(error?.response?.data);
        toast.error(error?.response?.data?.message || "Failed to resend OTP");
      },
  });

  const handleSubmit = (values: any) => {
    mutate({
      email: atob(email as string),
      password: values.password,
      otp: values.otp
    })
  };
  return (
    <>
      <div className="bg-white w-full  max-w-md lg:mt-16 p-8 rounded-xl shadow-lg">

        <div className="mb-6  flex justify-center">
          <Image
            src="/images/lock.png"
            alt="email_icon"
            width={100}
            height={50}
            className="mx-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl text-center font-medium text-[#001D69] mb-2">
          Update your Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-8">
          We have emailed a 6-digit code to{" "}
          <span className="font-medium text-gray-800">
            {atob(email as string)}
          </span>
          {" "}
          
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-1"
            >
              Password
            </label>
            <PasswordInput
              leftSection={<CiLock />}
              placeholder="************"
              {...form.getInputProps('password')}
            />
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <PasswordInput
              leftSection={<CiLock />}
              placeholder="************"
              {...form.getInputProps('confirm_password')}
            />
          </div>

          <div>
            <label
              htmlFor="otp"
              className="block text-sm text-gray-700 mb-1"
            >
              Enter OTP
            </label>
            <TextInput       
              placeholder="123456"
              {...form.getInputProps('otp')}
            />
          </div>

          {/* Update Password */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full disabled:opacity-50 py-3 bg-[#001D69] text-white rounded transition hover:bg-[#003399]"
          >
            {isPending ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </>
  );
}

const CreateNewPage = ()=>{
 return(
  <Suspense>
    <CreateNewPassword />
  </Suspense>
 )
}

export default CreateNewPage;
