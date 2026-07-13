// src/pages/FooterPages/CommentAcheter.jsx
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const HowToBuy = () => {
  const { t } = useAppContext();

  const steps = [
    {
      icon: '🔍',
      title: t.buyStep1Title || 'Parcourez les annonces',
      description: t.buyStep1Desc || 'Explorez des milliers d\'articles dans toutes les catégories.'
    },
    {
      icon: '❤️',
      title: t.buyStep2Title || 'Ajoutez aux favoris',
      description: t.buyStep2Desc || 'Sauvegardez les articles qui vous intéressent pour les retrouver facilement.'
    },
    {
      icon: '💬',
      title: t.buyStep3Title || 'Contactez le vendeur',
      description: t.buyStep3Desc || 'Posez vos questions via la messagerie intégrée.'
    },
    {
      icon: '🛒',
      title: t.buyStep4Title || 'Ajoutez au panier',
      description: t.buyStep4Desc || 'Regroupez vos achats et préparez votre commande.'
    },
    {
      icon: '💳',
      title: t.buyStep5Title || 'Payez en toute sécurité',
      description: t.buyStep5Desc || 'Utilisez Mobile Money ou carte bancaire via notre plateforme sécurisée.'
    },
    {
      icon: '🚚',
      title: t.buyStep6Title || 'Recevez votre commande',
      description: t.buyStep6Desc || 'Choisissez la livraison à domicile ou le retrait en magasin.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comment acheter ?
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Suivez les étapes ci-dessous pour acheter en toute simplicité sur E-kmer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Explorer les articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;