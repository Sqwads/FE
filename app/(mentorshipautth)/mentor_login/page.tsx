"use client"
import { PasswordInput, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import Link from 'next/link';
import { cookieStorage } from "@ibnlanre/portal";
import { MdOutlineEmail } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';
import { LoginVlidator } from '@/src/validators/validators';
import { useMutation } from '@tanstack/react-query';
import { instance } from '@/src/api/instance';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { base64encode } from 'nodejs-base64';

const MentorLoginPage = () => {

  const router = useRouter()
  // Mantine useForm hook
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(LoginVlidator)
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => instance.post('/auth/login', data),
    mutationKey: ['auth', 'login'],
    onSuccess(response) {
      console.log(response.data)
      if (response.data?.data?.role !== 'USER') {
        return toast.error('Access Denied !!!')
      }
      cookieStorage.setItem('access_token', response.data?.data?.access_token)
      if (response.data?.data?.isProfileComplete) {
        toast.success('Authentication succesfull')
        router.push('/dashboard')
      } else {

        router.push('/onboarding')
      }
    },
    onError(error: any, vars) {
      console.log(error?.response.data)
      if (error?.response?.data?.statusCode == 403) {
        toast.error('Account not verified!')
        router.push(`/emailauth?email=${base64encode(vars?.email)}`)

        return
      }
      toast.error(error?.response?.data?.message || 'Action Failed')

    },
  })

  const handleSubmit = (values: any) => {
    mutate(values)
  };

  return (
    <>
      <div className="bg-white md:mt-16 mt-5 max-w-[450px] py-8 px-7 rounded-xl shadow-lg">
        {/* Title */}
        <h1 className="text-3xl text-center text-[#001D69] mb-3 font-semibold">
          Welcome Back, Sqwad Mentor!
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
              size='md'
              placeholder="e.g. user@example.com"
              {...form.getInputProps('email')}
            />
          </div>

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
              size='md'
              placeholder="************"
              {...form.getInputProps('password')}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full py-3 bg-[#001D69] text-white rounded transition hover:bg-[#003399] ${isPending && 'opacity-50'}`}
          >
            {isPending ? 'Authenticating...' : 'Login'}
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

export default MentorLoginPage;
