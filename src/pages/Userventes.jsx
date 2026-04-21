import SideBar from "../Components/Userventes/SideBar"
import StatsCard from "../Components/Userventes/StatsCard"
import ProductCard from "../Components/Userventes/ProductCard"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
export default function Userventes() {
  const products = [1, 2]; // mock (remplace par API)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(
    () => {
      const getUser = async () => {
        try {
          const response = await api.get(`auth/profile/`)
          setUser(response.data)
        } catch (error) {
          if (error.response?.status === 401) {
            toast.error(error.response.data.error)
          } else {
            toast.error(error.response.data.error)
          }
          localStorage.removeItem('token')
          navigate('/')
        }
      }
      getUser();
    }, []
  )
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex bg-gray-100 min-h-screen">
        {
          user ? (<SideBar user={user} />) : (<SideBar />)
        }

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

           

            <Link to="/publier/" className="rounded hover:bg-orange-600 transition">

          <div className="flex  justify-evenly items-center mb-4">
            <Link to="/publier/" className="transition"/></div>
 
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