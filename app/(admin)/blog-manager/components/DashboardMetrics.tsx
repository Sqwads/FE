import React from 'react';
import DashboardMetricCard from './DashboardMetricCard';
import { FiFileText, FiCheckCircle, FiArchive, FiEye } from 'react-icons/fi';

const DashboardMetrics = ({
  totalBlogs,
  archivedBlogs,
  publishedBlogs,
}:any) => {
  const metrics = [
    {
      icon: <FiFileText className="w-full h-full" />,
      value: totalBlogs || 0,
      label: "Total Blog Posted",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: <FiCheckCircle className="w-full h-full" />,
      value: publishedBlogs || 0,
      label: "Published Posts",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <FiArchive className="w-full h-full" />,
      value: archivedBlogs || 0,
      label: "Archive Blogs",
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <DashboardMetricCard
          key={index}
          icon={metric.icon}
          value={metric.value}
          label={metric.label}
          iconBgColor={metric.iconBgColor}
          iconColor={metric.iconColor}
        />
      ))}
    </div>
  );
};

export default DashboardMetrics;

