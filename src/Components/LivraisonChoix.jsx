// src/components/LivraisonChoix.jsx
import { useState } from "react";
import { FaMapMarkerAlt, FaStore, FaTruck, FaCheckCircle } from "react-icons/fa";

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

const servicesLivraison = [
  { id: "yoomee", nom: "Yoomee Delivery", tarifBase: 2000, tarifParKm: 150, delai: "24h" },
  { id: "campost", nom: "Campost Express", tarifBase: 1500, tarifParKm: 100, delai: "3-5 jours" },
  { id: "dhl_cm", nom: "DHL Cameroun", tarifBase: 5000, tarifParKm: 200, delai: "1-2 jours" },
  { id: "moto", nom: "MotoExpress CM", tarifBase: 1000, tarifParKm: 80, delai: "2-4h" },
];

export default function LivraisonChoix({ onValidate }) {
  const [modeLivraison, setModeLivraison] = useState("retrait");
  const [adresse, setAdresse] = useState({
    ville: "", quartier: "", adresseComplete: "", telephone: "", nomComplet: ""
  });
  const [service, setService] = useState(null);
  const [errors, setErrors] = useState({});

  const fraisRetrait = 0;
  const fraisLivraison = service && adresse.ville
    ? service.tarifBase + (distancesDepuisDouala[adresse.ville] || 0) * service.tarifParKm
    : 0;

  const handleSubmit = () => {
    const newErrors = {};
    if (modeLivraison === "domicile") {
      if (!adresse.nomComplet) newErrors.nomComplet = "Requis";
      if (!adresse.telephone) newErrors.telephone = "Requis";
      if (!adresse.ville) newErrors.ville = "Requis";
      if (!adresse.quartier) newErrors.quartier = "Requis";
      if (!service) newErrors.service = "Choisissez un service";
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onValidate({
      modeLivraison,
      ...(modeLivraison === "domicile" && { adresse, service, fraisLivraison }),
      fraisTotal: modeLivraison === "domicile" ? fraisLivraison : fraisRetrait
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Mode de livraison</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${modeLivraison === "retrait" ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}>
          <input type="radio" name="livraison" value="retrait" checked={modeLivraison === "retrait"} onChange={() => setModeLivraison("retrait")} className="hidden" />
          <FaStore className="text-2xl text-orange-500" />
          <div><p className="font-semibold">Retrait en magasin</p><p className="text-xs text-gray-500">Gratuit - Douala, Bonamoussadi</p></div>
          {modeLivraison === "retrait" && <FaCheckCircle className="text-orange-500 ml-auto" />}
        </label>
        
        <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${modeLivraison === "domicile" ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}>
          <input type="radio" name="livraison" value="domicile" checked={modeLivraison === "domicile"} onChange={() => setModeLivraison("domicile")} className="hidden" />
          <FaTruck className="text-2xl text-orange-500" />
          <div><p className="font-semibold">Livraison à domicile</p><p className="text-xs text-gray-500">Frais selon distance</p></div>
          {modeLivraison === "domicile" && <FaCheckCircle className="text-orange-500 ml-auto" />}
        </label>
      </div>

      {modeLivraison === "domicile" && (
        <div className="space-y-4 mt-4">
          <h3 className="font-semibold">Adresse de livraison</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm">Nom complet</label><input className="w-full p-3 border rounded-xl" placeholder="Jean Dupont" value={adresse.nomComplet} onChange={e => setAdresse({...adresse, nomComplet: e.target.value})} /></div>
            <div><label className="text-sm">Téléphone</label><input className="w-full p-3 border rounded-xl" placeholder="+237 6XX XXX XXX" value={adresse.telephone} onChange={e => setAdresse({...adresse, telephone: e.target.value})} /></div>
            <div><label className="text-sm">Ville</label><select className="w-full p-3 border rounded-xl" value={adresse.ville} onChange={e => setAdresse({...adresse, ville: e.target.value})}><option value="">Sélectionnez</option>{villesCameroun.map(v => <option key={v}>{v}</option>)}</select></div>
            <div><label className="text-sm">Quartier / Rue</label><input className="w-full p-3 border rounded-xl" placeholder="Bonamoussadi, Rue X" value={adresse.quartier} onChange={e => setAdresse({...adresse, quartier: e.target.value})} /></div>
            <div className="sm:col-span-2"><label className="text-sm">Adresse complète</label><textarea className="w-full p-3 border rounded-xl" rows="2" placeholder="Immeuble, appartement..." value={adresse.adresseComplete} onChange={e => setAdresse({...adresse, adresseComplete: e.target.value})} /></div>
          </div>

          <h3 className="font-semibold mt-4">Service de livraison</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {servicesLivraison.map(s => (
              <button key={s.id} type="button" onClick={() => setService(s)} className={`p-3 border rounded-xl text-left transition ${service?.id === s.id ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}>
                <p className="font-semibold">{s.nom}</p>
                <p className="text-xs text-gray-500">Délai {s.delai}</p>
                <p className="text-orange-500 text-sm font-bold mt-1">À partir de {s.tarifBase.toLocaleString()} FCFA</p>
              </button>
            ))}
          </div>
          {service && adresse.ville && <div className="bg-orange-50 p-3 rounded-xl text-orange-700 text-sm">Frais estimés : {fraisLivraison.toLocaleString()} FCFA</div>}
        </div>
      )}
      <button onClick={handleSubmit} className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold mt-6">Continuer</button>
    </div>
  );
}