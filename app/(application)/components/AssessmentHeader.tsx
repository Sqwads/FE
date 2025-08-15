"use client";
import React from 'react';

const AssessmentHeader = () => {
  return (
    <div className="mb-8"> {/* Retaining mb-8 as it was common in results page, adjust per page if needed */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">
        UI/UX Design Self Assesment Test
      </h1>
      <p className="text-xs text-gray-500">
        Embark on a Journey of Skill Mastery in the Sqwads Skill Assessment Zone! 🚀✨
      </p>
    </div>
  );
};

export default AssessmentHeader;

