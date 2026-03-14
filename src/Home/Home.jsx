import React from 'react';
import Footer from '../components/Footer';
import Hero1Blue from '../components/Hero1Blue';
import PopularOffers from '../components/PopularOffers';
import RecentProduct from '../components/RecentProducts';


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PopularOffers/>
      <Hero1Blue/>
      <RecentProduct/>
      <Footer />
    </div>
  );
};

export default Home;