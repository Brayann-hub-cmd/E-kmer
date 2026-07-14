import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer";
import BackToHome from "../../Components/BackToHome";
import { FaMotorcycle, FaBicycle, FaCar, FaTruck, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaPhoneAlt, FaDollarSign, FaBoxes, FaUserTie } from "react-icons/fa";
import api from "../../api";
import toast from "react-hot-toast";

const statusConfig = {
  disponible: { label: "Disponible", color: "bg-green-100 text-green-700 border-green-200" },
  occupé: { label: "Occupé (En course)", color: "bg-orange-100 text-orange-700 border-orange-200" },
  "hors ligne": { label: "Hors ligne", color: "bg-gray-100 text-gray-700 border-gray-200" },
};

const vehicleIcons = {
  moto: <FaMotorcycle />,
  vélo: <FaBicycle />,
  voiture: <FaCar />,
  camion: <FaTruck />,
};

// Commandes de livraison de démo si l'API n'a rien
const mockDeliveries = [
  {
    id: "CMD-2026-981",
    client: "Alice Ngo",
    telephone: "+237 677 889 900",
    ville: "Douala",
    quartier: "Bonapriso",
    adresseComplete: "Rue des Palmiers, Immeuble Horizon, Apt 4B",
    articles: "1x Smartphone Tecno Spark 20, 1x Écouteurs sans fil",
    total: 125000,
    fraisLivraison: 2000,
    statut: "En cours", // "En cours", "Livrée", "Annulée"
  },
  {
    id: "CMD-2026-772",
    client: "Marc Ebanda",
    telephone: "+237 699 112 233",
    ville: "Douala",
    quartier: "Akwa",
    adresseComplete: "Boulevard de la Liberté, face Direction Orange",
    articles: "2x T-Shirts E-Kmer Orange M",
    total: 15000,
    fraisLivraison: 1500,
    statut: "Livrée",
  }
];

export default function LivreurDashboard() {
  const [livreurInfo, setLivreurInfo] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [statutActuel, setStatutActuel] = useState("hors ligne");
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("toutes"); // "toutes", "en_cours", "livrees"

  useEffect(() => {
    loadLivreurProfile();
  }, []);

  const loadLivreurProfile = async () => {
    setLoading(true);
    try {
      // Tente de récupérer les informations du livreur
      const res = await api.get("livreurs/profil/");
      setLivreurInfo(res.data);
      setStatutActuel(res.data.statut || "hors ligne");
      
      // Charge les commandes assignées
      const cmdRes = await api.get("commandes/livreur/");
      setDeliveries(Array.isArray(cmdRes.data) ? cmdRes.data : mockDeliveries);
    } catch (err) {
      console.warn("API Livreur non connectée, utilisation du profil démo.");
      // Profil démo basé sur l'utilisateur connecté
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setLivreurInfo({
        id: 99,
        user: user,
        type_vehicule: "moto",
        num_permis: "CM20-7716-AA",
        num_plaque: "LT-554-BC",
        statut: "hors ligne",
      });
      setDeliveries(mockDeliveries);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (nouveauStatut) => {
    try {
      // Appel API pour changer le statut
      await api.patch(`livreurs/status/`, { statut: nouveauStatut });
      setStatutActuel(nouveauStatut);
      toast.success(`Statut mis à jour : ${nouveauStatut}`);
    } catch (err) {
      // Fallback local
      setStatutActuel(nouveauStatut);
      toast.success(`Statut simulé : ${nouveauStatut}`);
    }
  };

  const handleUpdateDeliveryStatus = async (deliveryId, nouveauStatut) => {
    try {
      await api.patch(`commandes/${deliveryId}/livraison/`, { statut: nouveauStatut });
      toast.success(`Commande mise à jour : ${nouveauStatut}`);
      loadLivreurProfile();
    } catch (err) {
      // Fallback local pour démo
      setDeliveries(prev =>
        prev.map(d => d.id === deliveryId ? { ...d, statut: nouveauStatut } : d)
      );
      toast.success(`Commande simulée mise à jour : ${nouveauStatut}`);
    }
  };

  const filteredDeliveries = deliveries.filter(d => {
    if (activeFilter === "en_cours") return d.statut === "En cours" || d.statut === "En livraison";
    if (activeFilter === "livrees") return d.statut === "Livrée" || d.statut === "Completed";
    return true;
  });

  const totals = {
    courses: deliveries.filter(d => d.statut === "Livrée" || d.statut === "Completed").length,
    gain: deliveries
      .filter(d => d.statut === "Livrée" || d.statut === "Completed")
      .reduce((sum, d) => sum + (d.fraisLivraison || 1500), 0)
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col justify-between transition-colors duration-300">
      <div className="pt-4 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <BackToHome />
      </div>
      <main className="container mx-auto px-4 py-8 max-w-5xl flex-grow space-y-6">
        {/* Titre & Statut */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center text-2xl overflow-hidden">
              {livreurInfo?.user?.avatar ? (
                <img src={livreurInfo.user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <FaUserTie />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-990 dark:text-white">
                Espace Livreur - {livreurInfo?.user?.username || "Livreur"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                <span className="text-orange-500">{vehicleIcons[livreurInfo?.type_vehicule] || vehicleIcons.moto}</span>
                <span className="capitalize">{livreurInfo?.type_vehicule}</span>
                {livreurInfo?.num_plaque && <span>({livreurInfo.num_plaque})</span>}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Votre Statut :</span>
            <div className="flex border rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-700">
              {["hors ligne", "disponible", "occupé"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`px-4 py-2 text-xs font-bold capitalize transition-all ${
                    statutActuel === s
                      ? s === "disponible"
                        ? "bg-green-500 text-white"
                        : s === "occupé"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-500 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats de Gains */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-xl shrink-0">
              <FaDollarSign />
            </div>
            <div>
              <p className="text-xs text-gray-400">Gains des livraisons</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">
                {totals.gain.toLocaleString()} FCFA
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl shrink-0">
              <FaCheckCircle />
            </div>
            <div>
              <p className="text-xs text-gray-400">Courses terminées</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">
                {totals.courses}
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-xl shrink-0">
              <FaBoxes />
            </div>
            <div>
              <p className="text-xs text-gray-400">Courses en cours</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">
                {deliveries.filter(d => d.statut === "En cours" || d.statut === "En livraison").length}
              </h3>
            </div>
          </div>
        </div>

        {/* Filtrage & Liste des Courses */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vos courses assignées</h2>
            <div className="flex gap-2">
              {[
                { id: "toutes", label: "Toutes" },
                { id: "en_cours", label: "En cours" },
                { id: "livrees", label: "Livrées" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    activeFilter === filter.id
                      ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                      : "bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDeliveries.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 text-center border border-gray-100 dark:border-gray-700 md:col-span-2">
                <p className="text-gray-500 dark:text-gray-400">Aucune commande trouvée avec ce filtre.</p>
              </div>
            ) : (
              filteredDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header course */}
                    <div className="flex justify-between items-center border-b pb-3 border-gray-100 dark:border-gray-700">
                      <div>
                        <span className="text-xs font-semibold text-gray-400">ID de Commande</span>
                        <p className="font-bold text-gray-900 dark:text-white">{delivery.id}</p>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          delivery.statut === "Livrée" || delivery.statut === "Completed"
                            ? "bg-green-100 text-green-700"
                            : delivery.statut === "Annulée" || delivery.statut === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {delivery.statut}
                      </span>
                    </div>

                    {/* Articles */}
                    <div>
                      <span className="text-xs font-semibold text-gray-400">Articles à livrer</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{delivery.articles}</p>
                    </div>

                    {/* Destination */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FaMapMarkerAlt className="text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">{delivery.ville}, {delivery.quartier}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{delivery.adresseComplete}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FaPhoneAlt className="text-orange-500 shrink-0" />
                        <span>Client : <strong>{delivery.client}</strong> ({delivery.telephone})</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {(delivery.statut === "En cours" || delivery.statut === "En livraison") && (
                    <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => handleUpdateDeliveryStatus(delivery.id, "Livrée")}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <FaCheckCircle />
                        Marquer Livrée
                      </button>
                      <button
                        onClick={() => handleUpdateDeliveryStatus(delivery.id, "Annulée")}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <FaTimesCircle />
                        Annuler la course
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
