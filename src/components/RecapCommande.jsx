// src/components/RecapCommande.jsx
import { useAppContext } from "../context/AppContext"; // ← IMPORT
import T from "../components/T"; // ← IMPORT

export default function RecapCommande({ commande, livraison, onConfirm, onBack }) {
  const { t } = useAppContext(); // ← Récupère les traductions
  
  const sousTotal = commande.reduce((acc, p) => acc + p.prix * p.quantite, 0);
  const total = sousTotal + livraison.fraisTotal;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        <T>orderSummary</T>
      </h2>
      <div className="space-y-4">
        {commande.map(p => (
          <div key={p.id} className="flex gap-3 items-center border-b border-gray-100 dark:border-gray-700 pb-3">
            <img src={p.image || "/placeholder.webp"} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">{p.titre}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400"><T>quantity</T>: {p.quantite}</p>
              <p className="text-orange-500 font-bold">{(p.prix * p.quantite).toLocaleString()} FCFA</p>
            </div>
          </div>
        ))}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span><T>subtotal</T></span>
            <span>{sousTotal.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span><T>delivery</T></span>
            <span>{livraison.fraisTotal.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2">
            <span className="text-gray-900 dark:text-white"><T>total</T></span>
            <span className="text-orange-500">{total.toLocaleString()} FCFA</span>
          </div>
        </div>
        {livraison.modeLivraison === "domicile" && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl text-sm transition-colors duration-300">
            <p className="font-semibold text-gray-900 dark:text-white"><T>deliveryAddress</T></p>
            <p className="text-gray-600 dark:text-gray-300">
              {livraison.adresse.nomComplet}, {livraison.adresse.telephone}
              <br/>{livraison.adresse.quartier}, {livraison.adresse.ville}
              <br/>{livraison.adresse.adresseComplete}
              <br/><T>service</T>: {livraison.service.nom}
            </p>
          </div>
        )}
        {livraison.modeLivraison === "retrait" && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl text-sm transition-colors duration-300">
            <p className="font-semibold text-gray-900 dark:text-white"><T>pickup</T></p>
            <p className="text-gray-600 dark:text-gray-300"><T>pickupLocation</T></p>
          </div>
        )}
      </div>
      <div className="flex gap-3 mt-6">
        <button 
          onClick={onBack} 
          className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <T>back</T>
        </button>
        <button 
          onClick={onConfirm} 
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition-colors"
        >
          <T>validateAndPay</T>
        </button>
      </div>
    </div>
  );
}