"use client";

import moment from "moment";
import DOMPurify from "dompurify";
import BlogNav from "./Navbar";
import { FaFacebook, FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FiLink, FiCheck } from "react-icons/fi";
import { generateSlug } from "@/common";
import { useState } from "react";

// ─── Platform share URL builders ─────────────────────────────────────────────
function buildShareUrl(
  platform: "facebook" | "twitter" | "linkedin" | "whatsapp",
  postUrl: string,
  title: string
) {
  const encoded = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);
  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}&hashtags=sqwads`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
    case "whatsapp":
      return `https://api.whatsapp.com/send?text=${encodedTitle}%20${encoded}`;
  }
}

const platformConfig = [
  { key: "facebook" as const, label: "Facebook", Icon: FaFacebook, color: "#1877F2", bg: "hover:bg-[#1877F2]" },
  { key: "twitter" as const, label: "X (Twitter)", Icon: FaXTwitter, color: "#000000", bg: "hover:bg-black" },
  { key: "linkedin" as const, label: "LinkedIn", Icon: FaLinkedinIn, color: "#0A66C2", bg: "hover:bg-[#0A66C2]" },
  { key: "whatsapp" as const, label: "WhatsApp", Icon: FaWhatsapp, color: "#25D366", bg: "hover:bg-[#25D366]" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const BlogPostDetail = ({ post }: any) => {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const postUrl = `${baseUrl}/blog/${generateSlug(post?.title)}-${post._id}`;
  const title = post?.title || "";
  const imageUrl = post?.cover_image || "/images/blog-placeholder.png";

  const handleShare = (platform: "facebook" | "twitter" | "linkedin" | "whatsapp") => {
    if (platform === "linkedin") {
      const encoded = encodeURIComponent(postUrl);
      const encodedTitle = encodeURIComponent(title);
      // Try to open the LinkedIn app via deep link
      const appDeepLink = `linkedin://shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`;
      const webFallback = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
      window.location.href = appDeepLink;
      // If the app isn't installed, the browser stays on this page — fall back to web after 600ms
      setTimeout(() => {
        window.open(webFallback, "_blank", "noopener,noreferrer,width=600,height=500");
      }, 600);
      return;
    }
    const url = buildShareUrl(platform, postUrl, title);
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="relative z-20">
          <BlogNav />
        </div>
      </nav>

      {/* Hero Image */}
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
            <time className="font-medium">
              {moment(post?.created_at).format("MMMM Do YYYY")}
            </time>
            <span>•</span>
            <span className="font-medium text-[#0234B8] text-lg">
              {post?.author?.firstName} {post?.author?.lastName}
            </span>
          </div>
        </div>

        {/* Body */}
        <div>
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html:
                typeof window !== "undefined"
                  ? DOMPurify.sanitize(post?.content || "")
                  : post?.content || "",
            }}
          />
        </div>

        {/* Final Thoughts */}
        <div className="bg-gray-50 rounded-lg p-6 my-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">💭</span>
            Final Thoughts
          </h3>
          <p>{post?.final_thought}</p>
        </div>

        {/* Share Section */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">Share this article</h3>

          <div className="flex flex-wrap items-center gap-3">
            {platformConfig.map(({ key, label, Icon, color, bg }) => (
              <button
                key={key}
                onClick={() => handleShare(key)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-medium transition-all duration-200 ${bg} hover:text-white hover:border-transparent`}
              >
                <Icon className="w-5 h-5 transition-colors duration-200" style={{ color }} />
                {label}
              </button>
            ))}

            {/* Copy link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-medium transition-all duration-200 hover:bg-gray-100"
            >
              {copied ? (
                <>
                  <FiCheck className="w-5 h-5 text-green-500" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <FiLink className="w-5 h-5" />
                  Copy link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;