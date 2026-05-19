// src/pages/Paiement.jsx (version finale avec dropdowns)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import LivraisonChoix from "../../components/LivraisonChoix";
import RecapCommande from "../../components/RecapCommande";
import PaiementMobile from "../../components/PaiementMobile";
import BackToHome from "../../components/BackToHome";

export default function Paiement() {
  const [commande, setCommande] = useState([]);
  const [etape, setEtape] = useState(1);
  const [livraison, setLivraison] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const res = await api.get("panier/");
        setCommande(res.data);
      } catch (err) { console.error(err); }
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
    } catch (err) { console.error(err); }
  };

  const sousTotal = commande.reduce((acc, p) => acc + p.prix * p.quantite, 0);
  const total = sousTotal + (livraison?.fraisTotal || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* ← BOUTON RETOUR ACCUEIL */}
        <BackToHome />

        <h1 className="text-3xl font-bold mb-2">Finaliser la commande</h1>
        <p className="text-gray-500 mb-6">Choisissez votre mode de livraison et payez en toute sécurité</p>

        <div className="flex gap-1 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`flex-1 h-1 rounded-full transition ${etape >= step ? "bg-orange-500" : "bg-gray-200"}`}></div>
          ))}
        </div>

        {etape === 1 && <LivraisonChoix onValidate={handleLivraisonValidee} />}
        {etape === 2 && <RecapCommande commande={commande} livraison={livraison} onConfirm={handleConfirmCommande} onBack={() => setEtape(1)} />}
        {etape === 3 && <PaiementMobile total={total} onSuccess={handlePaiementSucces} />}
      </div>
    </div>
  );
}