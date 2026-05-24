// src/pages/Footer/Conditions.jsx
import { FaFileContract, FaUserCheck, FaBan, FaMoneyBillWave, FaTruck, FaHandshake } from "react-icons/fa";
import BackToHome from "../../Components/BackToHome";

export default function Conditions() {
  const articles = [
    { icon: FaFileContract, title: "Acceptation des conditions", content: "En utilisant E-kmer, vous acceptez pleinement les présentes conditions d'utilisation." },
    { icon: FaUserCheck, title: "Compte utilisateur", content: "Vous êtes responsable de la confidentialité de votre compte et de toutes les activités qui s'y déroulent." },
    { icon: FaBan, title: "Annonces interdites", content: "Les annonces doivent être conformes à la loi et ne doivent pas contenir de contenu illégal ou frauduleux." },
    { icon: FaMoneyBillWave, title: "Transactions", content: "Toutes les transactions financières sont sécurisées et traitées directement par E-kmer via nos partenaires de paiement (Orange Money, MTN Mobile Money)." },
    { icon: FaTruck, title: "Livraison", content: "Les livraisons sont assurées par nos services partenaires (Yoomee, Campost, DHL, MotoExpress). Le suivi des commandes est disponible depuis votre espace client." },
    { icon: FaHandshake, title: "Relation acheteur-vendeur", content: "E-kmer est l'intermédiaire unique entre acheteurs et vendeurs. Toutes les transactions, livraisons et communications passent exclusivement par la plateforme." }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <BackToHome />
        <h1 className="text-3xl font-bold text-black mb-6">Conditions d'utilisation</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-6">
            {articles.map((article, index) => (
              <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <article.icon className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-black mb-2">{article.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{article.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-400 text-xs">Dernière mise à jour : 15 mai 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}