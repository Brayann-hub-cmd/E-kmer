import { useState } from 'react';
import Footer from '../../Components/Footer';
import Hero1Blue from '../../Components/Hero1Blue';
import PopularOffers from '../../components/PopularOffers';
import RecentProduct from '../../components/RecentProducts';
import Header from '../../Components/Header';
import Navbar from '../../Components/Navbar';
import Hero2Orange from '../../components/Hero2Orange';

const Home = () => {
  const [categorie, setCategorie] = useState("CAT_000")
  const [title, setTitle] = useState("")
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setTitle={setTitle} setCategorie={setCategorie} />
      <Header />
      <PopularOffers title={title} categorie={categorie} />
      <Hero1Blue />
      <RecentProduct />
      <Hero2Orange />
      <Footer />
    </div>
  );
};


export default Home;