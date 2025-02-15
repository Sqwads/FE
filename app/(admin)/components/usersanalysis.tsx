"use client"
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Product Design", value: 1200, color: "#6366F1" },
  { name: "Front-end dev.", value: 480, color: "#06B6D4" },
  { name: "Data Analysis", value: 430, color: "#EC4899" },
  { name: "Back-end dev.", value: 390, color: "#EF4444" },
];

const UsersAnalysis = () => {
  const totalSessions = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Users’ Analysis</h2>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
              <p className="text-sm text-gray-700">{entry.name}</p>
            </div>
          ))}
        </div>
        <PieChart width={150} height={150}>
          <Pie data={data} dataKey="value" outerRadius={70} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <p className="text-sm text-gray-500 mt-4">Total Sessions: {totalSessions}</p>
    </div>
  );
};

export default UsersAnalysis;