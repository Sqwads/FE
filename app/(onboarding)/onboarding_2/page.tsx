"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
      className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center ${
        isSelected ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="w-full h-20 relative mb-3">
        <Image
          src={imageSrc}
          alt={label}
          fill
          className="rounded-md object-cover"
        />
      </div>
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

const OnboardingStage_2 = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const domains = [
    { label: "Front-End Development", imageSrc: "/images/frontend.png" },
    { label: "UI/UX Design", imageSrc: "/images/uiux.png" },
    { label: "Data Analysis", imageSrc: "/images/data.png" },
    { label: "Back-End Development", imageSrc: "/images/backend.png" },
    { label: "Product Management", imageSrc: "/images/product.png" },
    { label: "Application Development", imageSrc: "/images/app_dev.png" },
  ];

  const handleSelect = (label: string) => {
    setSelectedDomains((prev) =>
      prev.includes(label)
        ? prev.filter((domain) => domain !== label)
        : [...prev, label]
    );
  };

  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-lg p-10 w-full flex flex-col justify-between">
      {/* Progress Tracker */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Step 2 of 3</span>
          <span>Onboarding</span>
        </div>
        <div className="relative w-full bg-gray-200 h-2 rounded-full mt-3">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-800 rounded-full"
            style={{ width: "66%" }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Pick one or more tech domain(s) that interest(s) you
        </h2>
      </div>

      {/* Card Grid */}
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
        onClick={() => router.push('/onboarding_3')}
        className="flex items-center justify-center bg-blue-800 text-white px-8 py-4 rounded-md hover:bg-blue-900 w-full"
        disabled={selectedDomains.length === 0}
      >
        Continue <FaLongArrowAltRight className="ml-2" />
      </button>
    </div>
  );
};

export default OnboardingStage_2;