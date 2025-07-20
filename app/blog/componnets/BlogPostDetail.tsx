import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BlogPostDetail = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (platform: string) => {
    setIsSharing(true);
    const url = window.location.href;
    const title = "Building a Portfolio that gets you hired";
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar - Manually typed nav links (not variables) */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Using Next.js Image component */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/sqwads-logo.png"
                  alt="SOWADS"
                  width={160}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Links - Manually typed as requested */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/about" className="text-gray-700 hover:text-[#001D69] px-3 py-2 text-sm font-medium">
                  About Us
                </Link>
                <Link href="/how-it-works" className="text-[#16181B] hover:text-[#001D69] px-3 py-2 text-sm font-medium">
                  How It Works
                </Link>
                <Link href="/mentor" className="text-[#16181B] hover:text-[#001D69] px-3 py-2 text-sm font-medium">
                  Mentor
                </Link>
                <Link href="/blog" className="text-[#16181B] hover:text-[#001D69] px-3 py-2 text-sm font-medium">
                  Blog
                </Link>
                <Link href="/business" className="text-[#16181B] hover:text-[#001D69] px-3 py-2 text-sm font-medium">
                  Business
                </Link>
              </div>
            </div>

            {/* Get Started Button */}
            <div className="hidden md:block">
              <Link href="/get-started">
                <button className="bg-[#5483FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#002080] transition-colors">
                  Get Started for free
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-[#001D69] p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Dummy Image - Using placeholder instead of external URL */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">Dummy Blog Image Placeholder</p>
            <p className="text-gray-500 text-xs mt-1">Replace with actual image when integrating API</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Content - All text hardcoded as requested (no props) */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001D69] mb-4 leading-tight">
            Building a Portfolio that gets you hired
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <time className="font-medium">May 24, 2026</time>
            <span>•</span>
            <span className="font-medium text-[#0234B8] text-[24px]">Admin Sqwads</span>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            Your portfolio isn't just a digital resume; it's proof. Proof that you've learned, built, collaborated, 
            and delivered. And in the tech world, it often speaks louder than your degree, your certifications 
            —or even your job history. But here's the catch: not all portfolios are created equal. At Sqwads, we've 
            seen first-hand how real-world experience can transform a portfolio from a list of personal side 
            projects into a powerful, job-winning tool. Here's how to build one that gets noticed—and gets 
            you hired.
          </p>
        </div>

        {/* Article Content - All hardcoded */}
        <article className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Show, Don't Just Tell
            </h2>

            <div className="text-gray-700 leading-relaxed mb-4">
              <p className="mb-4">
                Anyone can say they "built a website" or "collaborated on a team." But recruiters and hiring 
                managers want receipts.
              </p>
            </div>

            <ul className="list-none space-y-2 ml-4 mb-6">
              <li className="flex items-start">
                <span className="text-[#001D69] mr-2 mt-1">✓</span>
                <span className="text-gray-700">Add live project links</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#001D69] mr-2 mt-1">✓</span>
                <span className="text-gray-700">Include screenshots or screen recordings</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#001D69] mr-2 mt-1">✓</span>
                <span className="text-gray-700">Highlight your specific contributions (e.g. "I handled mobile responsiveness and animation logic using TailwindCSS and Framer Motion.")</span>
              </li>
            </ul>

            <div className="text-gray-700 leading-relaxed mb-4">
              <p className="mb-4">
                If you worked on a Sqwads team, show off the real project you contributed to—and explain what 
                you brought to the table.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Context Is King
            </h2>

            <div className="text-gray-700 leading-relaxed mb-4">
              <p className="mb-4">
                Don't just show what you built—tell us why and how.
              </p>
              <p className="mb-4">
                What problem was the project solving? Who were the users? How did your team approach the 
                solution? What tools or frameworks did you choose and why?
              </p>
              <p className="mb-4">
                This turns a project into a case study, which is exactly what employers love to see.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Embrace the Power of Collaboration
            </h2>

            <div className="text-gray-700 leading-relaxed mb-4">
              <p className="mb-4">
                Solo projects are great. But in the real world, tech is a team sport.
              </p>
              <p className="mb-4">
                If you've completed projects on Sqwads with others, highlight that! Talk about how you worked 
                with cross-functional teammates. Mention the tools you used for collaboration. Discuss how 
                you handled feedback, resolved conflicts, or adapted to changing requirements.
              </p>
              <p className="mb-4">
                Employers want to know you can work well with others—and that's a skill you can't fake.
              </p>
            </div>
          </div>
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

        {/* Related Topics - Hardcoded dummy content */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/portfolio-tips" className="group">
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative w-full h-40 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Portfolio Tips Image</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#001D69] transition-colors duration-200">
                    10 Essential Portfolio Tips for Developers
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Learn the key strategies to make your portfolio stand out from the competition.
                  </p>
                </div>
              </article>
            </Link>

            <Link href="/blog/job-search" className="group">
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative w-full h-40 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Job Search Image</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#001D69] transition-colors duration-200">
                    How to Land Your First Tech Job
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    A comprehensive guide to breaking into the tech industry successfully.
                  </p>
                </div>
              </article>
            </Link>

            <Link href="/blog/collaboration" className="group">
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative w-full h-40 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Collaboration Image</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#001D69] transition-colors duration-200">
                    The Power of Team Collaboration
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Why working with others makes you a better developer and how to showcase it.
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;

