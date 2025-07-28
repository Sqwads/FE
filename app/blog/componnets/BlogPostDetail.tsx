import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DOMPurify from 'dompurify';
import BlogNav from "./Navbar";
import Head from "next/head";
import { extractPlainTextFromHTML, generateSlug, trimSentence } from "@/common";

const BlogPostDetail = ({post}:any) => {
  const [isSharing, setIsSharing] = useState(false);
  const baseUrl = "https://sqwads.com";

  const handleShare = (platform: string) => {
    
    const url = encodeURIComponent(`${baseUrl}/blog/${generateSlug(post?.title)}-${post._id}`);
    const text = encodeURIComponent(post?.title || "");
    const image = encodeURIComponent(post?.cover_image || "");

    let shareUrl = "";
    

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  

  return (
    <>
    <Head>
      <title>{post?.title}</title>
      <meta name="description" content={trimSentence(extractPlainTextFromHTML(post?.content), 100) || "Blog post"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${baseUrl}/${generateSlug(post?.title)}-${post?._id}`} />
      <meta property="og:title" content={post?.title} />
      <meta property="og:description" content={trimSentence(extractPlainTextFromHTML(post.content), 100) || ""} />
      <meta property="og:image" content={post?.cover_image || "/images/blog-placeholder.png"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${baseUrl}/${generateSlug(post?.title)}-${post?._id}`} />
      <meta name="twitter:title" content={post?.title} />
      <meta name="twitter:description" content={trimSentence(extractPlainTextFromHTML(post?.content), 100) || ""} />
      <meta name="twitter:image" content={post?.cover_image || "/images/blog-placeholder.png"} />
    </Head>

    <div className="min-h-screen bg-white">
      
      {/* Navigation Bar - Manually typed nav links (not variables) */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="relative z-20">
            <BlogNav />
          </div>
      </nav>

      {/* Hero Section with Dummy Image - Using placeholder instead of external URL */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-300">
        <img className="h-full w-full object-cover" src={post?.cover_image || '/images/blog-placeholder.png'} alt="alt" />
      </div>

      {/* Main Content - All text hardcoded as requested (no props) */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#001D69] mb-4 leading-tight">
            {post?.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <time className="font-medium">{ moment(post?.created_at).format('MMMM Do YYYY')}</time>
            <span>•</span>
            <span className="font-medium text-[#0234B8] text-lg">{post?.author?.firstName} {post?.author?.lastName}</span>
          </div>

          
        </div>

        <div>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.content) }}
          />
        </div>

       
        {/* Final Thoughts */}
        <div className="bg-gray-50 rounded-lg p-6 my-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">💭</span>
            Final Thoughts
          </h3>
         <p>
          {post?.final_thought}
         </p>
        </div>

        {/* Share Section */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share article</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center justify-center w-10 h-10 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors duration-200"
              disabled={isSharing}
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>

            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center justify-center w-10 h-10 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors duration-200"
              disabled={isSharing}
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>

            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-colors duration-200"
              disabled={isSharing}
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default BlogPostDetail;

