// src/pages/Footer/Confidentialite.jsx
import { FaDatabase, FaCookie, FaUserSecret, FaRegClock } from "react-icons/fa";
import BackToHome from "../../Components/BackToHome";

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Politique de confidentialité</h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="space-y-6">
            {/* Collecte */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaDatabase className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white mb-2">Collecte des informations</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Nous collectons les informations que vous nous fournissez lors de votre inscription et de vos transactions sur la plateforme.
                </p>
              </div>
            </div>

            {/* Utilisation */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaUserSecret className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white mb-2">Utilisation des données</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Vos données sont utilisées uniquement pour améliorer votre expérience sur la plateforme et faciliter vos transactions.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaCookie className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white mb-2">Cookies</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Nous utilisons des cookies pour personnaliser votre navigation et vous offrir une meilleure expérience.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300">
            <FaRegClock className="text-gray-400 dark:text-gray-500 text-xs" />
            <p className="text-gray-400 dark:text-gray-500 text-xs">Dernière mise à jour : 15 mai 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}