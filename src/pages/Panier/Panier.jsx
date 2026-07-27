// src/pages/Panier.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import api from "../../api";
import BackToHome from "../../components/BackToHome";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import T from "../../components/T";
import { safeReadStorageJSON, safeWriteStorageJSON } from "../../utils/storage";

const LINK = import.meta.env.VITE_API_URL;
const LIVRAISON = 5000;

const PanierCard = ({ item, onQteChange, onSupprimer }) => {
  const { t } = useAppContext();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex gap-5 items-start">
        <img
          src={item.annonce_image ? `${item.annonce_image}` : "/placeholder.webp"}
          alt={item.annonce_titre}
          className="w-40 h-32 object-cover rounded-xl flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.annonce_titre}</h3>
              <p className="text-gray-400 dark:text-gray-400 text-sm mt-0.5 font-medium">
                {t.publishedBy || 'Publié par'} {item.annonce_vendeur}
              </p>
              <p className="text-orange-500 font-bold text-xl mt-2">
                {Number(item.annonce_prix).toLocaleString()} FCFA
              </p>
            </div>
            <button
              onClick={() => onSupprimer(item.id)}
              className="text-orange-500 hover:text-red-600 transition-colors p-1"
              title={t.remove || "Supprimer"}
            >
              <FaTrash className="text-lg" />
            </button>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => onQteChange(item.id, item.quantite + 1)}
                className="px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold text-lg"
              >
                +
              </button>
              <span className="px-4 py-1.5 text-gray-900 dark:text-white font-semibold border-x border-gray-300 dark:border-gray-600 min-w-[40px] text-center">
                {item.quantite}
              </span>
              <button
                onClick={() => onQteChange(item.id, item.quantite - 1)}
                className="px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold text-lg"
                disabled={item.quantite <= 1}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-100 dark:border-gray-700" />
      <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
        <T>subtotal</T> : {Number(item.sous_total ?? item.annonce_prix * item.quantite).toLocaleString()} FCFA
      </p>
    </div>
  );
};

export default function Panier() {
  const { t } = useAppContext();
  const [panierData, setPanierData] = useState({ items: [], total: 0 });
  const [loadingPanier, setLoadingPanier] = useState(true);
  const navigate = useNavigate();

  const fetchPanier = useCallback(async () => {
    try {
      const response = await api.get("panier/");
      const nextData = {
        items: Array.isArray(response?.data?.items) ? response.data.items : [],
        total: Number(response?.data?.total) || 0
      };
      setPanierData(nextData);
      safeWriteStorageJSON('cartCache', nextData);
    } catch (error) {
      console.error("Erreur chargement panier:", error);
      const cached = safeReadStorageJSON('cartCache', { items: [], total: 0 });
      setPanierData(cached);
      if (!cached?.items?.length) {
        toast.error(error?.response?.data?.error || t.cartLoadError || "Erreur chargement panier");
      }
    } finally {
      setLoadingPanier(false);
    }
  }, [t]);

  useEffect(() => {
    fetchPanier();
  }, [fetchPanier]);

  const handleQteChange = async (id, nouvelleQte) => {
    if (nouvelleQte < 1) return;

    setPanierData((prev) => ({
      ...prev,
      items: (prev.items || []).map((item) =>
        item.id === id
          ? { ...item, quantite: nouvelleQte, sous_total: Number(item.annonce_prix || 0) * nouvelleQte }
          : item
      )
    }));

    try {
      await api.patch(`panier/items/${id}/`, { quantite: nouvelleQte });
      await fetchPanier();
    } catch (error) {
      console.error("Erreur mise à jour quantité:", error);
      toast.error(error?.response?.data?.error || t.quantityError || "Erreur mise à jour");
      fetchPanier();
    }
  };

  const handleSupprimer = async (id) => {
    setPanierData((prev) => ({
      ...prev,
      items: (prev.items || []).filter((item) => item.id !== id)
    }));

    try {
      await api.delete(`panier/items/${id}/`);
      toast.success(t.successRemove || "Article supprimé du panier");
      await fetchPanier();
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error(error?.response?.data?.error || t.deleteError || "Erreur suppression");
      fetchPanier();
    }
  };

  const items = panierData.items || [];
  const sousTotal = Number(panierData.total) || 0;
  const total = sousTotal + LIVRAISON;

  if (loadingPanier) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">{t.loadingCart || 'Chargement du panier...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BackToHome />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          <T>cartTitle</T>
        </h1>
        <p className="text-gray-400 dark:text-gray-400 text-sm font-medium mt-1 mb-8">
          {items.length} {items.length > 1 ? <T>itemsInCart</T> : <T>itemInCart</T>}
        </p>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <p className="text-gray-400 dark:text-gray-400 text-lg mb-4">
              <T>emptyCart</T>
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              <T>continueShopping</T>
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4 w-full">
              {items.map((item) => (
                <PanierCard
                  key={item.id}
                  item={item}
                  onQteChange={handleQteChange}
                  onSupprimer={handleSupprimer}
                />
              ))}
            </div>

            <div className="w-full lg:w-80 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 lg:sticky lg:top-6 flex-shrink-0 transition-colors duration-300">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
                <T>orderSummary</T>
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span><T>subtotal</T></span>
                  <span className="font-semibold text-gray-900 dark:text-white">{sousTotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span><T>delivery</T></span>
                  <span className="font-semibold text-gray-900 dark:text-white">{LIVRAISON.toLocaleString()} FCFA</span>
                </div>
                <hr className="border-gray-100 dark:border-gray-700 my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-gray-900 dark:text-white"><T>total</T></span>
                  <span className="text-orange-500">{total.toLocaleString()} FCFA</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/paiement")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold mt-6 transition-colors"
              >
                <T>checkout</T>
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-xl font-semibold mt-3 transition-colors"
              >
                <T>continueShopping</T>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}