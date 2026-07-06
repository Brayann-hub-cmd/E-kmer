// src/pages/Paiement/Paiement.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import LivraisonChoix from "../../components/LivraisonChoix";
import RecapCommande from "../../components/RecapCommande";
import PaiementMobile from "../../components/PaiementMobile";
import BackToHome from "../../components/BackToHome";
import toast from "react-hot-toast";

export default function Paiement() {
  const [commande, setCommande] = useState([]);
  const [panierTotal, setPanierTotal] = useState(0);
  const [etape, setEtape] = useState(1);
  const [livraison, setLivraison] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const res = await api.get("panier/");
        console.log("Panier API response:", res.data);
        
        // ✅ CORRECTION : Extraire les items correctement
        let items = [];
        let total = 0;
        
        if (res.data && Array.isArray(res.data)) {
          // Si l'API renvoie directement un tableau
          items = res.data;
        } else if (res.data && res.data.items && Array.isArray(res.data.items)) {
          // Si l'API renvoie { items: [...] }
          items = res.data.items;
          total = res.data.total || 0;
        } else {
          // Si la réponse est vide ou mal formée
          items = [];
          toast.error("Panier vide ou mal formaté");
        }
        
        setCommande(items);
        setPanierTotal(total);
        
        console.log("Items extraits:", items);
        console.log("Total:", total);
        
      } catch (err) { 
        console.error("Erreur chargement panier:", err);
        toast.error(err?.response?.data?.error || "Erreur chargement panier");
        setCommande([]);
        setPanierTotal(0);
      }
    };
    fetchPanier();
  }, []);

  const handleLivraisonValidee = (data) => {
    setLivraison(data);
    setEtape(2);
  };

  const handleConfirmCommande = () => setEtape(3);

  const handlePaiementSucces = async () => {
    try {
      await api.post("commandes/", { commande, livraison });
      navigate("/confirmation");
    } catch (err) { 
      console.error(err);
      toast.error(err?.response?.data?.error || "Erreur lors de la confirmation");
    }
  };

  // ✅ Calcul du sous-total avec vérification
  const sousTotal = Array.isArray(commande) 
    ? commande.reduce((acc, item) => {
        const prix = item.prix || item.annonce_prix || 0;
        const qte = item.quantite || 1;
        return acc + (prix * qte);
      }, 0)
    : 0;
    
  // Utiliser le total du panier si disponible, sinon le calcul
  const total = (panierTotal || sousTotal) + (livraison?.fraisTotal || 0);

  // ✅ Log pour déboguer
  console.log("Commande:", commande);
  console.log("Sous-total:", sousTotal);
  console.log("Total:", total);

  if (commande.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <BackToHome />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Finaliser la commande</h1>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Votre panier est vide.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Continuer mes achats
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

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Finaliser la commande</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Choisissez votre mode de livraison et payez en toute sécurité</p>

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
            onConfirm={handleConfirmCommande} 
            onBack={() => setEtape(1)} 
          />
        )}
        {etape === 3 && <PaiementMobile total={total} onSuccess={handlePaiementSucces} />}
      </div>
    </div>
  );
}