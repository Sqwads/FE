"use client";
import Image from "next/image";
import React, { useState } from "react";

// Define a type for the Card props
interface CardProps {
  imageSrc: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

// Reusable Card Component
const Card: React.FC<CardProps> = ({ imageSrc, label, isSelected, onSelect }) => {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${
        isSelected
          ? "bg-blue-100 border-blue-500 shadow-lg"
          : "bg-white border-gray-300 hover:shadow-md"
      }`}
      onClick={onSelect}
    >
      <Image
        src={imageSrc}
        alt={label}
        width={150}
        height={100}
        className="rounded-md mb-3"
      />
      <h3
        className={`text-center font-medium ${
          isSelected ? "text-blue-800" : "text-gray-800"
        }`}
      >
        {label}
      </h3>
    </div>
  );
};

const FinalOnboarding = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const domains = [
    { label: "Finance", imageSrc: "/images/finance.png" },
    { label: "Medical", imageSrc: "/images/medical.png" },
    { label: "Agriculture", imageSrc: "/images/agric.png" },
    { label: "Ecommerce", imageSrc: "/images/ecommerce.png" },
    { label: "Insurance", imageSrc: "/images/insurance.png" },
    { label: "Hospitality", imageSrc: "/images/hospitality.png" },
  ];

  const handleSelect = (label: string) => {
    setSelectedDomains((prev) =>
      prev.includes(label)
        ? prev.filter((domain) => domain !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="flex justify-center items-center h-full w-[100%]">
    <div className="bg-white shadow-md rounded-lg p-10 w-full flex flex-col justify-between">
    {/* Progress Tracker */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Step 3 of 3</span>
            <span>Onboarding</span>
          </div>
          <div className="relative w-full bg-gray-200 h-2 rounded-full mt-3">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-800 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Pick one or more domain(s) that interest(s) you
          </h2>
        </div>

        {/* Card Grid - Fixed 2 Columns */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {domains.map((domain) => (
            <Card
              key={domain.label}
              imageSrc={domain.imageSrc}
              label={domain.label}
              isSelected={selectedDomains.includes(domain.label)}
              onSelect={() => handleSelect(domain.label)}
            />
          ))}
        </div>

        {/* Continue Button */}
        <button
          className="flex items-center justify-center bg-blue-800 text-white px-8 py-4 rounded-md hover:bg-blue-900 w-full"
          disabled={selectedDomains.length === 0}
        >
          Setup my Custom feed
        </button>
      </div>
    </div>
  );
};

export default FinalOnboarding;
