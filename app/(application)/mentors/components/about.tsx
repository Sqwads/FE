"use client";

import React from "react";

const AboutSection = ({ mentor }: any) => {
  const colorCodes = ["#EE46BC", "#01C569", "#36BFFA", "#6172F3", "#FFA52F"];
  console.log(mentor.experiences);

  if (!mentor) {
    return <div className="text-gray-400 italic">No mentor Info.</div>;
  }

  return (
    <div className="lg:pr-10">
      {mentor?.story && (
        <p className="mb-5 text-gray-500 leading-relaxed">{mentor.story}</p>
      )}

      {mentor?.skills?.length ? (
        <div className="mb-6">
          <div className="mr-2 font-semibold mb-2">My Skills:</div>
          <div className="inline-flex gap-2 flex-wrap">
            {mentor.skills.map((item: any, idx: number) => {
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
      ) : null}

      {mentor?.skills?.length ? (
        <div className="mb-6">
          <div className="mb-2 font-semibold">Mentorship Areas:</div>
          <ul className="list-disc pl-6 text-gray-500 space-y-1">
            {mentor.skills.map((item: any, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {mentor?.skills?.length ? (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">Working Experience:</div>
            <button className="text-[#001D69] font-semibold underline text-base">
              View more
            </button>
          </div>

          <ul className="list-disc pl-6 text-gray-500 space-y-1 flex justify-center items-center">
            <p>No Working Experience Yet</p>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default AboutSection;
