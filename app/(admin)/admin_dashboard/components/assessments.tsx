import React from "react";

const assessments:any = [
]

const Assessments = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Assessments 🏆</h2>
        <button className="text-blue-500">View all</button>
      </div>
      {assessments.map((assessment:any, index:number) => (
        <div key={index} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">{assessment.name}</p>
            <p className="text-sm text-gray-500">{assessment.lastActivity}</p>
          </div>
          <span className="text-blue-500">{assessment.score}</span>
        </div>
      ))}

      {assessments.length === 0 && (
        <div className="flex items-center justify-center h-64 text-gray-500"> No Assessment Available </div>  
      )}
    </div>
  );
};

export default Assessments;