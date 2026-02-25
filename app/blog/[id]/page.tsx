import { Metadata } from "next";
import BlogPostDetail from '../componnets/BlogPostDetail';
import Footer from '../componnets/Footer';
import Link from 'next/link';
import { generateSlug } from "@/common";

/** Server-safe HTML → plain text (no DOM needed) */
function stripHtml(html: string): string {
  return html?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || "";
}

function trimTo(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).replace(/\s+\S*$/, "") + "…";
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API || process.env.API_BASE_URL;
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://sqwads.com";

async function getBlogPost(blogId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/blog/${blogId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

function extractIdFromSlug(slug: string): string {
  const parts = slug.split("-");
  return parts[parts.length - 1];
}

// ─── Generate OG / Twitter Card meta tags server-side ─────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blogId = extractIdFromSlug(id);
  const post = await getBlogPost(blogId);

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  const title = post.title || "Sqwads Blog";
  const description =
    trimTo(stripHtml(post.content), 160) ||
    "Read this article on Sqwads.";
  const imageUrl =
    post.cover_image?.startsWith("http")
      ? post.cover_image
      : `${CLIENT_URL}${post.cover_image || "/images/blog-placeholder.png"}`;
  const postUrl = `${CLIENT_URL}/blog/${generateSlug(post.title)}-${post._id}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: postUrl,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// ─── Page (Server Component) ───────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogId = extractIdFromSlug(id);
  const post = await getBlogPost(blogId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog post not found
          </h1>
          <Link href="/blog" className="text-[#001D69] hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        <BlogPostDetail post={post} />
      </main>
      <Footer />
    </div>
  );
}
