// src/pages/Footer/CentreAide.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaEnvelope, FaTrash } from "react-icons/fa";
import BackToHome from "../../Components/BackToHome";

export default function CentreAide() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "Comment créer un compte ?", a: "Cliquez sur 'S'inscrire' en haut à droite, remplissez le formulaire et validez." },
    { q: "Comment publier une annonce ?", a: "Connectez-vous, allez dans votre profil et cliquez sur 'Publier un produit'." },
    { q: "Les paiements sont-ils sécurisés ?", a: "Oui, tous les paiements sont 100% sécurisés via Orange Money et MTN Mobile Money, directement intégrés à la plateforme." },
    { q: "Que faire si je ne reçois pas ma commande ?", a: "Contactez notre support client via la plateforme. Nous ferons le nécessaire avec le service de livraison pour résoudre le problème." },
    { q: "Comment supprimer mon compte ?", a: "Une page de suppression de compte sera bientôt disponible. En attendant, contactez notre support à support@e-kmer.com." }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Centre d'aide</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Trouvez rapidement des réponses à vos questions</p>

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
                    <span className="font-medium text-black dark:text-white text-sm">{faq.q}</span>
                  </div>
                  {openIndex === index ? (
                    <FaChevronUp className="text-gray-400 dark:text-gray-500 text-sm" />
                  ) : (
                    <FaChevronDown className="text-gray-400 dark:text-gray-500 text-sm" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 pt-0 pl-11 text-gray-500 dark:text-gray-300 text-sm border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 transition-colors duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-center border border-orange-100 dark:border-orange-800 transition-colors duration-300">
            <p className="text-black dark:text-white text-sm">Vous n'avez pas trouvé votre réponse ?</p>
            <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mx-auto">
              <FaEnvelope className="text-sm" /> Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}