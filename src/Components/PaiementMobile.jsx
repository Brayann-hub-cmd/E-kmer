// src/components/PaiementMobile.jsx
import React, { useState } from 'react';  // ← Ajoute cette ligne !

export default function PaiementMobile({ total, onSuccess }) {
  const [operateur, setOperateur] = useState("");
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaiement = async () => {
    if (!operateur || !numero) { 
      setError("Veuillez remplir tous les champs"); 
      return; 
    }
    setLoading(true);
    try {
      // Appel API vers /api/paiement/
      // await api.post("paiement/", { operateur, numero, montant: total });
      setTimeout(() => { 
        setLoading(false); 
        onSuccess(); 
      }, 1500);
    } catch (err) { 
      setError("Erreur de paiement"); 
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Paiement Mobile Money</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Opérateur</label>
          <select 
            className="w-full p-3 border rounded-xl" 
            value={operateur} 
            onChange={e => setOperateur(e.target.value)}
          >
            <option value="">Sélectionnez</option>
            <option value="orange">Orange Money</option>
            <option value="mtn">MTN Mobile Money</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Numéro de téléphone</label>
          <input 
            type="tel" 
            className="w-full p-3 border rounded-xl" 
            placeholder="+237 6XX XXX XXX" 
            value={numero} 
            onChange={e => setNumero(e.target.value)} 
          />
        </div>
        <div className="bg-gray-100 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">Montant à payer</p>
          <p className="text-2xl font-bold text-orange-500">{total.toLocaleString()} FCFA</p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button 
          onClick={handlePaiement} 
          disabled={loading} 
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Traitement..." : "Payer maintenant"}
        </button>
        <p className="text-xs text-center text-gray-400 mt-4">
          Vous recevrez une demande de paiement sur votre téléphone. 
          Confirmez-la pour finaliser la commande.
        </p>
      </div>
    </div>
  );
}