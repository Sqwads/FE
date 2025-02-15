import React from "react";

const mentors = [
  { name: "Chukwuemeka Micheal", sessions: 500, lastSession: "Yesterday, 06:05pm" },
  { name: "Adewale Taofeeq", sessions: 329, lastSession: "06/01/2025, 01:00pm" },
  { name: "Peter Florence", sessions: 235, lastSession: "Yesterday, 06:05pm" },
  { name: "Kunle Adebayo", sessions: 224, lastSession: "Yesterday, 06:05pm" },
];

const MentorsList = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top Sqwad Mentors</h2>
        <button className="text-blue-500">View all</button>
      </div>
      {mentors.map((mentor, index) => (
        <div key={index} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">{mentor.name}</p>
            <p className="text-sm text-gray-500">{mentor.lastSession}</p>
          </div>
          <span className="text-blue-500">{mentor.sessions} sessions</span>
        </div>
      ))}
    </div>
  );
};

export default MentorsList;