"use client"
import { PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { FiUpload, FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import * as Yup from 'yup';
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import toast from "react-hot-toast";
import { base64encode } from "nodejs-base64";

const MentorSignupPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<any>(null);
  const handleImageClick = () => {
      fileInputRef.current.click();
  };

  const validator = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    location: Yup.string().required('Location is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
  })

  const onboardingForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      location: '',
      password: ''
    },
    validate: yupResolver(validator)
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const {mutate, isPending} = useMutation({
      mutationFn: (data:any)=>instance.post(`/mentors/register`, data),
      mutationKey: ['mentor'],
      onSuccess(response, vars) {
          console.log(response.data)
          toast.success('Registration successful')
          // alert('what.........')
          router.push(`/mentor_email_auth?email=${base64encode(`${onboardingForm.values.email}`)}`)
      },
      onError(error:any) {
          toast.error(error?.response?.data?.message || 'Registration Failed')
          console.log(error?.response?.data)
      },
  })


  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    console.log('Selected file:', selectedFile);
    

    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('gender', values.gender)
    formData.append('location', values.location)
    formData.append('password', values.password);

    if(selectedFile){
      formData.append('file', selectedFile)
    }
    mutate(formData);
    // mutate(formData)
  };

  return (
    <div className="lg:max-w-3xl mx-aut lg:px-6 lg:py-6">
      <div className="bg-white px-8 py-8 rounded-3xl shadow-sm w-full">
        {/* Header */}
        <h1 className="lg:text-4xl text-3xl text-center text-[#001D69] font-semibold mb-2">
          Hey there! Let's hear your journey.
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Be the mentor you once needed. Let's begin with your story.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={onboardingForm.onSubmit(handleSubmit)}>
          {/* Profile Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Upload profile photo</label>
            <div className="flex flex-col">
              <div onClick={handleImageClick} className="w-24 cursor-pointer h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <FiUpload className="text-gray-400 text-xl" />
                )}
              </div>
              <label className="cursor-pointer">
                <div className="flex items-center text-[#001D69] font-medium">
                  <span>Select a file</span>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <p className="text-xs text-gray-500 mt-1">Maximum file size is 2mb</p>
              </label>
            </div>
            <div className="bg-blue-50 p-3 rounded-md mt-3 flex items-start">
              <div className="text-blue-600 mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-[#5483FF]">
                With a well visible picture, your mentorship request has a better chance of being approved promptly.
              </p>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <TextInput
                leftSection={<FiUser className="text-gray-400" />}
                placeholder="e.g, Yusuf"
                {...onboardingForm.getInputProps('firstName')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <TextInput
                leftSection={<FiUser className="text-gray-400" />}
                placeholder="e.g, Bashar"
                {...onboardingForm.getInputProps('lastName')}
              />
            </div>
          </div>

          {/* Email and password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <TextInput
                leftSection={<MdOutlineEmail className="text-gray-400" />}
                placeholder="e.g, yusufbashar@gmail.com"
                {...onboardingForm.getInputProps('email')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <PasswordInput
                // leftSection={<FaPhoneAlt className="text-gray-400" />}
                placeholder="Enter Password"
                {...onboardingForm.getInputProps('password')}
              />
            </div>
          </div>

          {/* Gender and phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">What gender do you identify as?</label>
              <Select
                placeholder="Select Gender"
                data={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'non-binary', label: 'Non-binary' },
                  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                ]}
                {...onboardingForm.getInputProps('gender')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <TextInput
                leftSection={<FaPhoneAlt className="text-gray-400" />}
                placeholder="+234 901 2345 678"
                {...onboardingForm.getInputProps('phoneNumber')}
              />
            </div>
          </div>
        

          <div>
            <label className="block text-sm font-medium mb-2">Where do you live?</label>
            <Select
              placeholder="E.g. Nigeria, South Africa"
              data={[
                { value: 'nigeria', label: 'Nigeria' },
                { value: 'south-africa', label: 'South Africa' },
                { value: 'ghana', label: 'Ghana' },
                { value: 'kenya', label: 'Kenya' },
                { value: 'other', label: 'Other' }
              ]}
              {...onboardingForm.getInputProps('location')}
            />
          </div>

         
            <button
                type="submit"
                disabled={isPending}
                className="w-full mt-8 py-3 bg-[#001D69] text-white rounded-md hover:bg-[#001950] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? 'Saving...' : 'Continue'}
            </button>
         
          

          {/* Terms and Login Link */}
          <div className="text-center text-xs text-gray-500 mt-4">
            By clicking on continue, you agree to the <Link href="#" className="text-[#001D69] underline">Terms of Service</Link>.
          </div>

          <div className="text-center text-sm mt-4">
            Already have an account? <Link href="/mentor_login" className="text-[#001D69] font-medium">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorSignupPage;
