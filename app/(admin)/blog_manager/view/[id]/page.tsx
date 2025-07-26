"use client";

import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiTrash2, FiArchive, FiUpload } from 'react-icons/fi';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

// Define the blog post data type
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  author?: string;
  status: 'published' | 'draft' | 'archived';
  content: string;
}

const BlogPostDetailView = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  
  const isArchivedView = searchParams.get('archived') === 'true';

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockPost: BlogPost = {
          id: Number(id),
          slug: "building-portfolio-that-gets-hired",
          title: "Building a Portfolio that gets you hired",
          description: "Learn how to build a portfolio that stands out",
          date: "May 24, 2025",
          author: "Admin Sqwads",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop&crop=center",
          status: isArchivedView ? "archived" : "published",
          content: `Your portfolio isn't just a digital resume. It's proof. Proof that you've learned, built, collaborated, and delivered. And in the tech world, it often speaks louder than your degree, your certifications—or even your job title. But here's the catch: not all portfolios are created equal. At Sqwads, we've seen first-hand how real-world experience can transform a portfolio from a list of personal side projects into a powerful, job-winning tool. Here's how to build one that gets noticed—and gets you hired.

1. Show, Don't Just Tell

Anyone can say they "built a website" or "collaborated on a team." But recruiters and hiring managers want receipts.

✓ Add live project links
✓ Include screenshots or screen recordings  
✓ Highlight your specific contributions (e.g. "I handled mobile responsiveness and animation logic using TailwindCSS and Framer Motion).

If you worked on a Sqwads team, show off the real project you contributed to—and explain what you brought to the table.

2. Context Is King

Don't just show what you built—explain why you built it and what problem it solved. Context transforms a simple project into a compelling story.

3. Quality Over Quantity

It's better to have 3-5 well-documented, polished projects than 20 half-finished ones. Choose projects that showcase different skills and tell a cohesive story about your growth as a developer.

4. Make It Interactive

Static screenshots are good, but interactive demos are better. Deploy your projects and include live links wherever possible. If the project is no longer live, include a detailed walkthrough video.

5. Show Your Process

Include wireframes, design mockups, or documentation that shows your thought process. Employers want to see how you approach problems, not just the final solution.`
        };
        
        setBlogPost(mockPost);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, isArchivedView]);

  // Fixed Go Back function - context-aware navigation
  const handleGoBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback based on context
      const fallbackRoute = isArchivedView ? '/blog_manager/archived' : '/blog_manager';
      router.push(fallbackRoute);
    }
  };

  const handleDeletePost = async () => {
    if (!blogPost) return;
    
    const confirmMessage = isArchivedView 
      ? 'Are you sure you want to permanently delete this archived post? This action cannot be undone.'
      : 'Are you sure you want to delete this post?';
      
    const confirmed = window.confirm(confirmMessage);
    if (confirmed) {
      try {
        console.log('Deleting post:', blogPost.id);
        // await fetch(`/api/blog-posts/${blogPost.id}`, { method: 'DELETE' });
        
        const successMessage = isArchivedView 
          ? 'Post deleted permanently.' 
          : 'Post deleted successfully.';
        alert(successMessage);
        
        const redirectRoute = isArchivedView ? '/blog_manager/archived' : '/blog_manager';
        router.push(redirectRoute);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  const handleArchivePost = async () => {
    if (!blogPost) return;
    
    const confirmed = window.confirm('Are you sure you want to archive this post? It will be hidden from public view.');
    if (confirmed) {
      try {
        // Replace with actual API call
        console.log('Archiving post:', blogPost.id);
        // await fetch(`/api/blog-posts/${blogPost.id}/archive`, { method: 'PUT' });
        
        alert('Post archived successfully.');
        router.push('/blog_manager');
      } catch (error) {
        console.error('Error archiving post:', error);
        alert('Error archiving post. Please try again.');
      }
    }
  };

  const handlePublishPost = async () => {
    if (!blogPost) return;
    
    const confirmed = window.confirm('Are you sure you want to publish this post? It will be restored from archived status and made public.');
    if (confirmed) {
      try {
        // Replace with actual API call
        console.log('Publishing archived post:', blogPost.id);
        // await fetch(`/api/blog-posts/${blogPost.id}/publish`, { method: 'PUT' });
        
        alert('Post published successfully!');
        router.push('/blog_manager');
      } catch (error) {
        console.error('Error publishing post:', error);
        alert('Error publishing post. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
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

  if (!blogPost) {
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
              onClick={handleDeletePost}
              className="flex items-center px-4 py-2 text-white border bg-[#9BB7FF33] border-red-300 rounded-lg hover:bg-[#0234B8] transition-colors duration-300"
            >
              <FiTrash2 className="w-4 h-4 mr-2" />
              Delete Post
            </button>
            
            {isArchivedView ? (
              <button 
                onClick={handlePublishPost}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <FiUpload className="w-4 h-4 mr-2" />
                Publish Post
              </button>
            ) : (
              <button 
                onClick={handleArchivePost}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <FiArchive className="w-4 h-4 mr-2" />
                Archive Post
              </button>
            )}
          </div>
        </div>

        {/* Archived Status Indicator - Only show for archived posts */}
        {isArchivedView && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <p className="text-yellow-800 text-sm font-medium">
                This post is currently archived and hidden from public view.
              </p>
            </div>
          </div>
        )}

        {/* Blog Post Content */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="w-full h-64 md:h-80 overflow-hidden bg-gray-200 relative">
            {!imageError ? (
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-full object-cover"
                onError={() => {
                  console.log('Image failed to load, showing fallback');
                  setImageError(true);
                }}
                onLoad={() => console.log('Image loaded successfully')}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">{blogPost.title}</h3>
                  <p className="text-blue-100">Featured Image</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blogPost.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex items-center text-gray-600 mb-8 text-sm">
              <span>{blogPost.date}</span>
              <span className="mx-2">•</span>
              <span>{blogPost.author}</span>
              {isArchivedView && (
                <>
                  <span className="mx-2">•</span>
                  <span className="text-yellow-600 font-medium">Archived</span>
                </>
              )}
            </div>
            
            {/* Blog Content */}
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {blogPost.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetailView;