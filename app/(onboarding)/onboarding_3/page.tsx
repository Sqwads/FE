"use client";
import { instance } from "@/src/api/instance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
      className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${isSelected
        ? "bg-blue-100 border-blue-500 shadow-lg"
        : "bg-white border-gray-300 hover:shadow-md"
        }`}
      onClick={onSelect}
    >
      <div className="w-full h-20 relative mb-3">
        <img src={imageSrc} alt={label} className="w-full h-full rounded-md object-cover" />
      </div>
      <h3 className={`text-center font-medium ${isSelected ? "text-blue-800" : "text-gray-800"}`}>
        {label}
      </h3>
    </div>
  );
};

const FinalOnboarding = () => {
  const router = useRouter();
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const domains = [
    { label: "Finance", imageSrc: "/images/finance.png", value: "finance" },
    { label: "Medical", imageSrc: "/images/medical.png", value: "medical" },
    { label: "Agriculture", imageSrc: "/images/agric.png", value: "agriculture" },
    { label: "Ecommerce", imageSrc: "/images/ecommerce.png", value: "ecommerce" },
    { label: "Insurance", imageSrc: "/images/insurance.png", value: "insurance" },
    { label: "Hospitality", imageSrc: "/images/hospitality.png", value: "hospitality" },
    { label: "Education", imageSrc: "/images/agric.png", value: "education" },
    { label: "Technology", imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60", value: "technology" },
    { label: "Entertainment", imageSrc: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=500&auto=format&fit=crop&q=60", value: "entertainment" },
    { label: "Real Estate", imageSrc: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60", value: "real_estate" },
    { label: "Logistics", imageSrc: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60", value: "logistics" },
    { label: "Manufacturing", imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60", value: "manufacturing" },
  ];

  const handleSelect = (value: string) => {
    setSelectedDomains((prev) =>
      prev.includes(value) ? prev.filter((domain) => domain !== value) : [...prev, value]
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => instance.patch("/user", data),
    mutationKey: ["user", "update3"],
    onSuccess() {
      toast.success("Preference Saved !!!");
      router.push("/dashboard");
    },
    onError(error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message || "Action Failed");
    },
  });

  const handleSubmit = () => {
    if (selectedDomains.length === 0) return;
    mutate({ topics_of_interest: selectedDomains });
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
            <div className="absolute top-0 left-0 h-2 bg-blue-800 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Pick one or more domain(s) that interest(s) you
          </h2>
        </div>

        {/* Card Grid - Fixed 2 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {domains.map((domain) => (
            <Card
              key={domain.label}
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
          className={`flex items-center justify-center bg-blue-800 text-white px-8 py-4 rounded-md hover:bg-blue-900 w-full ${isPending && "opacity-50"
            }`}
          disabled={selectedDomains.length === 0 || isPending}
        >
          {isPending ? "Submitting..." : "Setup my Custom feed"}
        </button>
      </div>
    </div>
  );
};

export default FinalOnboarding;
