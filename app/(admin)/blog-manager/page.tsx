"use client";
import React from 'react';
import BlogManagementHeader from './components/BlogManagementHeader';
import DashboardMetrics from './components/DashboardMetrics';
import SearchAndFilters from './components/SearchAndFilters';
import BlogManagementGrid from './components/BlogManagementGrid';
import AdminBlogCard from './components/AdminBlogCard';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';

const Page = () => {

  const {data: response, isPending} = useQuery({
    queryFn: () => instance.get('/blog/all'),
    queryKey:['get-blog-posts']
  })

  const allBlogs = response?.data?.data?.blogs || [];

  return (
    <div className="min-h-screen ">
      
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8">
    
        <BlogManagementHeader />
        
 
        <DashboardMetrics
          totalBlogs = { response?.data?.data?.total + response?.data?.data?.archived }
          archivedBlogs = { response?.data?.data?.archived }
          publishedBlogs = { response?.data?.data?.total }
        />
        
   
        <SearchAndFilters />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBlogs?.map((post:any) => (
              <AdminBlogCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
      </div>
    </div>
  );
};

export default Page;