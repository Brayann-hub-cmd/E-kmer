// src/pages/Footer/Conditions.jsx
import { FaFileContract, FaUserCheck, FaBan, FaMoneyBillWave, FaTruck, FaHandshake } from "react-icons/fa";
import BackToHome from "../../Components/BackToHome";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

export default function Conditions() {
  const { t } = useAppContext(); // ← Récupère les traductions

  const articles = [
    { 
      icon: FaFileContract, 
      titleKey: "termsAcceptance", 
      contentKey: "termsAcceptanceDesc" 
    },
    { 
      icon: FaUserCheck, 
      titleKey: "userAccount", 
      contentKey: "userAccountDesc" 
    },
    { 
      icon: FaBan, 
      titleKey: "prohibitedAds", 
      contentKey: "prohibitedAdsDesc" 
    },
    { 
      icon: FaMoneyBillWave, 
      titleKey: "transactions", 
      contentKey: "transactionsDesc" 
    },
    { 
      icon: FaTruck, 
      titleKey: "delivery", 
      contentKey: "deliveryDesc" 
    },
    { 
      icon: FaHandshake, 
      titleKey: "buyerSellerRelation", 
      contentKey: "buyerSellerRelationDesc" 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          <T>termsTitle</T>
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="space-y-6">
            {articles.map((article, index) => (
              <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0 transition-colors duration-300">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <article.icon className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-black dark:text-white mb-2">
                    <T>{article.titleKey}</T>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    <T>{article.contentKey}</T>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center transition-colors duration-300">
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              <T>lastUpdated</T> {t.lastUpdatedDate || "15 mai 2026"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}