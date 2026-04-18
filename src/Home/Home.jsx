import React, { useState } from 'react';
import Footer from '../Components/Footer';
import Hero1Blue from '../components/Hero1Blue';
import PopularOffers from '../components/PopularOffers';
import RecentProduct from '../components/RecentProducts';
import Header from '../components/Header';
import Navbar from '../Components/Navbar';
import SellSection from '../components/SellSection';


const Home = () => {
  const [categorie,setCategorie] = useState("CAT_000")
  const [title,setTitle] = useState("")
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar title={title} setTitle={setTitle} categorie={categorie} setCategorie={setCategorie}/>
      <Header/>
      <PopularOffers title={title} setTitle={setTitle} categorie={categorie} setCategorie={setCategorie}/>
      <Hero1Blue/>
      <RecentProduct/>
      <SellSection />
      <Footer />
    </div>
  );
};

export default Home;