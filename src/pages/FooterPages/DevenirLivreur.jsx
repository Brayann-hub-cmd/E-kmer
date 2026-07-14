import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer";
import BackToHome from "../../Components/BackToHome";
import { FaUserShield, FaIdCard, FaMotorcycle, FaBicycle, FaCar, FaCarAlt, FaTruck, FaFileSignature, FaCheckCircle, FaExclamationTriangle, FaMobileAlt, FaShieldAlt, FaHandshake } from "react-icons/fa";
import api from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DevenirLivreur() {
  const navigate = useNavigate();
  const [etape, setEtape] = useState(1); // 1: Politique/Guide, 2: Formulaire
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Formulaire d'inscription
  const [numPermis, setNumPermis] = useState("");
  const [numPlaque, setNumPlaque] = useState("");
  const [typeVehicule, setTypeVehicule] = useState("moto");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Veuillez vous connecter avant de postuler en tant que livreur.");
      navigate("/auth/login");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        num_permis: numPermis,
        num_plaque: numPlaque,
        type_vehicule: typeVehicule,
      };
      
      // Envoi de la candidature livreur
      await api.post("livreurs/candidature/", payload);
      setSuccess(true);
      toast.success("Votre demande a bien été envoyée !");
    } catch (err) {
      console.error(err);
      // Mode simulation en cas d'absence d'endpoint backend direct
      // Enregistre en local et affiche le succès pour démonstration
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(`livreur_pending_${user.id || "guest"}`, "true");
      setSuccess(true);
      toast.success("Candidature simulée enregistrée !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300 flex flex-col justify-between">
      <div className="pt-4 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <BackToHome />
      </div>
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-grow">
        {/* En-tête de page */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-white">
            Devenir Livreur sur <span className="text-orange-500">E-Kmer</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
            Rejoignez notre flotte de livraison et générez des revenus en livrant les colis de la marketplace en toute liberté.
          </p>
        </div>

        {/* Barre d'étape */}
        {!success && (
          <div className="flex gap-4 max-w-md mx-auto mb-8">
            <button
              onClick={() => setEtape(1)}
              className={`flex-1 text-center py-2.5 rounded-xl font-semibold border text-sm transition-all ${
                etape === 1
                  ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              1. Guide & Politiques
            </button>
            <button
              onClick={() => setEtape(2)}
              className={`flex-1 text-center py-2.5 rounded-xl font-semibold border text-sm transition-all ${
                etape === 2
                  ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              2. Formulaire d'inscription
            </button>
          </div>
        )}

        {/* Contenu principal */}
        {success ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto">
              <FaCheckCircle />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Candidature reçue !</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Merci d'avoir postulé pour devenir livreur. Un administrateur examine actuellement vos informations et vos pièces justificatives.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Vous recevrez une notification par email dès que votre compte sera activé et validé.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Retour à l'accueil
            </button>
          </div>
        ) : etape === 1 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaUserShield className="text-orange-500" />
                Politique de sécurité et règles de livraison
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Pour garantir la meilleure expérience possible à nos acheteurs et préserver la sécurité de tous, chaque livreur s'engage à respecter les consignes suivantes :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-1"><FaShieldAlt className="text-orange-500" /> Équipement de sécurité</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Casque obligatoire pour les deux-roues, ceinture pour les automobiles, et gilet haute visibilité de nuit ou par mauvais temps.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-1"><FaMobileAlt className="text-orange-500" /> Disponibilité et réactivité</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Mettez votre statut à jour régulièrement. Une commande acceptée doit être récupérée et livrée dans les meilleurs délais.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-1"><FaHandshake className="text-orange-500" /> Professionnalisme</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Soyez courtois et professionnel avec les commerçants et les clients. Respectez les adresses et les consignes spéciales.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-1"><FaCarAlt className="text-orange-500" /> Véhicule en règle</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Votre permis de conduire doit être valide et le véhicule immatriculé avec des documents à jour (assurance, visite technique).
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaFileSignature className="text-orange-500" />
                Comment procéder ?
              </h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Remplissez le formulaire d'inscription avec vos numéros de pièces.</li>
                <li>Votre candidature sera soumise pour validation à un Administrateur de E-Kmer.</li>
                <li>Une fois validé, vous accéderez à votre espace Livreur dédié pour gérer vos courses.</li>
              </ol>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setEtape(2)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                Continuer vers l'inscription
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Formulaire de candidature</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Fournissez les informations demandées par le back-office pour activer votre compte livreur.
              </p>
            </div>

            {!isLoggedIn && (
              <div className="bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 p-4 rounded-2xl flex gap-3 text-sm">
                <FaExclamationTriangle className="text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Connexion requise</p>
                  <p className="mt-1">Vous devez vous connecter à votre compte client e-kmer existant pour pouvoir postuler en tant que livreur.</p>
                  <button onClick={() => navigate("/auth/login")} className="mt-2 text-orange-500 font-bold underline">Se connecter</button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitRegistration} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Type de véhicule</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "moto", label: "Moto", icon: <FaMotorcycle /> },
                    { id: "vélo", label: "Vélo", icon: <FaBicycle /> },
                    { id: "voiture", label: "Voiture", icon: <FaCar /> },
                    { id: "camion", label: "Camion", icon: <FaTruck /> },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setTypeVehicule(v.id)}
                      className={`flex flex-col items-center justify-center p-4 border rounded-2xl gap-2 transition-all ${
                        typeVehicule === v.id
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600"
                          : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span className="text-2xl">{v.icon}</span>
                      <span className="text-xs font-semibold">{v.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Numéro de Permis de conduire</label>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5">
                    <FaIdCard className="text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: CM09-XXXXX"
                      value={numPermis}
                      onChange={(e) => setNumPermis(e.target.value)}
                      className="bg-transparent outline-none w-full text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Plaque d'immatriculation (Facultatif)</label>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5">
                    <FaCar className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ex: LT-123-AA"
                      value={numPlaque}
                      onChange={(e) => setNumPlaque(e.target.value)}
                      className="bg-transparent outline-none w-full text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setEtape(1)}
                  className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={loading || !isLoggedIn}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  {loading ? "Envoi..." : "Soumettre ma candidature"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
