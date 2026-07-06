// src/pages/Footer/Securite.jsx
import { FaShieldAlt, FaLock, FaUserSecret, FaExclamationTriangle } from "react-icons/fa";
import BackToHome from "../../Components/BackToHome";

export default function Securite() {
  const conseils = [
    "Ne partagez jamais votre mot de passe",
    "Vérifiez toujours le profil du vendeur avant d'acheter",
    "Utilisez notre système de paiement sécurisé",
    "Signalez tout comportement suspect"
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Sécurité</h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6 transition-colors duration-300">
          {/* Protection des données */}
          <div className="flex gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800 transition-colors duration-300">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FaShieldAlt className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white mb-1">Vos données sont protégées</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Chez E-kmer, la sécurité de vos données personnelles est notre priorité. 
                Toutes vos informations sont cryptées et ne sont jamais partagées avec des tiers.
              </p>
            </div>
          </div>

          {/* Conseils */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <FaLock className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black dark:text-white mb-3">Conseils de sécurité</h2>
              <ul className="space-y-2">
                {conseils.map((conseil, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    {conseil}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alerte */}
          <div className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800 transition-colors duration-300">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FaExclamationTriangle className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-1">En cas de problème</h2>
              <p className="text-red-600 dark:text-red-300 text-sm">
                Contactez-nous immédiatement à <span className="font-mono">securite@e-kmer.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}