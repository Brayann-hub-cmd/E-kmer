// src/pages/Seller/SaleDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaTruck, FaTimesCircle, FaUser, FaStore, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import SideBar from "./SideBar";
import BackToHome from "../BackToHome";
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

export default function SaleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState({
    id: id,
    code: id,
    produit: {
      titre: "",
      prix: 0,
      image: ""
    },
    acheteur: {
      nom: "",
      telephone: "",
      email: ""
    },
    quantite: 1,
    montant_total: 450000,
    date: "",
    statut: "",
    adresse_livraison: ""
  });
  const [formSale, setFormSale] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("auth/profile/");
        setUser(userRes.data);
        const response = await api.get(`ventes/${id}/`);
        setFormSale(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.error || 'erreur de chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    try {
      // Traitement des données si nécessaire
    } catch (error) {
      toast.error(error?.response?.data?.error || 'erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [formSale]);

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

  if (!sale) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Vente non trouvée</h2>
          <button onClick={() => navigate("/profile")} className="mt-4 text-orange-500">← Retour</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="ventes" />
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <BackToHome />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Détail de la vente</h1>
            <button
              onClick={() => navigate("/profile")}
              className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              ← Retour
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            {/* En-tête */}
            <div className="bg-orange-500 px-6 py-4">
              <p className="text-white text-sm">Référence commande</p>
              <p className="text-white font-bold text-xl">{sale.code}</p>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-6">
              {/* Produit */}
              <div className="flex gap-4 items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                <img src={sale.produit.image || "/placeholder.webp"} alt={sale.produit.titre} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{sale.produit.titre}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Qté: {sale.quantite}</p>
                  <p className="text-orange-500 font-bold">{sale.produit.prix.toLocaleString()} FCFA</p>
                </div>
              </div>

              {/* Informations acheteur */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaUser className="text-orange-500" /> Acheteur
                </h3>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Nom:</span> {sale.acheteur.nom}</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Téléphone:</span> {sale.acheteur.telephone}</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Email:</span> {sale.acheteur.email}</p>
              </div>

              {/* Détails commande */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaStore className="text-orange-500" /> Détails de la commande
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Date:</span> {formatDate(sale.date)}</p>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Statut:</span> <StatutBadge statut={sale.statut} /></p>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Montant total:</span> <span className="text-orange-500 font-bold">{sale.montant_total.toLocaleString()} FCFA</span></p>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Adresse livraison:</span> {sale.adresse_livraison}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-colors">Contacter l'acheteur</button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 rounded-lg font-semibold transition-colors">Télécharger facture</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}