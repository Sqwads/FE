import React from 'react';
import BlogNav from '../componnets/Navbar';
import Footer from '../componnets/Footer';
import BlogHero from '../componnets/Hero';
import BlogGrid from '../componnets/BlogGrid';

const page = () => {
  return (
    <>
      {/* Hero Section with background extending behind navbar */}
      <div 
        className="relative min-h-screen"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(0, 20, 34, 0.8) 0%, rgba(45, 92, 126, 0.6) 70%, rgba(0, 0, 0, 0.4) 100%),
            url("/images/blog_bg.png")
          `,
          backgroundSize: 'cover, cover',
          backgroundPosition: 'center, center right',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundBlendMode: 'normal, screen'
        }}
      >
        {/* Secondary gradient overlay for the blue gradient effect */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 20, 34, 0.4) 0%, rgba(45, 92, 126, 0.3) 50%, transparent 100%),
              url("/images/blend_bg.png")
            `,
            backgroundSize: 'cover, cover',
            backgroundPosition: 'center, center left',
            backgroundRepeat: 'no-repeat, no-repeat',
            mixBlendMode: 'color-dodge',
            opacity: 0.7
          }}
        ></div>
        
        {/* Content with relative positioning to stay above background */}
        <div className="relative z-10 pt-4 lg:pt-7 px-2 md:px-5 lg:px-14">
          {/* Navbar with transparent background to show hero background */}
          <div className="relative z-20">
            <BlogNav />
          </div>
          
          {/* Hero section without its own background since it's now inherited */}
          <div className="relative z-10">
            <BlogHero />
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <BlogGrid />

      <Footer />
    </>
  );
}

export default page;

