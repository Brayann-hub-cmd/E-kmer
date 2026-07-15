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
  const { t } = useAppContext();
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, t]);

  // ... formatDate, loading, !sale : inchangés

  const acheteur = sale.acheteur || {};
  const lignes = sale.lignes || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* ... structure inchangée ... */}
      <div className="p-6 space-y-6">

        {/* Produits — TOUTES les lignes, pas juste la première */}
        <div className="border-b border-gray-100 dark:border-gray-700 pb-4 space-y-3">
          {lignes.map((ligne) => (
            <div key={ligne.id} className="flex gap-4 items-center">
              <img
                src={ligne.annonce_image ? `${import.meta.env.VITE_API_URL}${ligne.annonce_image}` : "/placeholder.webp"}
                alt={ligne.annonce_titre}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{ligne.annonce_titre}</h3>
                <p className="text-gray-500 dark:text-gray-400"><T>quantity</T>: {ligne.quantite}</p>
                <p className="text-orange-500 font-bold">{ligne.prix_unitaire?.toLocaleString()} FCFA</p>
              </div>
            </div>
          ))}
        </div>

        {/* Acheteur */}
        <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <FaUser className="text-orange-500" /> <T>buyer</T>
          </h3>
          <p><span className="font-medium"><T>name</T>:</span> {acheteur.username || "—"}</p>
          <p><span className="font-medium"><T>phone</T>:</span> {acheteur.telephone || "—"}</p>
          <p><span className="font-medium"><T>email</T>:</span> {acheteur.email || "—"}</p>
        </div>

        {/* Détails commande */}
        <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <FaStore className="text-orange-500" /> <T>orderDetails</T>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p><span className="font-medium"><T>date</T>:</span> {formatDate(sale.created_at)}</p>
            <p><span className="font-medium"><T>status</T>:</span> <StatutBadge statut={sale.statut} /></p>
            <p><span className="font-medium"><T>totalAmount</T>:</span> <span className="text-orange-500 font-bold">{sale.prix_total?.toLocaleString()} FCFA</span></p>
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
  );
}