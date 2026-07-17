// src/pages/Footer/CentreAide.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaEnvelope, FaTrash } from "react-icons/fa";
import BackToHome from "../../Components/BackToHome";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

export default function CentreAide() {
  const { t } = useAppContext(); // ← Récupère les traductions
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ - Utilisation des clés traduites
  const faqs = [
    { 
      qKey: "faq1Question", 
      aKey: "faq1Answer" 
    },
    { 
      qKey: "faq2Question", 
      aKey: "faq2Answer" 
    },
    { 
      qKey: "faq3Question", 
      aKey: "faq3Answer" 
    },
    { 
      qKey: "faq4Question", 
      aKey: "faq4Answer" 
    },
    { 
      qKey: "faq5Question", 
      aKey: "faq5Answer" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          <T>helpCenter</T>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          <T>helpCenterSubtitle</T>
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden transition-colors duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaQuestionCircle className="text-orange-500 text-sm" />
                    <span className="font-medium text-black dark:text-white text-sm">
                      <T>{faq.qKey}</T>
                    </span>
                  </div>
                  {openIndex === index ? (
                    <FaChevronUp className="text-gray-400 dark:text-gray-500 text-sm" />
                  ) : (
                    <FaChevronDown className="text-gray-400 dark:text-gray-500 text-sm" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 pt-0 pl-11 text-gray-500 dark:text-gray-300 text-sm border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 transition-colors duration-300">
                    <T>{faq.aKey}</T>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-center border border-orange-100 dark:border-orange-800 transition-colors duration-300">
            <p className="text-black dark:text-white text-sm">
              <T>helpNotFound</T>
            </p>
            <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mx-auto">
              <FaEnvelope className="text-sm" /> <T>contactUs</T>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}