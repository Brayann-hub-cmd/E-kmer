// src/pages/Paiement/Paiement.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import LivraisonChoix from "../../components/LivraisonChoix";
import RecapCommande from "../../components/RecapCommande";
import PaiementMobile from "../../components/PaiementMobile";
import BackToHome from "../../components/BackToHome";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import T from "../../components/T";

export default function Paiement() {
  const { t } = useAppContext();
  const [commande, setCommande] = useState([]);
  const [panierTotal, setPanierTotal] = useState(0);
  const [etape, setEtape] = useState(1);
  const [livraison, setLivraison] = useState(null);
  const [order, setOrder] = useState(null);           // ← la vraie Order créée côté backend
  const [creatingOrder, setCreatingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const res = await api.get("panier/");
        setCommande(res.data.items || []);
        setPanierTotal(Number(res.data.total) || 0);
      } catch (err) {
        console.error("Erreur chargement panier:", err);
        toast.error(err?.response?.data?.error || t.cartLoadError || "Erreur chargement panier");
        setCommande([]);
        setPanierTotal(0);
      }
    };
    fetchPanier();
  }, [t]);

  const handleLivraisonValidee = (data) => {
    setLivraison(data);
    setEtape(2);
  };

  // Étape 2 → 3 : on crée VRAIMENT la commande ici, avant le paiement
  const handleConfirmCommande = async () => {
    setCreatingOrder(true);
    try {
      const res = await api.post("commandes/");
      setOrder(res.data);
      setEtape(3);
    } catch (err) {
      console.error("Erreur création commande:", err);
      toast.error(err?.response?.data?.error || t.orderCreateError || "Erreur lors de la création de la commande");
    } finally {
      setCreatingOrder(false);
    }
  };

  const sousTotal = panierTotal;
  const total = sousTotal + (livraison?.fraisTotal || 0);
  const paymentAmount = order?.total ?? total;

  if (commande.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <BackToHome />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            <T>finalizeOrder</T>
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              <T>emptyCart</T>
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <T>continueShopping</T>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <BackToHome />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          <T>finalizeOrder</T>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          <T>paymentSubtitle</T>
        </p>

        <div className="flex gap-1 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`flex-1 h-1 rounded-full transition ${
              etape >= step ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-700"
            }`}></div>
          ))}
        </div>

        {etape === 1 && <LivraisonChoix onValidate={handleLivraisonValidee} />}
        {etape === 2 && (
          <RecapCommande
            commande={commande}
            livraison={livraison}
            total={total}
            onConfirm={handleConfirmCommande}
            onBack={() => setEtape(1)}
            loading={creatingOrder}
          />
        )}
        {etape === 3 && order && (
          <PaiementMobile order={order} total={total} />
        )}
      </div>
    </div>
  );
}