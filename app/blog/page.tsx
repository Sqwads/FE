"use client";

import React, { useEffect, useState } from 'react';
import BlogNav from './componnets/Navbar';
import Footer from './componnets/Footer';
import BlogHero from './componnets/Hero';
import BlogGrid from './componnets/BlogGrid';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import BlogCard from './componnets/BlogCard';
import { extractPlainTextFromHTML, generateSlug, trimSentence } from '@/common';
import moment from 'moment';

const Page = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [allBlogs, setAllBlogs] = useState<any[]>([])

  const {data: response, isPending} = useQuery({
    queryFn: () => instance.get('/blog/all', {
       params:{
          page: currentPage,
          limit: pageSize,
        }
    }),
    queryKey: ['blogPosts', currentPage, pageSize],
    
  })

  useEffect(()=>{
    if (Array.isArray(response?.data?.data?.blogs)) {
      setAllBlogs([...allBlogs, ...response?.data?.data?.blogs]);
    }
  }, [currentPage, response?.data?.data?.blogs])

  const totalPages = Math.ceil(response?.data?.data?.total/pageSize)

  const handleNext = ()=>{
    if(currentPage+1 <= totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  const handlePrev = ()=>{
    if(currentPage-1 > 0){
        setCurrentPage(currentPage-1)
    }
  }



  return (
    <>
      <div 
        className="relative"
        style={{
          height:'70vh',
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
        
        <div className="relative z-10 pt-4 lg:pt-7 px-2 md:px-5 lg:px-14">

          <div className="relative z-20">
            <BlogNav textColor="text-white" /> 
            
          </div>
          
          <div className="relative z-10">
            <BlogHero />
          </div>
        </div>
      </div>

      <section className="py-16 px-4 md:px-6 lg:px-14 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {response?.data?.data?.blogs?.map((post:any) => (
                <BlogCard
                  key={post?._id}
                  image={post?.cover_image || '/images/blog-placeholder.png'}
                  title={post?.title}
                  description={trimSentence(extractPlainTextFromHTML(post.content), 100)}
                  date={moment(post?.created_at as string ).format('MMMM Do YYYY')}
                  slug={`${generateSlug(post?.title)}-${post._id}`}
                  imageAlt={post?.title}
                />
              ))}

              
            </div>
            {isPending &&
                <div>
                  <div className="animate-spin mx-auto rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                </div>
              }
            
            {/* View More Button */}
            <div className="flex justify-center mt-12">
            
                <button
                  onClick={handlePrev}
                  disabled={isPending || currentPage <= 1}
                  className="bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl mr-4"
                >
                  Back
                </button>
              
                           
              <button 
                className="bg-[#001D69]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleNext}
                disabled={isPending || currentPage >= totalPages}
              >
                View more
              </button>

            </div>
          </div>
      </section>

      <Footer />
    </>
  );
}

export default Page;

