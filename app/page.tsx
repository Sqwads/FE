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
import Footer from "@/app/components/Footer";
import Core from "./components/home/Core";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="hero-bg  pt-4 lg:pt-7 px-2 md:px-5 lg:px-14"
        style={{ backgroundImage: 'url("/images/hero.png")', backgroundSize:'cover', backgroundPosition:'center' }}
      >
        <Navbar />
        <Hero />
      </div>

      {/* Content Sections */}
      <Value />
      <Core />
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
