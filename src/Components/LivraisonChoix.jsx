// src/components/LivraisonChoix.jsx
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaStore, FaTruck, FaCheckCircle, FaMotorcycle, FaBicycle, FaCar, FaUserTie } from "react-icons/fa";
import api from "../api";

import { useAppContext } from "../context/AppContext"; // ← IMPORT
import T from "../components/T"; // ← IMPORT

const villesCameroun = [
  "Douala", "Yaoundé", "Bafoussam", "Garoua", "Maroua",
  "Ngaoundéré", "Bamenda", "Bertoua", "Ebolowa", "Kribi",
  "Limbe", "Buea", "Dschang", "Foumban", "Mbalmayo",
];

const distancesDepuisDouala = {
  "Douala": 0, "Yaoundé": 240, "Bafoussam": 280, "Garoua": 780,
  "Maroua": 1050, "Ngaoundéré": 570, "Bamenda": 360, "Bertoua": 450,
  "Ebolowa": 190, "Kribi": 150, "Limbe": 70, "Buea": 65,
  "Dschang": 300, "Foumban": 320, "Mbalmayo": 245,
};

const vehicleIcons = {
  moto: <FaMotorcycle className="text-xl text-orange-500" />,
  vélo: <FaBicycle className="text-xl text-orange-500" />,
  voiture: <FaCar className="text-xl text-orange-500" />,
  camion: <FaTruck className="text-xl text-orange-500" />,
};

// Fallback livreurs si le backend n'a pas encore de données
const mockLivreurs = [
  { id: 1, user: { username: "Amadou Diallo" }, type_vehicule: "moto", num_plaque: "LT-890-EF", statut: "disponible", avatar: "" },
  { id: 2, user: { username: "Christian Talla" }, type_vehicule: "vélo", num_plaque: "", statut: "disponible", avatar: "" },
  { id: 3, user: { username: "Joseph Nsame" }, type_vehicule: "voiture", num_plaque: "CE-441-GH", statut: "disponible", avatar: "" },
];

export default function LivraisonChoix({ onValidate }) {
  const { t } = useAppContext(); // ← Récupère les traductions
  const [modeLivraison, setModeLivraison] = useState("retrait");
  const [adresse, setAdresse] = useState({
    ville: "", quartier: "", adresseComplete: "", telephone: "", nomComplet: ""
  });
  
  const [livreurs, setLivreurs] = useState([]);
  const [selectedLivreur, setSelectedLivreur] = useState(null);
  const [loadingLivreurs, setLoadingLivreurs] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (modeLivraison === "domicile") {
      fetchLivreurs();
    }
  }, [modeLivraison]);

  const fetchLivreurs = async () => {
    setLoadingLivreurs(true);
    try {
      const response = await api.get("livreurs/");
      const data = Array.isArray(response.data) ? response.data : [];
      // Filtrer les livreurs validés et disponibles ou available
      const disponibles = data.filter(
        (l) => (l.statut === "disponible" || l.statut === "available" || l.status === "disponible")
      );
      setLivreurs(disponibles.length > 0 ? disponibles : mockLivreurs);
    } catch (err) {
      console.error("Erreur de récupération des livreurs:", err);
      setLivreurs(mockLivreurs);
    } finally {
      setLoadingLivreurs(false);
    }
  };

  // Calcul dynamique des frais de livraison en fonction de la distance et du véhicule du livreur
  const getFraisLivraison = () => {
    if (!adresse.ville || !selectedLivreur) return 0;
    
    // Tarif de base par véhicule
    const tarifsBase = {
      vélo: 800,
      moto: 1200,
      voiture: 2500,
      camion: 5000,
    };
    
    const base = tarifsBase[selectedLivreur.type_vehicule] || 1200;
    const distance = distancesDepuisDouala[adresse.ville] || 0;
    
    // Tarif par kilomètre
    const tarifKm = selectedLivreur.type_vehicule === "vélo" ? 40 : 80;
    
    return base + (distance * tarifKm);
  };

  const fraisRetrait = 0;
  const fraisLivraison = getFraisLivraison();

  const handleSubmit = () => {
    const newErrors = {};
    if (modeLivraison === "domicile") {
      if (!adresse.nomComplet) newErrors.nomComplet = t.required || "Requis";
      if (!adresse.telephone) newErrors.telephone = t.required || "Requis";
      if (!adresse.ville) newErrors.ville = t.required || "Requis";
      if (!adresse.quartier) newErrors.quartier = t.required || "Requis";
      if (!selectedLivreur) newErrors.livreur = t.chooseLivreur || "Veuillez choisir un livreur";
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    
    onValidate({
      modeLivraison,
      ...(modeLivraison === "domicile" && {
        adresse,
        livreur: selectedLivreur,
        fraisLivraison
      }),
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
          <h3 className="font-semibold dark:text-white">
            <T>deliveryAddress</T>
          </h3>
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

          <h3 className="font-semibold dark:text-white mt-4">
            <T>chooseLivreur</T>
          </h3>
          {errors.livreur && <p className="text-red-500 text-xs mt-1">{errors.livreur}</p>}
          
          {loadingLivreurs ? (
            <p className="text-gray-500 text-sm">
              <T>loadingLivreurs</T>
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {livreurs.map((l) => {
                const vehicleType = String(l.type_vehicule || "moto").toLowerCase();
                const icon = vehicleIcons[vehicleType] || vehicleIcons.moto;

                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setSelectedLivreur(l)}
                    className={`p-4 border rounded-xl text-left flex items-center gap-3 transition-all ${
                      selectedLivreur?.id === l.id
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0 overflow-hidden">
                      {l.avatar ? (
                        <img src={l.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FaUserTie className="text-xl" />
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <p className="font-bold text-sm text-gray-900 dark:text-white">
                        {l.user?.username || l.username || l.nom || "Livreur disponible"}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                        {icon}
                        <span className="capitalize">{vehicleType}</span>
                        {l.num_plaque && <span>({l.num_plaque})</span>}
                      </div>
                    </div>
                    
                    {selectedLivreur?.id === l.id && (
                      <FaCheckCircle className="text-orange-500 text-xl ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
          
          {selectedLivreur && adresse.ville && (
            <div className="bg-orange-50 dark:bg-orange-950/10 p-4 rounded-xl text-orange-700 dark:text-orange-400 text-sm flex justify-between items-center mt-4">
              <span><T>selectedLivreur</T> : <strong>{selectedLivreur.user?.username || selectedLivreur.nom}</strong></span>
              <strong className="text-base">{fraisLivraison.toLocaleString()} FCFA</strong>
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