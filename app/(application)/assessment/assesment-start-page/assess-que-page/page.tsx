"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import AssessmentHeader from '../../../components/AssessmentHeader'; 
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';

// Placeholder data for the question and options
const questionData = {
  number: 1,
  text: "Which of the following best describes the primary purpose of user-centered design (UCD)?",
  options: [
    { id: 'a', text: "To ensure the design is aesthetically pleasing." },
    { id: 'b', text: "To maximize the technical capabilities of the product." },
    { id: 'c', text: "To focus on meeting the needs and goals of users." },
    { id: 'd', text: "To reduce the time spent on development." },
    { id: 'e', text: "To minimize the cost of design." },
  ],
  type: 'multiple-choice-multiple-answer'
};

const AssessmentQuestionPage = () => {
  const [selectedOptions, setSelectedOptions] = useState(['a']);

  // const handleSelectOption = (optionId) => {
  //   console.log("Selected option:", optionId);
  //   // Example state update logic (commented out):
  //   // setSelectedOptions(prev => 
  //   //   prev.includes(optionId) 
  //   //     ? prev.filter(id => id !== optionId) 
  //   //     : [...prev, optionId]
  //   // );
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-16">
      <div className="max-w-9xl mx-auto">
        {/* Header: Use Shared Header on left, Timer and Next button grouped on right */}
        <div className="flex justify-between items-center mb-10">
          {/* Left: Use Shared Header Component */}
          {/* Note: AssessmentHeader includes mb-8, so adjusted parent mb-10 */}
          <AssessmentHeader />

          {/* Right Group: Timer + Button */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Timer */}
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <Image 
                src="/images/clock.png" 
                alt="Timer icon" 
                width={22}
                height={22}
                className="flex-shrink-0"
              />
              <span className="text-lg">09:59</span>
            </div>
            {/* Button */}
                <Link href='/assessment/assesment-start-page/assess-que-page/assess-result'>
                <button
                  // onClick={handleNextQuestion} 
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#001D69] text-white rounded-md hover:bg-blue-800 transition-colors text-sm font-medium"
                >
                  Next  <FaLongArrowAltRight size={23} className="ml-2 animate-bounce w-6 h-6" />
                </button>
            </Link>
            
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-10 md:p-16 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            {/* Left Column - Question */}
            <div className="w-full md:w-1/2">
              <p className="text-xl font-medium text-gray-800 leading-relaxed">
                ({questionData.number}) {questionData.text}
              </p>
            </div>

            {/* Right Column - Answer Options */}
            <div className="w-full md:w-1/2">
              <p className="text-base font-semibold text-gray-700 mb-8">Select all that apply</p>
              <div className="space-y-5">
                {questionData.options.map((option) => {
                  const isSelected = selectedOptions.includes(option.id);
                  return (
                    <label
                      key={option.id}
                      className={`flex items-center gap-5 p-6 rounded-lg border cursor-pointer transition-colors ${isSelected
                          ? 'bg-[#001D69] border-[#001D69] text-white shadow-lg'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        // onChange={() => handleSelectOption(option.id)}
                        className={`form-checkbox h-6 w-6 rounded border-gray-300 transition duration-150 ease-in-out flex-shrink-0 ${isSelected ? 'text-[#001D69] focus:ring-[#001D69]' : 'text-gray-400 focus:ring-gray-400'} ${isSelected ? 'bg-white border-white' : 'bg-white border-gray-300'}`}
                      />
                      <span className="text-base">{option.text}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestionPage;

