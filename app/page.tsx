import Hero from "@/components/home/Hero";
import How from "@/components/home/How";
import Learn from "@/components/home/Learn";
import Mentor from "@/components/home/Mentor";
import Navbar from "@/components/home/Navbar";
import Value from "@/components/home/Value";
import ShowCase from "@/components/home/ShowCase";
import Stories from "@/components/home/Stories";
import Join from "@/components/home/Join";
import Browse from "@/components/home/Browse";
import Footer from "@/components/Footer"; // Import Footer component

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="hero-bg min-h-screen py-4 lg:py-7 px-2 md:px-5 lg:px-14"
        style={{ backgroundImage: 'url("/images/Sqwads-bg.svg")' }}
      >
        <Navbar />
        <Hero />
      </div>
      
      {/* Content Sections */}
      <Value />
      <How />
      <Learn />
      <div>
        <Mentor />
      </div>
      <ShowCase />
      <Stories />
      <Join />
      <Browse />
      
      {/* Footer */}
      <Footer />
    </>
  );
}
