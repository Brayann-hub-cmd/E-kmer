// src/pages/MesFavoris.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import api from "../../api";
import toast from "react-hot-toast";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

// ── Carte favori ──────────────────────────────────────────────
const FavoriCard = ({ produit, onAcheter }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
    {/* Image */}
    <div className="relative">
      <img
        src={produit.image || "/placeholder.webp"}
        alt={produit.titre}
        className="w-full h-44 object-cover"
      />
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
  const [user, setUser] = useState(null);
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        const userResponse = await api.get("auth/profile/");
        setUser(userResponse.data);

        // TODO: remplacer par l'appel API réel → GET /api/favoris/
        // Les produits sont récupérés depuis l'API des favoris
        const favorisResponse = await api.get("favoris/");
        setFavoris(favorisResponse.data);
      } catch (error) {
        console.error("Erreur chargement favoris:", error);
        toast.error("Erreur de chargement des favoris");
        // Données mock en attendant l'API
        setFavoris([
          { id: 1, titre: "Casque Sony", image: "/casque.webp", prix: 15000 },
          { id: 2, titre: "Jacket en cuir", image: "/jacket.webp", prix: 35000 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoris();
  }, []);

  const handleAcheter = (id) => navigate(`/produit/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="favoris" />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-4 sm:p-6">

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes favoris</h1>

          {favoris.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <FaHeart className="text-gray-300 text-5xl mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Vous n'avez pas encore de favoris.</p>
              <p className="text-gray-400 text-sm mt-2">
                Ajoutez des produits en favoris en cliquant sur le ❤️ sur les produits qui vous intéressent.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {favoris.map((produit) => (
                <FavoriCard
                  key={produit.id}
                  produit={produit}
                  onAcheter={handleAcheter}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}