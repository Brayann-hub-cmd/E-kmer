import SideBar from "../components/Userventes/SideBar"
import StatsCard from "../components/Userventes/StatsCard"
import ProductCard from "../components/Userventes/ProductCard"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../Components/Footer";

export default function Userventes() {
  const products = [1, 2]; // mock (remplace par API)

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex bg-gray-100 min-h-screen">
        <SideBar />

        <div className="flex-1 p-6">
          {/* STATS */}
          <div className="bg-green-500 text-white rounded-2xl p-6 flex justify-between mb-6 shadow">
            <StatsCard title="Revenus totaux" value="250 000 FCFA" />
            <StatsCard title="Produit actifs" value="15" />
            <StatsCard title="Ventes réalisées" value="8" />
          </div>

          {/* HEADER */}
          <div className="flex  justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Mes produits de vente</h2>

            {/* section header */}

           

            <Link to="/publier" className="rounded hover:bg-orange-600 transition">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
                + Publier un produit
              </button>
            </Link>

          </div>
          {/* LIST */}
          <div className="space-y-4">
            {products.map((_, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}