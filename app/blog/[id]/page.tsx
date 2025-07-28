"use client"
import { useParams } from 'next/navigation';
import BlogPostDetail from '../componnets/BlogPostDetail';
import Footer from '../componnets/Footer';
import { getAllBlogSlugs, getBlogPostBySlug, BlogPostDetail as BlogPostDetailType } from '../data/blogData';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';




const BlogPostPage = () => {



  const params = useParams();
  const { id } = params
  const splittedId = (id as string)?.split('-');
  const blogId = splittedId[splittedId.length - 1];

  const {data: response, isPending} = useQuery({
    queryFn: () => instance.get(`/blog/${blogId}`),
    queryKey: ['get-blog-post', id],
  }) 

 const blogPost = response?.data?.data || {};

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
        <BlogPostDetail post={blogPost} /> {/* This component now includes its own navigation */}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;

