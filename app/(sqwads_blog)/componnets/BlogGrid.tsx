import BlogCard from './BlogCard';
// import { blogPosts } from '../data/blogData';
import { blogPosts } from '../data/blogData';

const BlogGrid: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-14 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              title={post.title}
              description={post.description}
              date={post.date}
              slug={post.slug}
              imageAlt={post.title}
            />
          ))}
        </div>
        
        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#94B1FD] hover:bg-[#001D69]/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            View more
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;

