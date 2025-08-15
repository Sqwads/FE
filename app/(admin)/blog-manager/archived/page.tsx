import React from 'react';
import ArchivedBlogHeader from '../components/ArchivedBlogHeader';
import SearchAndFilters from '../components/SearchAndFilters';
import ArchivedBlogGrid from '../components/ArchivedBlogGrid';

const ArchivedBlogPostsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header Section */}
        <ArchivedBlogHeader />
        
        {/* Search and Filters */}
        <SearchAndFilters />
        
        {/* Archived Blog Posts Grid */}
        <ArchivedBlogGrid />
      </div>
    </div>
  );
};

export default ArchivedBlogPostsPage;