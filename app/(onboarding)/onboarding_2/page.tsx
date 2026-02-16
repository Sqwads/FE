"use client";
import { instance } from "@/src/api/instance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaLongArrowAltRight } from "react-icons/fa";

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
      className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center ${isSelected ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
        }`}
      onClick={onSelect}
    >
      <div className="w-full h-20 relative mb-3">
        <img
          src={imageSrc}
          alt={label}
          className="w-full h-full rounded-md object-cover"
        />
      </div>
      <h3
        className={`text-center font-medium ${isSelected ? "text-blue-800" : "text-gray-800"
          }`}
      >
        {label}
      </h3>
    </div>
  );
};

const OnboardingStage_2 = () => {
  const router = useRouter();
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const domains = [
    { label: "Front-End Development", imageSrc: "/images/frontend.png", value: 'frontend' },
    { label: "UI/UX Design", imageSrc: "/images/uiux.png", value: 'ui-ux' },
    { label: "Data Analysis", imageSrc: "/images/data.png", value: 'data_analysis' },
    { label: "Back-End Development", imageSrc: "/images/backend.png", value: 'backend' },
    { label: "Product Management", imageSrc: "/images/product.png", value: 'product_management' },
    { label: "Application Development", imageSrc: "/images/app_dev.png", value: 'app_dev' },
    { label: "Digital Marketing", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500", value: 'digital_marketing' },
    { label: "Content Writing", imageSrc: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=500", value: 'content_writing' },
    { label: "Sales & Business", imageSrc: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=500", value: 'sales' },
    { label: "Human Resources", imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500", value: 'hr' },
    { label: "Customer Success", imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500", value: 'customer_success' },
    { label: "Finance & Accounting", imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=500", value: 'finance' },
    { label: "Cybersecurity", imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500", value: 'cybersecurity' },
    { label: "AI & Machine Learning", imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=500", value: 'ai_ml' },
    { label: "Cloud Computing", imageSrc: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=500", value: 'cloud_computing' },
    { label: "DevOps", imageSrc: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=500", value: 'devops' },
    { label: "Quality Assurance", imageSrc: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=500", value: 'qa' },
    { label: "Blockchain", imageSrc: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=500", value: 'blockchain' },



  ];

  const handleSelect = (value: string) => {
    setSelectedDomains((prev) =>
      prev.includes(value)
        ? prev.filter((domain) => domain !== value)
        : [...prev, value]
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => instance.patch('/user', data),
    mutationKey: ['user', 'update'],
    onSuccess() {
      toast.success("Preference Saved!");
      router.push(`/onboarding_3`);
    },
    onError(error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message || 'Action Failed');
    },
  });

  const handleSubmit = () => {
    mutate({ skills_of_interest: selectedDomains });
  };

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {domains.map((domain) => (
          <Card
            key={domain.value}
            imageSrc={domain.imageSrc}
            label={domain.label}
            isSelected={selectedDomains.includes(domain.value)}
            onSelect={() => handleSelect(domain.value)}
          />
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleSubmit}
        className={`flex items-center justify-center bg-blue-800 text-white px-8 py-4 rounded-md hover:bg-blue-900 w-full ${isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={isPending || selectedDomains.length === 0}
      >
        {isPending ? 'Submitting...' : <>Continue <FaLongArrowAltRight className="ml-2" /></>}
      </button>
    </div>
  );
};

export default OnboardingStage_2;
