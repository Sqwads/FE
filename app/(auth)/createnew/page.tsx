"use client"
import { Registervalidator } from '../../../src/validators/validators';
import { PasswordInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import Image from 'next/image';
import { CiLock } from 'react-icons/ci';

const CreateNewPassword = () => {
  const form = useForm({
    initialValues: {
      confirm_password: '',
    },
    validate: yupResolver(Registervalidator)
  });

  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);
  };
  return (
    <>
      <div className="bg-white mt-28 p-8 rounded-xl shadow-lg">

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
          We have emailed a four-digit code to{" "}
          <span className="font-medium text-gray-800">
            yusufyusuf@email.com
          </span>
          .{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Incorrect?
          </a>
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm text-gray-700 mb-1"
            >
              Password
            </label>
            <PasswordInput
              leftSection={<CiLock />}
              placeholder="************"
              {...form.getInputProps('confirm_password')}
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

          {/* Update Password */}
          <button
            type="submit"
            className="w-full py-3 bg-[#001D69] text-white rounded transition hover:bg-[#003399]"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateNewPassword;
