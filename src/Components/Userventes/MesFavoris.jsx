// src/pages/MesFavoris.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import api from "../../api";
import toast from "react-hot-toast";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

// ── Carte favori ──────────────────────────────────────────────
const FavoriCard = ({ produit, onAcheter, onRetirer }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
    {/* Image */}
    <div className="relative">
      <img
        src={produit.image || "/placeholder.webp"}
        alt={produit.titre}
        className="w-full h-44 object-cover"
      />
      {/* Bouton retirer favori */}
      <button
        onClick={() => onRetirer(produit.id)}
        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors"
        title="Retirer des favoris"
      >
        <FaHeart className="text-red-500 text-sm" />
      </button>
    </div>

    {/* Infos */}
    <div className="p-4 flex flex-col gap-3">
      <div>
        <p className="text-orange-500 font-bold text-lg">{produit.prix.toLocaleString()} FCFA</p>
        <p className="text-gray-700 font-medium text-sm mt-0.5">{produit.titre}</p>
      </div>
      <button
        onClick={() => onAcheter(produit.id)}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <FaShoppingCart /> Acheter
      </button>
    </div>
  </div>
);

// ── Page principale ───────────────────────────────────────────
export default function MesFavoris() {
  const [user, setUser]       = useState(null);
  const [favoris, setFavoris] = useState([
    // TODO: remplacer par l'appel API → GET /api/favoris/
    { id: 1, titre: "Casque Sony", image: "/casque.webp",  prix: 15000 },
    { id: 2, titre: "Casque Sony", image: "/casque.webp",  prix: 15000 },
    { id: 3, titre: "Casque Sony", image: "/casque.webp",  prix: 15000 },
    { id: 4, titre: "Casque Sony", image: "/casque.webp",  prix: 15000 },
    { id: 5, titre: "Casque Sony", image: "/casque.webp",  prix: 15000 },
    { id: 6, titre: "Casque Sony", image: "/casque.webp",  prix: 15000 },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("auth/profile/");
        setUser(response.data);
      } catch (error) {
        toast.error(error.response?.data?.error || "Erreur de chargement");
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    getUser();
  }, []);

  const handleAcheter = (id) => navigate(`/produit/${id}`);

  const handleRetirer = (id) => {
    // TODO: appel API → DELETE /api/favoris/{id}/
    setFavoris((prev) => prev.filter((p) => p.id !== id));
    toast.success("Retiré des favoris");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex bg-gray-100 min-h-screen">
        {user ? <SideBar user={user} activeTab="favoris" /> : <SideBar activeTab="favoris" />}

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes favoris</h1>

          {favoris.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <FaHeart className="text-gray-300 text-5xl mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Vous n'avez pas encore de favoris.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {favoris.map((produit) => (
                <FavoriCard
                  key={produit.id}
                  produit={produit}
                  onAcheter={handleAcheter}
                  onRetirer={handleRetirer}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
