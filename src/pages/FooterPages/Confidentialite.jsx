// src/pages/Footer/Confidentialite.jsx
import { FaDatabase, FaCookie, FaUserSecret, FaRegClock } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import BackToHome from "../../components/BackToHome";
import T from "../../components/T"; // ← IMPORT

export default function Confidentialite() {
  const { t } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          <T>privacyTitle</T>
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="space-y-6">
            {/* Collecte */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaDatabase className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white mb-2">
                  <T>dataCollection</T>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  <T>dataCollectionDesc</T>
                </p>
              </div>
            </div>

            {/* Utilisation */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaUserSecret className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white mb-2">
                  <T>dataUsage</T>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  <T>dataUsageDesc</T>
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaCookie className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white mb-2">
                  <T>cookies</T>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  <T>cookiesDesc</T>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300">
            <FaRegClock className="text-gray-400 dark:text-gray-500 text-xs" />
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              <T>lastUpdated</T> {t.lastUpdatedDate || "15 mai 2026"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}