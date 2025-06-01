"use client"
import { Select, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation'
import { FiBriefcase } from "react-icons/fi";
import { BsBuilding, BsLinkedin } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import Link from "next/link";

const MentorProfessionalInfoPage = () => {
  const router = useRouter();

  const professionalInfoForm = useForm({
    initialValues: {
      company: '',
      title: '',
      companyDetails: '',
      experienceMonth: '',
      experienceYear: '',
      linkedinUrl: ''
    },
    validate: {
      company: (value) => value.trim().length === 0 ? 'Company/School is required' : null,
      title: (value) => value.trim().length === 0 ? 'Your title is required' : null,
    }
  });

  const handleSubmit = (values: any) => {
    // Here you would handle the form submission
    console.log('Form values:', values);
    
    // Navigate to next step
    // router.push('/next-step');
  };

  // Generate month options
  const monthOptions = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Generate year options (last 50 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm w-full">
        {/* Header */}
        <h1 className="text-3xl text-center text-[#0046FF] font-semibold mb-8">
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
          <div>
            <label className="block text-sm text-[#16181B] font-medium mb-2">Company/School</label>
            <TextInput
            //   leftSection={<BsBuilding className="text-gray-400" />}
              placeholder="E.g Chippercash, Unilag"
              {...professionalInfoForm.getInputProps('companyDetails')}
            />
          </div>

          {/* Years of Professional Experience */}
          <div>
            <label className="block text-sm text-[#16181B] font-medium mb-2">Years of Professional Experience</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                placeholder="Select Month"
                data={monthOptions}
                {...professionalInfoForm.getInputProps('experienceMonth')}
                leftSection={<MdOutlineWorkOutline className="text-gray-400" />}
              />
              <Select
                placeholder="Select Year"
                data={yearOptions}
                {...professionalInfoForm.getInputProps('experienceYear')}
                leftSection={<MdOutlineWorkOutline className="text-gray-400" />}
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
                {...professionalInfoForm.getInputProps('linkedinUrl')}
                styles={{
                  input: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }
                }}
              />
            </div>
          </div>

          {/* Continue Button */}
          <Link href='/mentor_availability'>
            <button
                        type="submit"
                        className="w-full py-3 bg-[#001D69] text-white rounded-md hover:bg-[#001950] transition mt-8"
                    >
                        Continue
                    </button>
          </Link>
         
        </form>
      </div>
    </div>
  );
};

export default MentorProfessionalInfoPage;
