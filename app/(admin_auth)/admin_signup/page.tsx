"use client"
import { PasswordInput, TextInput } from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import { useRouter } from 'next/navigation'
import { base64encode } from 'nodejs-base64'
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/src/api/instance";
import { Registervalidator } from "@/src/validators/validators";
import toast from "react-hot-toast";


const Signup = () => {

  const router = useRouter()
  const signUpForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
      username: ''
    },
    validate: yupResolver(Registervalidator)
  })

  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data: any) => instance.post('/auth/register', data),
    mutationKey: ['auth', 'register'],
    onSuccess(response, vars) {
      console.log(response)
      toast.success("Registration Succesful")
      router.push(`/admin_emailauth?email=${base64encode(vars.email)}`)
    },
    onError(error: any) {
      console.log(error?.response.data)
      toast.error(error?.response?.data?.message || 'Action Failed')
      // toast.error('Failed to create category')
    },
  })

  const handleSubmit = (values: any) => {
    signup({
      ...values,
      role: 'ADMIN'
    })
    console.log(values)
  }

  return (
    <>
      <div className="bg-white lg:mt-10 p-8 rounded-xl shadow-lg w-full h-fit max-w-md">
        {/* Title */}
        <h1 className="text-3xl text-center text-[#001D69] mb-3 font-medium">
          Register as an Admin
        </h1>
        <p className="text-sm text-center text-gray-700 mb-6">
          Sign up for free and start writing your Sqwads adventure!
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={signUpForm.onSubmit(handleSubmit)}>
          <div className="flex space-x-4">
            {/* First Name */}
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm text-gray-700 mb-1">
                First Name
              </label>
              <div className="relative">
                <TextInput
                  // size="lg"
                  leftSection={<FiUserPlus />}
                  key={signUpForm.key('firstName')}
                  {...signUpForm.getInputProps('firstName')}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm text-gray-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <TextInput
                  // size="lg"
                  leftSection={<FiUserPlus />}
                  className=""
                  key={signUpForm.key('lastName')}
                  {...signUpForm.getInputProps('lastName')}
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            {/* Username */}
            <div className="flex-1">
              <label htmlFor="username" className="block text-sm text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">

                <TextInput
                  // size="lg"
                  leftSection={<FiUserPlus />}
                  placeholder="e.g Hamid"
                  className=""
                  key={signUpForm.key('username')}
                  {...signUpForm.getInputProps('username')}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">

                <TextInput
                  // size="lg"
                  leftSection={<MdOutlineEmail />}
                  // placeholder="Email"
                  className=""
                  key={signUpForm.key('email')}
                  {...signUpForm.getInputProps('email')}
                />
              </div>
            </div>
          </div>

          <div className="">
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <PasswordInput
              leftSection={<CiLock />}
              type="password"
              // size="lg"
              placeholder="*****************"
              key={signUpForm.key('password')}
              {...signUpForm.getInputProps('password')}
            // className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />

          </div>

          <div className="relative">
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
              Confirm Password
            </label>
            <PasswordInput
              leftSection={<CiLock />}
              type="password"
              // size="lg"
              placeholder="*****************"
              key={signUpForm.key('confirm_password')}
              {...signUpForm.getInputProps('confirm_password')}
            // className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />

          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className={`w-full py-3 bg-[#001D69] text-white rounded  transition ${isPending && 'opacity-50'}`}
          >
            {isPending ? 'Submitting...' : 'Sign up'}
          </button>
        </form>



        {/* Terms and Links */}
        <p className="text-xs text-center text-gray-500 mt-4">
          By creating an account, you agree to the{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>
          .
        </p>
        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/admin_login" className="text-blue-900 font-bold underline">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
