import { useState } from "react"
import SideBar from "../Components/Userventes/SideBar"
import StatsCard from "../Components/Userventes/StatsCard"
import ProductCard from "../Components/Userventes/ProductCard"

export default function Userventes() {
  // mock user
const [user] = useState({
    name: "Jean Dupont",
    phone: "+237 6XX XXX XXX",
    achats: 12,
    ventes: 8,
  });

  // mock stats
  const stats = useState({
    revenus: "250 000 FCFA",
    produits: "15",
    ventes: "8",
  });

  // mock produits
  const [products] = useState([
    {id: 2,
      name: "iphone 14 pro",
      price: "450 000 FCFA",
      stock: 3,
      sold: 2,
      status: "Actif",
      image: "/images/product2.jpg",
    },
     {
      id: 2,
      name: "Casque Sony",
      price: "75000 FCFA",
      stock: 5,
      sold: 1,
      status: "Actif",
      image: "/images/product2.jpg",
    },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen flex">

      {/* SideBar */}
      <SideBar user={user} />

      {/* contenu */}
      <div className="flex-1 p-6">

        {/* stats */}
        <StatsCard stats={stats} />

        {/* section header */}
        <div className="flex justify-between items-center mt-6 mb-4">
          <h2 className="text-lg font-semibold">Mes produits de vente</h2>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
            + Publier un produit
          </button>
        </div>

        {/* Liste de produits */}
        <div className="space-y-4">
          {products.length === 0 ? (
            <p className="text-gray-500">Aucun produit pour le moment</p>
          ) : (
            products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          )}
        </div>

      </div>
    </div>
  )
}