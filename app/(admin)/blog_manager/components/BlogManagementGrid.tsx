import React from 'react';
import AdminBlogCard from './AdminBlogCard';

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
}

const BlogManagementGrid: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      slug: "skills-tech-recruiters-look-for",
      title: "5 Skills Tech Recruiters Actually Look For",
      description: "It's more than just your portfolio. Learn what soft and hard skills truly set tech candidates apart...",
      date: "May 24, 2025",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center",
      author: "Sqwads Team",
      status: "published"
    },
    {
      id: 2,
      slug: "jane-journey-through-sqwads",
      title: "From Novice to Notable: Jane's Journey Through Sqwads",
      description: "Discover how Jane, a budding frontend developer, landed her first freelancing gig after completing two...",
      date: "May 23, 2025",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
      author: "Sqwads Team",
      status: "published"
    },
    {
      id: 3,
      slug: "building-portfolio-that-gets-hired",
      title: "Building a Portfolio That Gets You Hired",
      description: "Discover how Jane, a budding frontend developer, landed her first freelancing gig after completing two...",
      date: "May 22, 2025",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&crop=center",
      author: "Sqwads Team",
      status: "published"
    },
    {
      id: 4,
      slug: "meet-tunde-graphic-designer",
      title: "Meet Tunde: From Graphic Designer to No-Code Builder",
      description: "Discover how Jane, a budding frontend developer, landed her first freelancing gig after completing two...",
      date: "May 21, 2025",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center",
      author: "Sqwads Team",
      status: "published"
    },
    {
      id: 5,
      slug: "skills-tech-recruiters-look-for-2",
      title: "5 Skills Tech Recruiters Actually Look For",
      description: "It's more than just your portfolio. Learn what soft and hard skills truly set tech candidates apart...",
      date: "May 20, 2025",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center",
      author: "Sqwads Team",
      status: "published"
    },
    {
      id: 6,
      slug: "jane-journey-through-sqwads-2",
      title: "From Novice to Notable: Jane's Journey Through Sqwads",
      description: "Discover how Jane, a budding frontend developer, landed her first freelancing gig after completing two...",
      date: "May 19, 2025",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
      author: "Sqwads Team",
      status: "published"
    },
    {
      id: 7,
      slug: "building-portfolio-that-gets-hired-2",
      title: "Building a Portfolio That Gets You Hired",
      description: "Discover how Jane, a budding frontend developer, landed her first freelancing gig after completing two...",
      date: "May 18, 2025",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&crop=center",
      author: "Sqwads Team",
      status: "published"
    },
    {
      id: 8,
      slug: "meet-tunde-graphic-designer-2",
      title: "Meet Tunde: From Graphic Designer to No-Code Builder",
      description: "Discover how Jane, a budding frontend developer, landed her first freelancing gig after completing two...",
      date: "May 17, 2025",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center",
      author: "Sqwads Team",
      status: "published"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {blogPosts.map((post) => (
        <AdminBlogCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default BlogManagementGrid;