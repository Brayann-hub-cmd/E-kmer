// src/pages/FooterPages/CommentVendre.jsx
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const HowToSell = () => {
  const { t } = useAppContext();

  const steps = [
    {
      icon: '📝',
      title: t.step1Title || 'Créez votre compte',
      description: t.step1Desc || 'Inscrivez-vous gratuitement sur E-kmer en quelques minutes.'
    },
    {
      icon: '📸',
      title: t.step2Title || 'Prenez des photos de votre article',
      description: t.step2Desc || 'Des photos claires et bien éclairées attirent plus d\'acheteurs.'
    },
    {
      icon: '✍️',
      title: t.step3Title || 'Rédigez une description détaillée',
      description: t.step3Desc || 'Indiquez l\'état, la marque, le modèle et toutes les caractéristiques importantes.'
    },
    {
      icon: '💰',
      title: t.step4Title || 'Fixez un prix juste',
      description: t.step4Desc || 'Consultez les prix du marché pour être compétitif.'
    },
    {
      icon: '📤',
      title: t.step5Title || 'Publiez votre annonce',
      description: t.step5Desc || 'En un clic, votre article est visible par des milliers d\'acheteurs.'
    },
    {
      icon: '🤝',
      title: t.step6Title || 'Finalisez la vente',
      description: t.step6Desc || 'Discutez avec l\'acheteur, convenez du mode de livraison et du paiement.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comment vendre ?
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Mettez vos produits en vente en quelques clics.
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
            to="/publier"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Commencer à vendre
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowToSell;