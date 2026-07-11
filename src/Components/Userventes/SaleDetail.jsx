// src/pages/Seller/SaleDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaTruck, FaTimesCircle, FaUser, FaStore, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import SideBar from "./SideBar";
import BackToHome from "../BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

const StatutBadge = ({ statut }) => {
  const { t } = useAppContext(); // ← Récupère les traductions
  
  const config = {
    livre: { 
      label: t.livre || "Livré", 
      icon: <FaCheckCircle />, 
      bg: "bg-green-100 dark:bg-green-900", 
      text: "text-green-700 dark:text-green-300" 
    },
    en_cours: { 
      label: t.enCours || "En cours", 
      icon: <FaTruck />, 
      bg: "bg-blue-100 dark:bg-blue-900", 
      text: "text-blue-700 dark:text-blue-300" 
    },
    attente: { 
      label: t.attente || "En attente", 
      icon: <FaClock />, 
      bg: "bg-yellow-100 dark:bg-yellow-900", 
      text: "text-yellow-700 dark:text-yellow-300" 
    },
    annule: { 
      label: t.annule || "Annulé", 
      icon: <FaTimesCircle />, 
      bg: "bg-red-100 dark:bg-red-900", 
      text: "text-red-700 dark:text-red-300" 
    },
  };
  const c = config[statut] || config.attente;
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
      {c.icon} {c.label}
    </span>
  );
};

export default function SaleDetail() {
  const { t } = useAppContext(); // ← Récupère les traductions
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("auth/profile/");
        setUser(userRes.data);

        const response = await api.get(`ventes/${id}/`);
        setSale(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.error || t.errorLoading || "Erreur de chargement");
        // Si erreur, on redirige
        // navigate("/profile");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, t]);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
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

  if (!sale) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            <T>saleNotFound</T>
          </h2>
          <button onClick={() => navigate("/profile")} className="mt-4 text-orange-500">
            ← <T>back</T>
          </button>
        </div>
      </div>
    );
  }

  // Extraction sécurisée des données
  const produit = sale.produit || {};
  const acheteur = sale.acheteur || {};
  const lignes = sale.lignes || [];
  const firstLigne = lignes.length > 0 ? lignes[0] : {};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="ventes" />
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <BackToHome />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              <T>saleDetail</T>
            </h1>
            <button
              onClick={() => navigate("/profile")}
              className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              ← <T>back</T>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            {/* En-tête */}
            <div className="bg-orange-500 px-6 py-4">
              <p className="text-white text-sm"><T>orderReference</T></p>
              <p className="text-white font-bold text-xl">{sale.code || id}</p>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-6">
              {/* Produit */}
              <div className="flex gap-4 items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                <img 
                  src={produit.image || firstLigne.annonce_image || "/placeholder.webp"} 
                  alt={produit.titre || firstLigne.annonce_titre || "Produit"} 
                  className="w-20 h-20 object-cover rounded-lg" 
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {produit.titre || firstLigne.annonce_titre || "—"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    <T>quantity</T>: {sale.quantite || firstLigne.quantite || 1}
                  </p>
                  <p className="text-orange-500 font-bold">
                    {(sale.montant_total || produit.prix || 0).toLocaleString()} FCFA
                  </p>
                </div>
              </div>

              {/* Informations acheteur */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaUser className="text-orange-500" /> <T>buyer</T>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium"><T>name</T>:</span> {acheteur.nom || acheteur.username || "—"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium"><T>phone</T>:</span> {acheteur.telephone || "—"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium"><T>email</T>:</span> {acheteur.email || "—"}
                </p>
              </div>

              {/* Détails commande */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaStore className="text-orange-500" /> <T>orderDetails</T>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium"><T>date</T>:</span> {formatDate(sale.date || sale.created_at)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium"><T>status</T>:</span> <StatutBadge statut={sale.statut || sale.status || "attente"} />
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium"><T>totalAmount</T>:</span> <span className="text-orange-500 font-bold">{(sale.montant_total || 0).toLocaleString()} FCFA</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium"><T>deliveryAddress</T>:</span> {sale.adresse_livraison || sale.delivery_address || "—"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-colors">
                  <T>contactBuyer</T>
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 rounded-lg font-semibold transition-colors">
                  <T>downloadInvoice</T>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}