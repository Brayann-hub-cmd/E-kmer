import React from 'react';
import Footer from '../components/Footer';
import Hero1Blue from '../components/Hero1Blue';


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero1Blue/>
      <Footer />
    </div>
  );
};

export default Home;