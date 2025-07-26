"use client";

import React, { useState } from 'react';
import { FiArrowLeft, FiImage } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define the form data interface for better type safety
interface CreatePostFormData {
  title: string;
  shortSummary: string;
  author: string;
  content: string;
  coverImage: File | null;
}

const CreatePostPage = () => {
  const router = useRouter();
  
  // Form state with proper typing
  const [formData, setFormData] = useState<CreatePostFormData>({
    title: '',
    shortSummary: '',
    author: '',
    content: '',
    coverImage: null
  });

  const [contentLength, setContentLength] = useState(0);

  const handleGoBack = () => {
    console.log('Go back clicked');
    router.push('/blog_manager');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'content') {
      setContentLength(value.length);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
      console.log('Image uploaded:', file.name);
    }
  };

  const handleArchivePost = () => {
    console.log('Archive post clicked');
  };

  const handleReviewConfirm = () => {
    console.log('Review & Confirm clicked');
    console.log('Form data:', formData);
    
    const reviewData = {
      ...formData,
      coverImageName: formData.coverImage?.name || null,
      coverImageUrl: formData.coverImage ? URL.createObjectURL(formData.coverImage) : null
    };
    
    sessionStorage.setItem('blogPostReviewData', JSON.stringify(reviewData));
    
    router.push('/blog_manager/review');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Increased width and adjusted padding for better screen utilization */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header - Fixed alignment */}
        <div className="mb-8">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-6"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          {/* Header aligned to match original design */}
          <div className="text-left">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Create Post</h1>
            <p className="text-gray-600">An Overview of all sqwads mentors</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 relative">
          {/* Cover Image Upload */}
          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors duration-300">
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="coverImage" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <FiImage className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Add cover image</p>
                  {formData.coverImage && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {formData.coverImage.name}
                    </p>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 mb-24">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Building a Portfolio that gets you hired"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>

            {/* Short Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short summary
              </label>
              <textarea
                name="shortSummary"
                value={formData.shortSummary}
                onChange={handleInputChange}
                placeholder="e.g. Struggling with how to present your projects? Here are tips to help you turn your Sqwads experience into..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 resize-none"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="e.g. Admin Management"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <span className="text-sm text-gray-500">
                  {contentLength}/1024
                </span>
              </div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Start writing..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 resize-none"
              />
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
                onClick={handleReviewConfirm}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
              >
                Review & Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;