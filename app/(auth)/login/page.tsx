"use client"
import { PasswordInput, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import Link from 'next/link';
import { MdOutlineEmail } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';
import { Registervalidator } from '@/src/validators/auth_validators';

const LoginPage = () => {
  // Mantine useForm hook
  const form = useForm({
    initialValues: {
      email: '',
      confirm_password: '',
    },
    validate: yupResolver(Registervalidator)
  });

  const handleSubmit = (values:any) => {
    console.log('Form submitted:', values);
  };

  return (
    <>
      <div className="bg-white mt-28 p-8 rounded-xl shadow-lg">
        {/* Title */}
        <h1 className="text-3xl text-center text-[#001D69] mb-3 font-medium">
          Welcome Back, Sqwad Hero!
        </h1>
        <p className="text-sm text-center text-gray-700 mb-6">
          Sign up for free and start writing your Sqwads adventure!
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

          {/* Confirm Password */}
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#001D69] text-white rounded transition hover:bg-[#003399]"
          >
            Login
          </button>
        </form>

        {/* Terms and Links */}
        <p className="text-xs text-center text-gray-500 mt-4">
          By creating an account, you agree to the{' '}
          <a href="#" className="underline">
            Terms of Service
          </a>
          .
        </p>
        <div className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-900 font-bold underline">
            Signup
          </Link>
        </div>

        <p className="text-center mt-2 text-sm text-blue-700 underline cursor-pointer">
          Forgot Password?
        </p>
      </div>
    </>
  );
};

export default LoginPage;
