"use client";

import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiTrash2, FiArchive, FiUpload } from 'react-icons/fi';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import DOMPurify from 'dompurify';
import { Modal, Button } from '@mantine/core';
import { set } from 'date-fns';
import toast from 'react-hot-toast';


const BlogPostDetailView = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const queryClient = useQueryClient()
  const splittedId = (id as string)?.split('-');
  const blogId = splittedId[splittedId.length - 1];

  const [opened, setOpened] = useState(false);


  const {data: response, isPending} = useQuery({
    queryFn: () => instance.get(`/blog/${blogId}`),
    queryKey: ['get-blog-post', id],
  }) 
  const {mutate: deleteBlog, isPending: deleteIspending} = useMutation({
    mutationFn: () => instance.delete(`/blog/${blogId}`),
    mutationKey: ['delete-blog-post'],
    onSuccess: (response) => {
      toast.success('Blog post deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['get-blog-posts']
      });
      router.push('/blog-manager');
      setOpened(false);
    },
    onError: (error) => {
      toast.error('Failed to delete blog post');
    }
  })

  const handleGoBack = () => {
    router.push('/blog-manager');
  };

  const blogPost = response?.data?.data || {};

  const handleDeletePost = ()=>{
    deleteBlog();
  }


  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!response?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Blog post not found.</p>
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header with Actions */}
        <div className="flex items-center justify-between mb-8">
          {/* Go Back Button */}
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          {/* Action Buttons - Different based on archived status */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={()=>setOpened(true)}
              className="flex bg-[red] items-center px-4 py-2 text-white  border-red-300 rounded-lg  transition-colors duration-300"
            >
              <FiTrash2 className="w-4 h-4 mr-2" />
              Delete Post
            </button>
            
       
          </div>
        </div>

     

        {/* Blog Post Content */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="w-full h-64 md:h-80 overflow-hidden bg-gray-200 relative">
              <img
                src={blogPost?.cover_image || '/images/blog-placeholder.png'}
                alt={blogPost?.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />       
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blogPost?.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex items-center text-gray-600 mb-8 text-sm">
              <span>{blogPost.date}</span>
              <span className="mx-2">•</span>
              <span>{blogPost?.author?.firstName} {blogPost?.author?.lastName}</span>
             
            </div>
            
            {/* Blog Content */}
            <div className=" max-w-none">
              
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogPost?.content) }}
                />
              
            </div>
          </div>
        </div>
      </div>

      
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete Blog Post"
        centered
      >
        <div className="mb-6 text-center text-gray-700 py-5">
          <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="default" onClick={()=> setOpened(false)}>
            Cancel
          </Button>
          <Button disabled={deleteIspending} loading={deleteIspending} color="red" onClick={handleDeletePost}>
            <FiTrash2 className="w-4 h-4 mr-2" />
            {deleteIspending ? 'Deleting...' : 'Delete Post'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default BlogPostDetailView;