"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import UserActivityData from "./useractivity";

const UserActivityChart = () => {
  const [range, setRange] = useState<"7" | "14" | "30">("7");
  const data = UserActivityData[range] || [];

  

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-[#16181B]">User Activity</h2>
        <select
          className="border p-2 bg-[#9BB7FF33] rounded-md"
          value={range}
          onChange={(e) => setRange(e.target.value as "7" | "14" | "30")}
        >
          <option value="7">Last 7 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      {/* Previous Week and Current Week Labels */}
      <div className="flex justify-start space-x-6 mb-6">
        <p className="text-sm text-gray-500">Previous Week</p>
        <p className="text-sm text-gray-500">Current Week</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="current" stroke="#2563EB" strokeWidth={2} />
          <Line type="monotone" dataKey="previous" stroke="#A0AEC0" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
