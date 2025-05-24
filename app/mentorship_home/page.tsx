import React from 'react';
// import Navbar from './componenets';
import Footer from '../components/Footer';
import MentorDashboard from './componenets/Mentor_dash';
import WhyMentorSection from './componenets/WhyMentor';
import HowItWorksSection from './componenets/How_Mentor';
import FinalCTASection from './componenets/Wish';
import MentorNav from './componenets/Navbar';

const page = () => {
  return (
    <>
      <div
      className="pt-4 lg:pt-7 px-2 md:px-5 lg:px-14"
      style={{ backgroundImage: 'url("/images/vector_bg.png")', backgroundSize:'cover', backgroundPosition:'center' }}
    >
      <MentorNav />
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
