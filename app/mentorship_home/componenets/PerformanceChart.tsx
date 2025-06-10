"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'; // Using react-icons

// Sample data - replace with actual data fetching
const data = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 450 },
  { name: 'Apr', uv: 500 },
  { name: 'May', uv: 480 },
  { name: 'Jun', uv: 550 },
  { name: 'Jul', uv: 580 },
  { name: 'Aug', uv: 620 },
  { name: 'Sep', uv: 600 },
  { name: 'Oct', uv: 650 },
  { name: 'Nov', uv: 630 },
  { name: 'Dec', uv: 680 },
];

const PerformanceChart = () => {
  // Example performance change - replace with actual logic
  const performanceChange = -24; // Example: decreased by 24%
  const performancePeriod = "last 12 months"; // Example period

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Performance</h3>
          <div className={`flex items-center text-sm ${performanceChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
            {performanceChange < 0 ? <FiArrowDown className="mr-1" /> : <FiArrowUp className="mr-1" />}
            <span>{Math.abs(performanceChange)}%</span>
            <span className="text-gray-500 ml-2 text-xs">
              Your performace {performanceChange < 0 ? 'decreased' : 'increased'} by {Math.abs(performanceChange)}% compared to last month
            </span>
          </div>
        </div>
        {/* Placeholder for dropdown - implement if needed */}
        <button className="text-xs text-gray-500 border rounded px-2 py-1 hover:bg-gray-100">
          {performancePeriod}
        </button>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -20, // Adjust left margin to pull Y-axis closer if needed
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} tick={{ fontSize: 10, fill: '#6b7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
            <Tooltip 
              contentStyle={{ fontSize: '12px', borderRadius: '4px', padding: '4px 8px' }} 
              itemStyle={{ padding: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="uv" 
              stroke="#4f46e5" // Indigo color similar to UI
              strokeWidth={2} 
              dot={{ r: 4, fill: '#4f46e5' }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;

