// src/pages/MesAchats.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import api from "../../api";
import toast from "react-hot-toast";
import { FaCheckCircle, FaClock, FaTruck, FaTimesCircle } from "react-icons/fa";
const LINK = import.meta.env.VITE_API_URL

// ── Badge statut ──────────────────────────────────────────────
const StatutBadge = ({ statut }) => {
  const config = {
    livre: { label: "Livré", icon: <FaCheckCircle />, bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
    en_cours: { label: "En cours", icon: <FaTruck />, bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
    attente: { label: "En attente", icon: <FaClock />, bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
    annule: { label: "Annulé", icon: <FaTimesCircle />, bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  };
  const c = config[statut] || config.attente;
  return (
    <span className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${c.bg} ${c.text} ${c.border}`}>
      {c.icon} {c.label}
    </span>
  );
};

// ── Carte achat ───────────────────────────────────────────────
const AchatCard = ({ achat, onVoirDetails }) => (
  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100">
    {/* Layout responsive : colonne sur mobile, ligne sur desktop */}
    {achat.lignes.map((ligne) => {
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">

        {/* Image */}
        <div className="w-full sm:w-auto flex-shrink-0">
          <img
            src={achat.image || "/placeholder.webp"}
            alt={achat.titre}
            className="w-full sm:w-36 h-32 object-cover rounded-xl"
          />
        </div>

        {/* Infos principales */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900">{ligne.annonce_titre}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Commande le {achat.date}</p>
            </div>
            <div className="self-start sm:self-auto">
              <StatutBadge statut={achat.statut} />
            </div>
          </div>
          <p className="text-orange-500 font-bold text-xl sm:text-2xl mt-2 sm:mt-3">
            {(achat.prix_total ?? 0).toLocaleString()} FCFA
          </p>
        </div>

        {/* Bouton */}
        <div className="w-full sm:w-auto">
          <button
            onClick={() => onVoirDetails(achat.id)}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Voir les détails
          </button>
        </div>
      </div>
    })}
  </div>
);

//  Page principale 
export default function MesAchats() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [achats, setAchats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("auth/profile/");
        setUser(response.data);

        const productsRes = await api.get("achats/");
        setAchats(productsRes.data);
      } catch (error) {
        console.error("Erreur:", error);
        setUser({ username: "Jean Dupont", telephone: "+237 6XX XXX XXX" });
      } finally {
        setLoading(false);
      }
    };
    getUser();
    console.log(achats)
  }, []);

  const handleVoirDetails = (id) => navigate(`/produit/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Layout responsive : colonne sur mobile, ligne sur desktop */}
      <div className="flex flex-col md:flex-row">

        {/* Sidebar - pleine largeur sur mobile, fixe sur desktop */}
        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="achats" />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Mes achats
          </h1>

          {achats.length === 0 ? (
            <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-sm">
              <p className="text-gray-400 text-base sm:text-lg">
                Vous n'avez pas encore effectué d'achats.
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {achats.map((achat) => (
                <AchatCard key={achat.code} achat={achat} onVoirDetails={handleVoirDetails} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
