import React from 'react';
import BlogManagementHeader from './components/BlogManagementHeader';
import DashboardMetrics from './components/DashboardMetrics';
import SearchAndFilters from './components/SearchAndFilters';
import BlogManagementGrid from './components/BlogManagementGrid';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full width with responsive padding */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8">
        {/* Header Section */}
        <BlogManagementHeader />
        
        {/* Dashboard Metrics */}
        <DashboardMetrics />
        
        {/* Search and Filters */}
        <SearchAndFilters />
        
        {/* Blog Management Grid */}
        <BlogManagementGrid />
      </div>
    </div>
  );
};

export default Page;