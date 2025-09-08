import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DOMPurify from 'dompurify';
import BlogNav from "./Navbar";
import Head from "next/head";
import { extractPlainTextFromHTML, generateSlug, trimSentence } from "@/common";

// Import react-share components
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

const BlogPostDetail = ({post}:any) => {
  const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const postUrl = `${baseUrl}/blog/${generateSlug(post?.title)}-${post._id}`;
  const title = post?.title || "";
  const description = trimSentence(extractPlainTextFromHTML(post?.content), 100) || "Blog post";
  const imageUrl = post?.cover_image || "/images/blog-placeholder.png";

  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={postUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>

    <div className="min-h-screen bg-white">
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="relative z-20">
            <BlogNav />
          </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-300 rounded-lg">
          <img className="h-full w-full object-cover" src={imageUrl} alt={title} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#001D69] mb-4 leading-tight">
            {title}
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

        {/* Share Section using react-share */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share article</h3>
          <div className="flex gap-4">
            <FacebookShareButton
              url={postUrl}
              // quote={title}
              hashtag="#sqwads"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={postUrl}
              title={title}
              hashtags={['sqwads']}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            <LinkedinShareButton
              url={postUrl}
              title={title}
              summary={description}
              source="Sqwads"
            >
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default BlogPostDetail;