"use client"
import { TextInput } from '@mantine/core';
import { MdOutlineEmail } from 'react-icons/md';
import { useForm, yupResolver } from '@mantine/form';
import Image from 'next/image';
import { Registervalidator } from '../../../src/validators/validators';

const ForgetPasswordPage = () => {
  // Mantine useForm hook
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: yupResolver(Registervalidator)
  });

  const handleSubmit = (values: any) => {
    console.log('Password reset link requested for:', values.email);
  };

  return (
    <>
      <div className="bg-white mt-28 p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className=" rounded-full">
            <Image
              src="/images/lock.png"
              alt='lockimage'
              width={100}
              height={50}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl text-center text-[#001D69] mb-3 font-medium">
          Forgot Password?
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          To reset your password, enter your email address below.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-700 mb-1"
            >
              Email Address
            </label>
            <TextInput
              leftSection={<MdOutlineEmail />}
              placeholder="e.g. user@example.com"
              {...form.getInputProps('email')}
            />
          </div>

          {/* Request Reset Link Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#001D69] text-white rounded transition hover:bg-[#003399]"
          >
            Request Reset Link
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Sqwads · Terms · Privacy · Copyright © 2024
        </p>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
