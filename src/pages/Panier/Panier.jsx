// src/pages/Panier.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import api from "../../api";
import BackToHome from "../../Components/BackToHome";
import toast from "react-hot-toast";

const LINK = import.meta.env.VITE_API_URL;
const LIVRAISON = 5000;

// ── Carte produit panier ──────────────────────────────────────
const PanierCard = ({ item, onQteChange, onSupprimer }) => {
  const sousTotalItem = item.sous_total || item.prix * item.quantite;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex gap-5 items-start">
        {/* Image */}
        <img
          src={LINK + (item.annonce_image || item.image) || "/placeholder.webp"}
          alt={item.annonce_titre || item.titre}
          className="w-40 h-32 object-cover rounded-xl flex-shrink-0"
        />

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.annonce_titre || item.titre}</h3>
              <p className="text-gray-400 dark:text-gray-400 text-sm mt-0.5 font-medium">
                Publié par {item.annonce_vendeur || item.vendeur}
              </p>
              <p className="text-orange-500 font-bold text-xl mt-2">
                {(item.annonce_prix || item.prix)?.toLocaleString()} FCFA
              </p>
            </div>
            {/* Bouton supprimer */}
            <button
              onClick={() => onSupprimer(item.id)}
              className="text-orange-500 hover:text-red-600 transition-colors p-1"
              title="Supprimer"
            >
              <FaTrash className="text-lg" />
            </button>
          </div>

          {/* Sélecteur quantité */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => onQteChange(item.id, item.quantite + 1, item.annonce_id)}
                className="px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold text-lg"
                disabled={item.quantite >= (item.stock || item.annonce_qte || 999)}
              >
                +
              </button>
              <span className="px-4 py-1.5 text-gray-900 dark:text-white font-semibold border-x border-gray-300 dark:border-gray-600 min-w-[40px] text-center">
                {item.quantite}
              </span>
              <button
                onClick={() => onQteChange(item.id, item.quantite - 1, item.annonce_id)}
                className="px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold text-lg"
                disabled={item.quantite <= 1}
              >
                -
              </button>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {(item.stock || item.annonce_qte || 0)} en stock
            </span>
          </div>
        </div>
      </div>

      {/* Séparateur + sous-total */}
      <hr className="my-4 border-gray-100 dark:border-gray-700" />
      <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
        Sous-total : {sousTotalItem.toLocaleString()} FCFA
      </p>
    </div>
  );
};

// ── Page principale ───────────────────────────────────────────
export default function Panier() {
  const [panierData, setPanierData] = useState({ items: [], total: 0 });
  const [loadingPanier, setLoadingPanier] = useState(true);
  const navigate = useNavigate();

  // Chargement du panier au montage
  useEffect(() => {
    const getPanier = async () => {
      try {
        const response = await api.get("panier/");
        if (response.data && Array.isArray(response.data)) {
          setPanierData({ items: response.data, total: 0 });
        } else if (response.data && response.data.items) {
          setPanierData(response.data);
        } else {
          setPanierData({ items: [], total: 0 });
        }
      } catch (error) {
        console.error("Erreur chargement panier:", error);
        toast.error(error?.response?.data?.error || "Erreur chargement panier");
        setPanierData({ items: [], total: 0 });
      } finally {
        setLoadingPanier(false);
      }
    };
    getPanier();
  }, []);

  const handleQteChange = async (id, nouvelleQte, annonce_id) => {
    if (nouvelleQte < 1) return;
    
    setPanierData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? { 
              ...item, 
              quantite: Math.min(nouvelleQte, item.stock || item.annonce_qte || 999),
              sous_total: (item.annonce_prix || item.prix) * Math.min(nouvelleQte, item.stock || item.annonce_qte || 999)
            }
          : item
      )
    }));
    
    try {
      await api.patch(`panier/items/${id}/`, { annonce: annonce_id, quantite: nouvelleQte });
    } catch (error) {
      console.error("Erreur mise à jour quantité:", error);
      toast.error(error?.response?.data?.error || "Erreur mise à jour");
      const response = await api.get("panier/");
      setPanierData(response.data);
    }
  };

  const handleSupprimer = async (id) => {
    setPanierData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id)
    }));
    
    try {
      await api.delete(`panier/items/${id}/`);
      toast.success("Article supprimé du panier");
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error(error?.response?.data?.error || "Erreur suppression");
      const response = await api.get("panier/");
      setPanierData(response.data);
    }
  };

  const items = panierData.items || [];
  const sousTotal = panierData.total || items.reduce((acc, item) => acc + (item.sous_total || (item.annonce_prix || item.prix) * item.quantite), 0);
  const total = sousTotal + LIVRAISON;

  if (loadingPanier) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <BackToHome />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mon Panier</h1>
        <p className="text-gray-400 dark:text-gray-400 text-sm font-medium mt-1 mb-8">
          {items.length} article{items.length > 1 ? "s" : ""} dans votre panier
        </p>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <p className="text-gray-400 dark:text-gray-400 text-lg mb-4">Votre panier est vide.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Continuer mes achats
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
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Résumé de la commande</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Sous-total</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{sousTotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Livraison</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{LIVRAISON.toLocaleString()} FCFA</span>
                </div>
                <hr className="border-gray-100 dark:border-gray-700 my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-gray-900 dark:text-white">TOTAL</span>
                  <span className="text-orange-500">{total.toLocaleString()} FCFA</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/paiement")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold mt-6 transition-colors"
              >
                Procéder au paiement
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-xl font-semibold mt-3 transition-colors"
              >
                Continuer mes achats
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}