// src/pages/MesAchats.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import api from "../../api";
import toast from "react-hot-toast";
import { FaCheckCircle, FaClock, FaTruck, FaTimesCircle } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../T"; // ← IMPORT

// ── Badge statut ──────────────────────────────────────────────
const StatutBadge = ({ statut }) => {
  const { t } = useAppContext(); // ← Récupère les traductions
  
  const config = {
    livre: { 
      label: t.livre || "Livré", 
      icon: <FaCheckCircle />, 
      bg: "bg-green-100 dark:bg-green-900", 
      text: "text-green-700 dark:text-green-300", 
      border: "border-green-200 dark:border-green-800" 
    },
    en_cours: { 
      label: t.enCours || "En cours", 
      icon: <FaTruck />, 
      bg: "bg-blue-100 dark:bg-blue-900", 
      text: "text-blue-700 dark:text-blue-300", 
      border: "border-blue-200 dark:border-blue-800" 
    },
    attente: { 
      label: t.attente || "En attente", 
      icon: <FaClock />, 
      bg: "bg-yellow-100 dark:bg-yellow-900", 
      text: "text-yellow-700 dark:text-yellow-300", 
      border: "border-yellow-200 dark:border-yellow-800" 
    },
    annule: { 
      label: t.annule || "Annulé", 
      icon: <FaTimesCircle />, 
      bg: "bg-red-100 dark:bg-red-900", 
      text: "text-red-700 dark:text-red-300", 
      border: "border-red-200 dark:border-red-800" 
    },
  };
  const c = config[statut] || config.en_cours;
  return (
    <span className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${c.bg} ${c.text} ${c.border}`}>
      {c.icon} {c.label}
    </span>
  );
};

// ── Carte achat ───────────────────────────────────────────────
const AchatCard = ({ achat, onVoirDetails, date }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">

        {/* Infos principales */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div>
              <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-0.5">
                <T>orderDate</T> {date}
              </p>
            </div>
          </div>
          <p className="text-orange-500 font-bold text-xl sm:text-2xl mt-2 sm:mt-3">
            {(achat.prix_total ?? 0).toLocaleString()} FCFA
          </p>
        </div>

        {/* Liste des produits */}
        <div className="flex flex-col gap-2 mb-4 w-full">
          {achat.lignes?.map((ligne) => (
            <div key={ligne.id} className="flex flex-row items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 transition-colors duration-300">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">{ligne.annonce_titre}</h3>
                <p className="text-gray-400 dark:text-gray-400 text-xs mt-0.5">
                  <T>quantityOrdered</T> {ligne.quantite}
                </p>
                <p className="text-gray-400 dark:text-gray-400 text-xs mt-0.5">
                  <T>unitPrice</T> {ligne.prix_unitaire?.toLocaleString()} FCFA
                </p>
              </div>
              <p className="text-orange-500 font-semibold text-sm flex-shrink-0">
                {(ligne.quantite * ligne.prix_unitaire).toLocaleString()} FCFA
              </p>
            </div>
          ))}
        </div>

        {/* Statut et bouton */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full sm:w-auto">
          <div className="self-start sm:self-auto">
            <StatutBadge statut={achat.statut} />
          </div>
          <div className="w-full sm:w-auto">
            <button
              onClick={() => onVoirDetails(achat.code)}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <T>viewDetails</T>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page principale Mes achats
export default function MesAchats() {
  const { t } = useAppContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [achats, setAchats] = useState([]);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return t.unknownDate || "Date inconnue";
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t.today || "Aujourd'hui";
    if (diffDays === 1) return t.yesterday || "Hier";
    if (diffDays < 7) return (t.daysAgo || "Il y a {days} jours").replace('{days}', diffDays);
    return date.toLocaleDateString('fr-FR');
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("auth/profile/");
        setUser(response.data);
      } catch (error) {
        console.error("Erreur:", error);
        setUser({ username: "Jean Dupont", telephone: "+237 6XX XXX XXX" });
      }
    };

    const getAchats = async () => {
      try {
        const achatsResponse = await api.get('achats/');
        setAchats(achatsResponse.data);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
    getAchats();
  }, []);

  const handleVoirDetails = (code) => {
    navigate(`/achat/${code}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="achats" />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            <T>myPurchases</T>
          </h1>

          {achats.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <p className="text-gray-400 dark:text-gray-400 text-base sm:text-lg">
                <T>noPurchases</T>
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {achats.map((achat) => (
                <AchatCard 
                  key={achat.code} 
                  achat={achat} 
                  date={formatDate(achat.created_at)} 
                  onVoirDetails={handleVoirDetails} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}