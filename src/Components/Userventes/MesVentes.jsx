// src/pages/MySell.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaReceipt } from "react-icons/fa";
import SideBar from "./SideBar";
import BackToHome from "../BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

const LINK = import.meta.env.VITE_API_URL;

// ── Carte produit en vente ───────────────────────────────────
const SellCard = ({ product, onEdit, onDelete, onView, onViewSaleDetail }) => {
  const { t } = useAppContext(); // ← Récupère les traductions
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      {product.lignes?.map((ligne) => (
        <div key={ligne.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

          {/* Image */}
          <img
            src={LINK + ligne.annonce_image}
            alt={ligne.annonce_titre}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
          />

          {/* Infos */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{ligne.annonce_titre}</h3>
            <p className="text-orange-500 font-bold text-lg">{(ligne.prix_unitaire ?? 0).toLocaleString()} FCFA</p>
            <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <p><T>stock</T>: <strong className="text-gray-700 dark:text-gray-300">{ligne.annonce_qte} <T>units</T></strong></p>
              <p><T>sold</T>: <strong className="text-gray-700 dark:text-gray-300">{ligne.quantite || 0}</strong></p>
              <p><T>views</T>: <strong className="text-gray-700 dark:text-gray-300">{ligne.vues || 0}</strong></p>
            </div>
          </div>

          {/* Statut + Actions */}
          <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
            {/* Statut */}
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full transition-colors duration-300">
              <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
              <span className="text-green-700 dark:text-green-300 text-sm font-medium">{t.active || "Actif"}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => onEdit(product.code)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
              >
                <FaEdit /> <T>edit</T>
              </button>
              <button
                onClick={() => onView(product.code)}
                className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
              >
                <FaEye /> <T>view</T>
              </button>
              <button
                onClick={() => onDelete(product.code, ligne.annonce_titre)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
              >
                <FaTrash /> <T>delete</T>
              </button>
              <button
                onClick={() => onViewSaleDetail(product.code)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
              >
                <FaReceipt /> <T>saleDetails</T>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Page principale Mes ventes
export default function MySell() {
  const { t } = useAppContext(); // ← Récupère les traductions
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Charger l'utilisateur et ses produits
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("auth/profile/");
        setUser(userRes.data);

        const productsRes = await api.get("ventes/vendeur/");
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Erreur:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (code) => {
    navigate(`/produit/modifier/${code}`);
  };

  const handleView = (code) => {
    navigate(`/produit/${code}`);
  };

  const handleViewSaleDetail = (code) => {
    // Rediriger vers la page détail de la vente
    navigate(`/vente/${code}`);
  };

  const handleDelete = async (code, titre) => {
    if (!window.confirm(t.confirmDelete?.replace('{titre}', titre) || `Supprimer "${titre}" ?`)) return;
    try {
      // TODO: Appel API suppression
      // await api.delete(`annonces/${code}/`);
      setProducts(prev => prev.filter(p => p.code !== code));
      toast.success(t.successDelete || "Produit supprimé");
    } catch (error) {
      toast.error(t.errorDelete || "Erreur lors de la suppression");
    }
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
          <SideBar user={user} activeTab="ventes" />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-4 sm:p-6">
          
          <BackToHome />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              <T>myProductsOnSale</T>
            </h1>
            <button
              onClick={() => navigate("/publier")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              + <T>publishProduct</T>
            </button>
          </div>

          {products.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <p className="text-gray-400 dark:text-gray-400 text-lg">
                <T>noProducts</T>
              </p>
              <button
                onClick={() => navigate("/publier")}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <T>publishProduct</T>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <SellCard
                  key={product.code}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  onViewSaleDetail={handleViewSaleDetail}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}