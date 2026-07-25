import { useState } from 'react';
import Footer from '../../components/Footer';
import Hero1Blue from '../../components/Hero1Blue';
import PopularOffers from '../../components/PopularOffers';
import RecentProduct from '../../components/RecentProducts';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Hero2Orange from '../../components/Hero2Orange';
import { useAppContext } from '../../context/AppContext';
import SEO from '../../components/SEO';
const Home = () => {
  const { t } = useAppContext();
  const [categorie, setCategorie] = useState("CAT_000");
  const [title, setTitle] = useState("");

  return (
    <>
      <SEO
        title="Ekmer | Marketplace de commerce électronique"
        description="Achetez, vendez et faites livrer vos produits partout au Cameroun grâce à Ekmer."
      />
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar setTitle={setTitle} setCategorie={setCategorie} />
        <Header />
        <PopularOffers title={title} categorie={categorie} />
        <Hero1Blue />
        <RecentProduct />
        <Hero2Orange />
        <Footer />
      </div>
    </>
  );
};

export default Home;