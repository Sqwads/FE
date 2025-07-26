"use client"
import BlogPostDetail from '../componnets/BlogPostDetail';
import Footer from '../componnets/Footer';
import { getAllBlogSlugs, getBlogPostBySlug, BlogPostDetail as BlogPostDetailType } from '../data/blogData';
import Link from 'next/link';

const BlogPostPage = () => {

 const blogPost = {}

  if (!blogPost) { 
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <Link href="/blog" className="text-[#001D69] hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Removed Navbar component to avoid duplicate navigation */}
      <main>
        <BlogPostDetail /> {/* This component now includes its own navigation */}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;

