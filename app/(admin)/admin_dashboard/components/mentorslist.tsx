import React from "react";

const mentors:any = [
 
];

const MentorsList = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top Sqwad Mentors</h2>
        <button className="text-blue-500">View all</button>
      </div>
      {mentors.map((mentor:any, index:number) => (
        <div key={index} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">{mentor.name}</p>
            <p className="text-sm text-gray-500">{mentor.lastSession}</p>
          </div>
          <span className="text-blue-500">{mentor.sessions} sessions</span>
        </div>
      ))}

      {mentors.length === 0 && (
        <div className="flex items-center justify-center h-64 text-gray-500"> No Mentor Available </div>
       
      )}
      
    </div>
  );
};

export default MentorsList;