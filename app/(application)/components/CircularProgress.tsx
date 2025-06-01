import React from 'react';

interface CircularProgressProps {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  label: string;
  rating: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  color,
  size = 180, // Increased size to match design
  strokeWidth = 10, // Increased stroke width for better visibility
  label,
  rating
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage * circumference) / 100;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-gray-700 mb-4">{label}</h3>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle (light gray) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
          />
          {/* Colored progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>
            {percentage}%
          </span>
        </div>
      </div>
      <p className="mt-4 text-blue-900 font-bold text-lg">{rating}</p>
    </div>
  );
};

export default CircularProgress;
