// src/pages/Footer/Apropos.jsx
import { FaBullseye, FaHistory, FaHandshake, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import BackToHome from "../../Components/BackToHome";

export default function Apropos() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">À propos de E-kmer</h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6 transition-colors duration-300">
          {/* Mission */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <FaBullseye className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white mb-2">Notre mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                E-kmer est une plateforme de vente en ligne dédiée aux Camerounais. 
                Notre mission est de faciliter les échanges entre acheteurs et vendeurs 
                partout au Cameroun.
              </p>
            </div>
          </div>

          {/* Histoire */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <FaHistory className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white mb-2">Notre histoire</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Fondée en 2024, E-kmer est née de la volonté de créer un espace de confiance 
                où les Camerounais peuvent acheter et vendre leurs articles en toute simplicité.
              </p>
            </div>
          </div>

          {/* Valeurs */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <FaHandshake className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white mb-2">Nos valeurs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Confiance et transparence</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Proximité avec nos utilisateurs</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Simplicité et rapidité</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Fierté camerounaise</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <FaMapMarkerAlt className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black dark:text-white mb-2">Contact</h2>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                  <FaMapMarkerAlt className="text-orange-500 text-xs" /> Douala, Cameroun
                </p>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                  <FaPhone className="text-orange-500 text-xs" /> +237 6XX XXX XXX
                </p>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                  <FaEnvelope className="text-orange-500 text-xs" /> contact@e-kmer.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}