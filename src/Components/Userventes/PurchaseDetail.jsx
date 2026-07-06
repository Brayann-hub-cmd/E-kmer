// src/pages/Buyer/PurchaseDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaTruck, FaTimesCircle, FaUser, FaStore, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import SideBar from "../../components/Userventes/SideBar";
import BackToHome from "../../components/BackToHome";
import api from "../../api";
import toast from "react-hot-toast";

const StatutBadge = ({ statut }) => {
  const config = {
    livre: { label: "Livré", icon: <FaCheckCircle />, bg: "bg-green-100 dark:bg-green-900", text: "text-green-700 dark:text-green-300" },
    en_cours: { label: "En cours", icon: <FaTruck />, bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-300" },
    attente: { label: "En attente", icon: <FaClock />, bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-700 dark:text-yellow-300" },
    annule: { label: "Annulé", icon: <FaTimesCircle />, bg: "bg-red-100 dark:bg-red-900", text: "text-red-700 dark:text-red-300" },
  };
  const c = config[statut] || config.attente;
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
      {c.icon} {c.label}
    </span>
  );
};

export default function PurchaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("auth/profile/");
        setUser(userRes.data);

        // TODO: Remplacer par l'endpoint réel
        // const response = await api.get(`achats/${id}/`);
        // setPurchase(response.data);
        
        // Données mock
        setPurchase({
          id: id,
          code: "CMD_001",
          produit: {
            titre: "iPhone 14 Pro",
            prix: 450000,
            image: "/iphone.webp",
            vendeur: "Tech Store CM",
            vendeur_tel: "+237 6XX XXX XXX"
          },
          quantite: 1,
          montant_total: 450000,
          date: "2026-05-20T10:30:00Z",
          statut: "livre",
          adresse_livraison: "Douala, Bonamoussadi",
          livraison: {
            service: "Yoomee Delivery",
            tracking: "YOO-123456789"
          }
        });
      } catch (error) {
        toast.error("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!purchase) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Achat non trouvé</h2>
          <button onClick={() => navigate("/profile/achats")} className="mt-4 text-orange-500">← Retour</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="achats" />
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <BackToHome />
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Détail de l'achat</h1>
            <button
              onClick={() => navigate("/profile/achats")}
              className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              ← Retour
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            {/* En-tête */}
            <div className="bg-orange-500 px-6 py-4">
              <p className="text-white text-sm">Référence commande</p>
              <p className="text-white font-bold text-xl">{purchase.code}</p>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-6">
              {/* Produit */}
              <div className="flex gap-4 items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                <img src={purchase.produit.image || "/placeholder.webp"} alt={purchase.produit.titre} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{purchase.produit.titre}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Qté: {purchase.quantite}</p>
                  <p className="text-orange-500 font-bold">{purchase.produit.prix.toLocaleString()} FCFA</p>
                </div>
              </div>

              {/* Informations vendeur */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaStore className="text-orange-500" /> Vendeur
                </h3>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Nom:</span> {purchase.produit.vendeur}</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Téléphone:</span> {purchase.produit.vendeur_tel}</p>
              </div>

              {/* Détails commande */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaStore className="text-orange-500" /> Détails de la commande
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Date:</span> {formatDate(purchase.date)}</p>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Statut:</span> <StatutBadge statut={purchase.statut} /></p>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Montant total:</span> <span className="text-orange-500 font-bold">{purchase.montant_total.toLocaleString()} FCFA</span></p>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Adresse livraison:</span> {purchase.adresse_livraison}</p>
                </div>
              </div>

              {/* Suivi livraison */}
              {purchase.livraison && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 transition-colors duration-300">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Suivi de livraison</h3>
                  <p className="text-gray-700 dark:text-gray-300">Service: {purchase.livraison.service}</p>
                  <p className="text-gray-700 dark:text-gray-300">Numéro de suivi: <span className="font-mono">{purchase.livraison.tracking}</span></p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-colors">Contacter le vendeur</button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 rounded-lg font-semibold transition-colors">Télécharger facture</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}