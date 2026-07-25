// src/components/LivraisonChoix.jsx
import { useState, useEffect } from "react";
import { FaStore, FaTruck, FaCheckCircle } from "react-icons/fa";
import api from "../api";
import { useAppContext } from "../context/AppContext";
import T from "./T";

const villesCameroun = [
  "Douala", "Yaoundé", "Bafoussam", "Garoua", "Maroua",
  "Ngaoundéré", "Bamenda", "Bertoua", "Ebolowa", "Kribi",
  "Limbe", "Buea", "Dschang", "Foumban", "Mbalmayo",
];

export default function LivraisonChoix({ onValidate }) {
  const { t } = useAppContext();
  const [modeLivraison, setModeLivraison] = useState("retrait");
  const [adresse, setAdresse] = useState({
    ville: "", quartier: "", adresseComplete: "", telephone: "", nomComplet: ""
  });
  const [livreurs, setLivreurs] = useState([]);
  const [livreur, setLivreur] = useState(null);
  const [trajetChoisi, setTrajetChoisi] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingLivreurs, setLoadingLivreurs] = useState(false);

  // Recharge les livreurs disponibles à chaque changement de ville
  useEffect(() => {
    if (modeLivraison !== "domicile" || !adresse.ville) {
      setLivreurs([]);
      setLivreur(null);
      setTrajetChoisi(null);
      return;
    }
    const fetchLivreurs = async () => {
      setLoadingLivreurs(true);
      setLivreur(null);
      setTrajetChoisi(null);
      try {
        const res = await api.get(`livreurs/?ville_arrivee=${encodeURIComponent(adresse.ville)}`);
        setLivreurs(res.data);
      } catch (err) {
        console.error("Erreur chargement livreurs:", err);
        setLivreurs([]);
      } finally {
        setLoadingLivreurs(false);
      }
    };
    fetchLivreurs();
  }, [modeLivraison, adresse.ville]);

  const handleChoisirLivreur = (l) => {
    // On prend le trajet qui correspond à la ville choisie (déjà filtré côté backend, mais on précise lequel)
    const trajet = l.trajets.find(
      t => t.ville_arrivee.toLowerCase() === adresse.ville.toLowerCase() && t.actif
    );
    setLivreur(l);
    setTrajetChoisi(trajet);
  };

  const fraisRetrait = 0;
  const fraisLivraison = trajetChoisi ? Number(trajetChoisi.tarif) : 0;

  const handleSubmit = () => {
    const newErrors = {};
    if (modeLivraison === "domicile") {
      if (!adresse.nomComplet) newErrors.nomComplet = t.required || "Requis";
      if (!adresse.telephone) newErrors.telephone = t.required || "Requis";
      if (!adresse.ville) newErrors.ville = t.required || "Requis";
      if (!adresse.quartier) newErrors.quartier = t.required || "Requis";
      if (!livreur) newErrors.service = t.chooseService || "Choisissez un livreur";
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onValidate({
      modeLivraison,
      ...(modeLivraison === "domicile" && { adresse, livreur, trajet: trajetChoisi, fraisLivraison }),
      fraisTotal: modeLivraison === "domicile" ? fraisLivraison : fraisRetrait
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        <T>deliveryMode</T>
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${modeLivraison === "retrait" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" : "border-gray-200 dark:border-gray-600"}`}>
          <input type="radio" name="livraison" value="retrait" checked={modeLivraison === "retrait"} onChange={() => setModeLivraison("retrait")} className="hidden" />
          <FaStore className="text-2xl text-orange-500" />
          <div>
            <p className="font-semibold dark:text-white"><T>storePickup</T></p>
            <p className="text-xs text-gray-500 dark:text-gray-400"><T>storePickupDesc</T></p>
          </div>
          {modeLivraison === "retrait" && <FaCheckCircle className="text-orange-500 ml-auto" />}
        </label>

        <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${modeLivraison === "domicile" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" : "border-gray-200 dark:border-gray-600"}`}>
          <input type="radio" name="livraison" value="domicile" checked={modeLivraison === "domicile"} onChange={() => setModeLivraison("domicile")} className="hidden" />
          <FaTruck className="text-2xl text-orange-500" />
          <div>
            <p className="font-semibold dark:text-white"><T>homeDelivery</T></p>
            <p className="text-xs text-gray-500 dark:text-gray-400"><T>homeDeliveryDesc</T></p>
          </div>
          {modeLivraison === "domicile" && <FaCheckCircle className="text-orange-500 ml-auto" />}
        </label>
      </div>

      {modeLivraison === "domicile" && (
        <div className="space-y-4 mt-4">
          <h3 className="font-semibold dark:text-white"><T>deliveryAddress</T></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm dark:text-gray-300"><T>fullName</T></label>
              <input
                className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder={t.fullNamePlaceholder || "Jean Dupont"}
                value={adresse.nomComplet}
                onChange={e => setAdresse({...adresse, nomComplet: e.target.value})}
              />
              {errors.nomComplet && <p className="text-red-500 text-xs mt-1">{errors.nomComplet}</p>}
            </div>
            <div>
              <label className="text-sm dark:text-gray-300"><T>phone</T></label>
              <input
                className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder={t.phonePlaceholder || "+237 6XX XXX XXX"}
                value={adresse.telephone}
                onChange={e => setAdresse({...adresse, telephone: e.target.value})}
              />
              {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
            </div>
            <div>
              <label className="text-sm dark:text-gray-300"><T>city</T></label>
              <select
                className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={adresse.ville}
                onChange={e => setAdresse({...adresse, ville: e.target.value})}
              >
                <option value="">{t.selectCityOption || "Sélectionnez"}</option>
                {villesCameroun.map(v => <option key={v}>{v}</option>)}
              </select>
              {errors.ville && <p className="text-red-500 text-xs mt-1">{errors.ville}</p>}
            </div>
            <div>
              <label className="text-sm dark:text-gray-300"><T>neighborhood</T></label>
              <input
                className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder={t.neighborhoodPlaceholder || "Bonamoussadi, Rue X"}
                value={adresse.quartier}
                onChange={e => setAdresse({...adresse, quartier: e.target.value})}
              />
              {errors.quartier && <p className="text-red-500 text-xs mt-1">{errors.quartier}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm dark:text-gray-300"><T>fullAddress</T></label>
              <textarea
                className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                rows="2"
                placeholder={t.fullAddressPlaceholder || "Immeuble, appartement..."}
                value={adresse.adresseComplete}
                onChange={e => setAdresse({...adresse, adresseComplete: e.target.value})}
              />
            </div>
          </div>

          <h3 className="font-semibold dark:text-white mt-4"><T>deliveryService</T></h3>
          {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}

          {!adresse.ville ? (
            <p className="text-sm text-gray-500 dark:text-gray-400"><T>selectCityFirst</T></p>
          ) : loadingLivreurs ? (
            <p className="text-sm text-gray-500 dark:text-gray-400"><T>loading</T></p>
          ) : livreurs.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400"><T>noLivreurAvailable</T></p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {livreurs.map(l => {
                const trajet = l.trajets.find(
                  t => t.ville_arrivee.toLowerCase() === adresse.ville.toLowerCase() && t.actif
                );
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handleChoisirLivreur(l)}
                    className={`p-3 border rounded-xl text-left transition ${livreur?.id === l.id ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" : "border-gray-200 dark:border-gray-600"}`}
                  >
                    <p className="font-semibold dark:text-white">{l.nom_complet}</p>
                    <p className="text-orange-500 text-sm font-bold mt-1">
                      {Number(trajet?.tarif || 0).toLocaleString()} FCFA
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {livreur && trajetChoisi && (
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl text-orange-700 dark:text-orange-400 text-sm">
              <T>estimatedFees</T> : {fraisLivraison.toLocaleString()} FCFA
            </div>
          )}
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold mt-6 transition-colors"
      >
        <T>continue</T>
      </button>
    </div>
  );
}