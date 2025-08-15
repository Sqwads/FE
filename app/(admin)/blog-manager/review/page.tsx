"use client";

import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define the review data interface
interface ReviewPostData {
  title: string;
  shortSummary: string;
  author: string;
  content: string;
  coverImageName: string | null;
  coverImageUrl: string | null;
}

const ReviewConfirmPage = () => {
  const router = useRouter();
  const [postData, setPostData] = useState<ReviewPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedData = sessionStorage.getItem('blogPostReviewData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setPostData(parsedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        router.push('/blog_manager/create');
      }
    } else {
      // No data found, redirect back to create page
      router.push('/blog_manager/create');
    }
    setLoading(false);
  }, [router]);

  const handleGoBack = () => {
    router.push('/blog_manager/create');
  };

  const handleArchivePost = () => {
    console.log('Archive post clicked');
  };

  const handlePublishPost = async () => {
    if (!postData) return;
    
    console.log('Publishing post:', postData);
    
    try {
      
      alert('Post published successfully!');
      
      sessionStorage.removeItem('blogPostReviewData');
      router.push('/blog_manager');
      
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Error publishing post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading review data...</p>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No data to review.</p>
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Go Back to Create
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-6"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <div className="text-left">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Review & Confirm</h1>
            <p className="text-gray-600">An Overview of all sqwads mentors</p>
          </div>
        </div>

        {/* Review Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 relative">
          {/* Cover Image Preview */}
          {postData.coverImageUrl && (
            <div className="mb-8">
              <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={postData.coverImageUrl}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Post Details */}
          <div className="space-y-6 mb-24">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {postData.title || 'No title provided'}
              </div>
            </div>

            {/* Short Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short summary
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[80px]">
                {postData.shortSummary || 'No summary provided'}
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {postData.author || 'No author provided'}
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <span className="text-sm text-gray-500">
                  {postData.content.length}/1024
                </span>
              </div>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[300px] whitespace-pre-wrap">
                {postData.content || 'No content provided'}
              </div>
            </div>
          </div>

          {/* Action Buttons - Fixed positioning to bottom right */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
            <div className="flex items-center space-x-3">
                <Link href='/blog_manager/archived'>
                    <button
                    onClick={handleArchivePost}
                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                    Archive Post
                </button>
                </Link>
             
              
              <button
                onClick={handlePublishPost}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewConfirmPage;