// src/pages/Footer/CommentCaMarche.jsx
import { FaSearch, FaShoppingCart, FaCreditCard, FaUserPlus, FaImage, FaChartLine } from "react-icons/fa";
import BackToHome from "../../components/BackToHome";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

export default function CommentCaMarche() {
  const { t } = useAppContext(); // ← Récupère les traductions

  // Étapes pour les acheteurs
  const acheteurSteps = [
    { icon: FaSearch, titleKey: "browseAds", descKey: "browseAdsDesc" },
    { icon: FaShoppingCart, titleKey: "addToCart", descKey: "addToCartDesc" },
    { icon: FaCreditCard, titleKey: "checkout", descKey: "checkoutDesc" }
  ];

  // Étapes pour les vendeurs
  const vendeurSteps = [
    { icon: FaUserPlus, titleKey: "createAccount", descKey: "createAccountDesc" },
    { icon: FaImage, titleKey: "publishItems", descKey: "publishItemsDesc" },
    { icon: FaChartLine, titleKey: "manageSales", descKey: "manageSalesDesc" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          <T>howItWorks</T>
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          {/* Acheteur */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <FaSearch className="text-white text-sm" />
              </div>
              <h2 className="text-xl font-bold text-black dark:text-white">
                <T>forBuyers</T>
              </h2>
            </div>
            <div className="space-y-5">
              {acheteurSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <span className="text-orange-500 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="text-orange-500 text-sm" />
                      <h3 className="font-semibold text-black dark:text-white">
                        <T>{step.titleKey}</T>
                      </h3>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      <T>{step.descKey}</T>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendeur */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <FaUserPlus className="text-white text-sm" />
              </div>
              <h2 className="text-xl font-bold text-black dark:text-white">
                <T>forSellers</T>
              </h2>
            </div>
            <div className="space-y-5">
              {vendeurSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <span className="text-orange-500 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="text-orange-500 text-sm" />
                      <h3 className="font-semibold text-black dark:text-white">
                        <T>{step.titleKey}</T>
                      </h3>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      <T>{step.descKey}</T>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}