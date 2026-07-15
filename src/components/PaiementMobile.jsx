// src/components/PaiementMobile.jsx
import React, { useState } from 'react';
import api from '../api';
import { useAppContext } from '../context/AppContext';
import T from '../components/T';

export default function PaiementMobile({ order, total }) {
  const { t } = useAppContext();
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaiement = async () => {
    if (!numero.trim()) {
      setError(t.requiredFields || "Veuillez remplir tous les champs");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("paiements/initier/", {
        order_id: order.id,
        telephone: numero,
      });
      // Redirection vers la page de paiement CinetPay
      window.location.href = res.data.payment_url;
    } catch (err) {
      console.error("Erreur initiation paiement:", err);
      setError(err?.response?.data?.error || t.paymentError || "Erreur de paiement");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        <T>mobileMoneyPayment</T>
      </h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <T>phoneNumber</T>
          </label>
          <input
            type="tel"
            className="w-full p-3 border rounded-xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            placeholder={t.phonePlaceholder || "+237 6XX XXX XXX"}
            value={numero}
            onChange={e => setNumero(e.target.value)}
          />
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl text-center transition-colors duration-300">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <T>amountToPay</T>
          </p>
          <p className="text-2xl font-bold text-orange-500">{total.toLocaleString()} FCFA</p>
        </div>
        {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
        <button
          onClick={handlePaiement}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? <T>processing</T> : <T>payNow</T>}
        </button>
        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
          <T>paymentInstructions</T>
        </p>
      </div>
    </div>
  );
}