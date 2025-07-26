import Image from "next/image";
import Link from "next/link";

// Define the prop types interface
interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  imageAlt?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  image, 
  title, 
  description, 
  date, 
  slug,
  imageAlt = "Blog post image"
}) => {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-[24px] font-semibold text-[#001D69] mb-3 line-clamp-2 group-hover:text-[#001D69] transition-colors duration-300">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {description}
          </p>
          
          {/* Date */}
          <div className="mt-auto">
            <time className="text-xs text-gray-500 font-medium">
              {date}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;

