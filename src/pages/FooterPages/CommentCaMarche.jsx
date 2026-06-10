// src/pages/Footer/CommentCaMarche.jsx
import { FaSearch, FaShoppingCart, FaCreditCard, FaUserPlus, FaImage, FaChartLine } from "react-icons/fa";
import BackToHome from "../../Components/BackToHome";

export default function CommentCaMarche() {
  const acheteurSteps = [
    { icon: FaSearch, title: "Parcourez les annonces", desc: "Explorez les milliers d'articles disponibles sur la plateforme" },
    { icon: FaShoppingCart, title: "Ajoutez au panier", desc: "Sélectionnez vos articles et ajoutez-les à votre panier" },
    { icon: FaCreditCard, title: "Finalisez votre achat", desc: "Payez en toute sécurité via Orange Money ou MTN Mobile Money" }
  ];

  const vendeurSteps = [
    { icon: FaUserPlus, title: "Créez un compte", desc: "Inscrivez-vous gratuitement sur la plateforme" },
    { icon: FaImage, title: "Publiez vos articles", desc: "Ajoutez des photos, un prix et une description" },
    { icon: FaChartLine, title: "Gérez vos ventes", desc: "Suivez vos commandes et gérez votre activité depuis votre tableau de bord" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black mb-6">Comment ça marche ?</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Acheteur */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <FaSearch className="text-white text-sm" />
              </div>
              <h2 className="text-xl font-bold text-black">Pour les acheteurs</h2>
            </div>
            <div className="space-y-5">
              {acheteurSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-500 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="text-orange-500 text-sm" />
                      <h3 className="font-semibold text-black">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">{step.desc}</p>
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
              <h2 className="text-xl font-bold text-black">Pour les vendeurs</h2>
            </div>
            <div className="space-y-5">
              {vendeurSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-500 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="text-orange-500 text-sm" />
                      <h3 className="font-semibold text-black">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">{step.desc}</p>
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