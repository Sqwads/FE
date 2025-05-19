import React from 'react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/Footer';
import MentorDashboard from './componenets/Mentor_dash';
import WhyMentorSection from './componenets/WhyMentor';
import HowItWorksSection from './componenets/How_Mentor';
import FinalCTASection from './componenets/Wish';

const page = () => {
  return (
    <>
      <div
      className="hero-bg  pt-4 lg:pt-7 px-2 md:px-5 lg:px-14"
      // style={{ backgroundImage: 'url("/images/hero.png")', backgroundSize:'cover', backgroundPosition:'center' }}
    >
      <Navbar />
      <MentorDashboard />
    </div>

    <WhyMentorSection />
    <HowItWorksSection />
    <FinalCTASection />

    <Footer />
    </>
   
  );
}

export default page;
