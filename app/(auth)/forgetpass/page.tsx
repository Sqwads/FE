"use client"
import { TextInput } from '@mantine/core';
import { MdOutlineEmail } from 'react-icons/md';
import { useForm, yupResolver } from '@mantine/form';
import Image from 'next/image';
import { Registervalidator } from '@/src/validators/validators';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { instance } from '@/api/instance';
import { useRouter, useSearchParams } from 'next/navigation';
import { base64encode } from 'nodejs-base64';
import * as yup from 'yup';

const ForgetPasswordPage = () => {
  // Mantine useForm hook

  const searchParams = useSearchParams();
  const user_type = searchParams.get('user_type');
  const router = useRouter()

  const validator = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
  });

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: yupResolver(validator)
  });

  const { mutate: sendOTP, isPending } = useMutation({
      mutationFn: (data: any) => instance.post(user_type=='user'?"/auth/resend-otp":"/mentors/resend-otp", data),
      mutationKey: ["auth", "sendOtp"],
      onSuccess(response, vars) {
        toast.success("An OTP has been sent to your email. Check your inbox or spam folder.");
        router.push(`/createnew?type=${user_type}&email=${base64encode(vars.email)}`);
      },
      onError(error: any) {
        // console.error(error?.response?.data);
        toast.error(error?.response?.data?.message || "Failed to send Token");
      },
  });

  const handleSubmit = (values: any) => {
    sendOTP({ email: values.email });
  };

  return (
    <>
      <div className="bg-white lg:mt-28 p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
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
            disabled={isPending}
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed py-3 bg-[#001D69] text-white rounded transition hover:bg-[#003399]"
          >
            {isPending ? 'Submitting...' : 'Submit'}
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
