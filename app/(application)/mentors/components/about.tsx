"use client";

import React, { useState } from "react";
import Image from "next/image";
import FRAME_1 from "../../../components/FRAME.png";
import FRAME_2 from "../../../components/FRAME_2.png";

const AboutSection = ({ mentor }: any) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState<number | null>(null);

  const colorCodes = ["#EE46BC", "#01C569", "#36BFFA", "#6172F3", "#FFA52F"];

  if (!mentor) {
    return <div className="text-gray-400 italic">No mentor info.</div>;
  }

  const experiencesToShow = showAll
    ? mentor.experiences
    : mentor.experiences?.slice(0, 2);

  // Helper to toggle description expansion
  const toggleDescription = (index: number) => {
    setExpandedDesc(expandedDesc === index ? null : index);
  };

  return (
    <div className="lg:pr-10">
      {/* Story / Bio */}
      {mentor?.story && (
        <p className="mb-5 text-gray-500 leading-relaxed">{mentor.story}</p>
      )}

      {/* Skills */}
      {mentor?.skills?.length > 0 && (
        <div className="mb-6">
          <div className="font-semibold mb-2">My Skills:</div>
          <div className="inline-flex gap-2 flex-wrap">
            {mentor.skills.map((item: string, idx: number) => {
              const bgColor = colorCodes[idx % colorCodes.length];
              return (
                <span
                  key={idx}
                  style={{
                    color: bgColor,
                    borderColor: bgColor,
                    backgroundColor: bgColor + "20",
                  }}
                  className="rounded-md border px-3 py-1 text-xs font-medium transition-transform duration-300 hover:scale-105"
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Mentorship Areas */}
      {mentor?.skills?.length > 0 && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Mentorship Areas:</div>
          <ul className="list-disc pl-6 text-gray-500 space-y-1">
            {mentor.skills.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Work Experience */}
      {mentor?.experiences?.length > 0 ? (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <div className="font-semibold text-lg text-gray-800">
              Work Experience
            </div>
            {mentor.experiences.length > 2 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[#001D69] font-semibold underline text-sm hover:opacity-80"
              >
                {showAll ? "View less" : "View more"}
              </button>
            )}
          </div>

          <div className="space-y-6">
            {experiencesToShow.map((exp: any, index: number) => {
              const frameImage = index % 2 === 0 ? FRAME_1 : FRAME_2;
              const isExpanded = expandedDesc === index;

              const shortText =
                exp.description?.length > 120
                  ? exp.description.slice(0, 120) + "..."
                  : exp.description;

              return (
                <div
                  key={index}
                  className="w-full flex gap-4 border-0 border-b-[1px] pb-8"
                >
                  <div>
                    <Image
                      src={frameImage}
                      alt="Frame"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <h1 className="text-[#001D69] font-semibold">
                          {exp.position}
                        </h1>
                        <p className="text-gray-500">{exp.company}</p>
                      </div>
                      <span className="bg-[#EFF3FF] text-[#001D69] px-3 py-1 rounded-md text-sm">
                        {exp.duration || "AUG 2024 - present"}
                      </span>
                    </div>

                    <div className="pt-4 text-gray-600">
                      <p>
                        {isExpanded ? exp.description : shortText}
                        {exp.description?.length > 120 && (
                          <button
                            onClick={() => toggleDescription(index)}
                            className="text-[#001D69] font-medium underline ml-2 hover:opacity-80"
                          >
                            {isExpanded ? "View less" : "View more"}
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 italic mt-4">
          No work experience added yet.
        </p>
      )}
    </div>
  );
};

export default AboutSection;
