"use client";
import { instance } from '@/src/api/instance';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaLongArrowAltRight } from 'react-icons/fa';

const OnboardingStage_1 = () => {
  const router = useRouter();

  const objectives = [
    { label: 'Find Projects', value: 'find_projects', isChecked: false },
    { label: 'Build Portfolio', value: 'build_portfolio', isChecked: false },
    { label: 'Connect With Mentors', value: 'connect_with_mentors', isChecked: false },
  ];

  const [userObjectives, setUserObjectives] = useState(objectives);

  const handleSelectObjective = (index: number) => {
    const obj = [...userObjectives];
    obj[index].isChecked = !obj[index].isChecked;
    setUserObjectives(obj);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => instance.patch('/user', data),
    mutationKey: ['user', 'update'],
    onSuccess() {
      toast.success("Preference Saved !!!");
      router.push(`/onboarding_2`);
    },
    onError(error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message || 'Action Failed');
    },
  });

  const handleSubmit = () => {
    const items = userObjectives.filter(item => item.isChecked);
    if (items.length < 1) return toast.error('Please Select an option');
    const payload = items.map(item => item?.value);
    mutate({ objectives: payload });
  };

  return (
    <>
      <div className="bg-white max-w-[500px] mx-auto shadow-md rounded-lg lg:px-20 lg:py-20 px-5 py-10 w-full h-full flex flex-col justify-between">
        {/* Progress Tracker */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Step 1 of 3</span>
            <span>Onboarding</span>
          </div>
          <div className="relative w-full bg-gray-200 h-2 rounded-full mt-3">
            <div className="absolute top-0 left-0 h-2 bg-blue-800 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            What is the number one thing you want to do on Sqwads?
          </h3>
          <h6 className="text-sm text-gray-500 mb-8">Select at least one option</h6>
        </div>

        {/* Checkbox Options */}
        <div className="space-y-6 mb-10">
          {userObjectives.map((item, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={() => handleSelectObjective(index)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className={`flex items-center justify-center bg-blue-800 text-white px-8 py-4 rounded-md hover:bg-blue-900 w-full ${isPending && 'opacity-50'}`}
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : <>Continue <FaLongArrowAltRight className="ml-2" /></>}
        </button>
      </div>
    </>
  );
};

export default OnboardingStage_1;
