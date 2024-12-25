import React from 'react'
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import ProcessSection from '../components/ProcessSection';
import Categories from '../components/Categories';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <Categories/>
      <FaqSection/>
      <Footer/>
    </div>
  )
}

export default Home