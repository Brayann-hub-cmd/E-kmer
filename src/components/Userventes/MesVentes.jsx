// src/pages/MySell.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaReceipt } from "react-icons/fa";
import SideBar from "./SideBar";
import BackToHome from "../BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import T from "../T";

const LINK = import.meta.env.VITE_API_URL;

// ── Carte produit en vente ───────────────────────────────────
const SellCard = ({ product, onViewSaleDetail }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      {product.lignes?.map((ligne) => (
        <div key={ligne.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

          <img
            src={`${ligne.annonce_image}`}
            alt={ligne.annonce_titre}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{ligne.annonce_titre}</h3>
            <p className="text-orange-500 font-bold text-lg">{(ligne.prix_unitaire ?? 0).toLocaleString()} FCFA</p>
            <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <p><T>sold</T>: <strong className="text-gray-700 dark:text-gray-300">{ligne.quantite || 0}</strong></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
            <div className="flex gap-2 flex-wrap">
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
  const { t } = useAppContext();
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
        
        // ✅ CORRECTION : On s'assure que products est toujours un tableau
        const productsData = Array.isArray(productsRes.data) ? productsRes.data : [];
        setProducts(productsData);
      } catch (error) {
        console.error("Erreur:", error);
        setProducts([]); // En cas d'erreur, on met un tableau vide
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleEdit = (code) => {
    navigate(`/produit/modifier/${code}`);
  };

  const handleView = (code) => {
    navigate(`/produit/${code}`);
  };

  const handleViewSaleDetail = (code) => {
    navigate(`/vente/${code}`);
  };

  const handleDelete = async (code, titre) => {
    if (!window.confirm(t.confirmDelete?.replace('{titre}', titre) || `Supprimer "${titre}" ?`)) return;
    try {
      await api.delete(`annonces/${code}/`);
      setProducts(prev =>
        prev
          .map(p => ({ ...p, lignes: p.lignes.filter(l => l.annonce !== code) }))
          .filter(p => p.lignes.length > 0)
      );
      toast.success(t.successDelete || "Produit supprimé");
    } catch {
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

        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="ventes" />
        </div>

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