"use client"
import { NumberInput, Select, TextInput } from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import { useRouter } from 'next/navigation'
import { FiBriefcase } from "react-icons/fi";
import { BsBuilding, BsLinkedin } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import * as Yup from 'yup'
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import toast from "react-hot-toast";

const MentorProfessionalInfoPage = () => {
  const router = useRouter();

  const validator = Yup.object({
    company: Yup.string().required('Company/School is required'),
    title: Yup.string().required('Your title is required'),
    years_of_experience: Yup.number().min(0, 'Years of experience must be a positive number').required('Years of experience is required'),
    linkedln_url: Yup.string().url('Invalid URL format').optional(),
  }) 

  const professionalInfoForm = useForm({
    initialValues: {
      company: '',
      title: '',
      years_of_experience:'', 
      linkedln_url: ''
    },
    validate: yupResolver(validator)
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (data: any) => instance.patch('/mentors', data),
    mutationKey: ['mentor', 'editProfessionalInfo'],
    onSuccess(data, variables, context) {
        toast.success('Professional information updated successfully');
        router.push('/mentor_availability');
    },
    onError(error:any, variables, context) {
        toast.error(error?.response?.data?.message || 'Failed to update professional information');
    },
  })

  const handleSubmit = (values: any) => {
    mutate(values)
  };



  return (
    <div className="max-w-[500px] lg:mx-auto lg:py-10 w-full ">
      <div className="bg-white p-8 rounded-3xl shadow-sm w-full">
        {/* Header */}
        <h1 className="lg:text-3xl text-2xl text-center text-[#0046FF] font-semibold mb-8">
          Almost there! Tell us more<br />about yourself?
        </h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={professionalInfoForm.onSubmit(handleSubmit)}>
          {/* Company/School and Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[#16181B] font-medium mb-2">Company/School</label>
              <TextInput
                // leftSection={<BsBuilding className="text-gray-400" />}
                placeholder="e.g, Chipper Cash, Unilag"
                {...professionalInfoForm.getInputProps('company')}
              />
            </div>
            <div>
              <label className="block text-sm text-[#16181B] font-medium mb-2">Your title</label>
              <TextInput
                // leftSection={<FiBriefcase className="text-gray-400" />}
                placeholder="Product Designer, Student"
                {...professionalInfoForm.getInputProps('title')}
              />
            </div>
          </div>

          {/* Company/School Details */}
          {/* <div>
            <label className="block text-sm text-[#16181B] font-medium mb-2">Company/School</label>
            <TextInput
            
              placeholder="E.g Chippercash, Unilag"
              {...professionalInfoForm.getInputProps('companyDetails')}
            />
          </div> */}

          {/* Years of Professional Experience */}
          <div>
            <label className="block text-sm text-[#16181B] font-medium mb-2">Years of Professional Experience</label>
            <div className="">
              <NumberInput
                  hideControls
                  placeholder="Enter years of experience"
                  {...professionalInfoForm.getInputProps('years_of_experience')}
              />
            </div>
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="block text-sm text-[#16181B] font-medium mb-2">LinkedIn URL</label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center px-3 rounded-l-md border border-r-0 border-gray-300">
                <BsLinkedin className="text-gray-500" />
              </div>
              <TextInput
                className="flex-1"
                placeholder="linkedin.com/in/"
                {...professionalInfoForm.getInputProps('linkedln_url')}
                styles={{
                  input: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }
                }}
              />
            </div>
          </div>

        
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-[#001D69] text-white rounded-md hover:bg-[#001950] transition mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Submitting...' : 'Continue'}
            </button>
       
         
        </form>
      </div>
    </div>
  );
};

export default MentorProfessionalInfoPage;
