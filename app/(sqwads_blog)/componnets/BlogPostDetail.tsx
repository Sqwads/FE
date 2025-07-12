import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BlogPostDetail as BlogPostDetailType } from '../data/blogData';

interface BlogPostDetailProps {
  blogPost: BlogPostDetailType;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ blogPost }) => { // Destructure blogPost here
  const [isSharing, setIsSharing] = useState(false);

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

  const handleShare = (platform: string) => {
    setIsSharing(true);
    const url = window.location.href;
    const title = blogPost.title; 
    // ... rest of your handleShare logic
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title )}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url )}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url )}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={blogPost.image} 
          alt={blogPost.title} 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {blogPost.title} 
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <time className="font-medium">{blogPost.date}</time> 
            <span>•</span>
            <span className="font-medium">{blogPost.author}</span> 
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            {blogPost.description} 
          </p>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {blogPost.content.sections.map((section, index) => ( 
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>

              <div className="text-gray-700 leading-relaxed mb-4">
                {section.content.split('\n').map((paragraph, pIndex) => (
                  paragraph.trim() && (
                    <p key={pIndex} className="mb-4">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>

              {section.points && (
                <ul className="list-none space-y-2 ml-4 mb-6">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <span className="text-[#001D69] mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        {/* Final Thoughts */}
        <div className="bg-gray-50 rounded-lg p-6 my-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">💭</span>
            Final Thoughts
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Getting hired isn't just about showing that you can do the work—it's about showing that you've
            done the work. That's the magic of a strong portfolio.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            With every Sqwads project you complete, you're building more than just experience—you're
            building stories, proof, and momentum.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            So go ahead. Open that doc. Polish those pages. Your future employer might be just one click away.
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

        {/* Related Topics */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPost.relatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#001D69] transition-colors duration-200">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
