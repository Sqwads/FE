import Hero from "@/app/components/home/Hero";
import How from "@/app/components/home/How";
import Learn from "@/app/components/home/Learn";
import Mentor from "@/app/components/home/Mentor";
import Navbar from "@/app/components/home/Navbar";
import Value from "@/app/components/home/Value";
import ShowCase from "@/app/components/home/ShowCase";
import Stories from "@/app/components/home/Stories";
import Join from "@/app/components/home/Join";
import Browse from "@/app/components/home/Browse";
import Footer from "@/app/components/Footer"; // Import Footer component

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
