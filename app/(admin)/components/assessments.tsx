import React from "react";

const assessments = [
  { name: "Nneoma Onyekachi", score: "100%", lastActivity: "Yesterday, 06:05pm" },
  { name: "Fatima Yusuf", score: "95%", lastActivity: "06/01/2025, 01:00pm" },
  { name: "Abdullahi Suleiman", score: "95%", lastActivity: "Yesterday, 06:05pm" },
  { name: "Adebayo Ademola", score: "90%", lastActivity: "Yesterday, 06:05pm" },
];

const Assessments = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Assessments 🏆</h2>
        <button className="text-blue-500">View all</button>
      </div>
      {assessments.map((assessment, index) => (
        <div key={index} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">{assessment.name}</p>
            <p className="text-sm text-gray-500">{assessment.lastActivity}</p>
          </div>
          <span className="text-blue-500">{assessment.score}</span>
        </div>
      ))}
    </div>
  );
};

export default Assessments;