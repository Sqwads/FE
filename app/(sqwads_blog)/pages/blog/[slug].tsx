import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import BlogPostDetail from '../../componnets/BlogPostDetail';
import Navbar from '../../componnets/Navbar';
import Footer from '../../componnets/Footer';
import { getAllBlogSlugs, getBlogPostBySlug, BlogPostDetail as BlogPostDetailType } from '../../data/blogData';
import Link from 'next/link';

interface BlogPostPageProps {
  blogPost: BlogPostDetailType; // This is the key change here
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ blogPost }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#001D69] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) { // This check is a safeguard, though notFound: true should prevent this
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
      <Navbar />
      <main>
        <BlogPostDetail blogPost={blogPost} /> {/* Pass the full blogPost object here */}
      </main>
      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllBlogSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug }
  }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const blogPost = getBlogPostBySlug(slug);

  if (!blogPost) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      blogPost, // Pass the fetched blogPost object
    },
    revalidate: 3600
  };
};

export default BlogPostPage;
