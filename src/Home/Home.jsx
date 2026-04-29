import React from 'react';
import Footer from '../Components/Footer';
import HeroSection from '../Components/Hero1Blue';
import PopularOffers from '../components/PopularOffers';
import RecentProduct from '../components/RecentProducts';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import SellSection from '../components/SellSection';


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <Header/>
      <PopularOffers/>
      <Hero1Blue/>
      <RecentProduct/>
      <SellSection />
      <Footer />
    </div>
  );
};

export default Home;