// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const LINK = import.meta.env.VITE_API_URL;

const ProductCard = ({ product }) => {
  // Formatage du prix avec espaces
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(Number(price) || 0) + " FCFA";
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  // Fonction pour enregistrer la consultation
  const enregistrerConsultation = async (codeAnnonce) => {
    try {
      const response = await fetch(`${LINK}/api/annonces/${codeAnnonce}/consultation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Pour envoyer les cookies (CSRF token si nécessaire)
      });

      if (!response.ok) {
        console.error('Erreur lors de l\'enregistrement de la consultation');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  // Fonction pour gérer le clic sur le bouton "Voir les détails"
  const handleClick = (e) => {
    // Empêcher la navigation immédiate
    e.preventDefault();
    
    // Enregistrer la consultation
    enregistrerConsultation(product.code);
    
    // Ajouter le produit aux produits récemment consultés dans localStorage
    ajouterAuxRecents(product);
    
    // Rediriger vers la page du produit
    window.location.href = `/produit/${product.code}`;
  };

  // Fonction pour ajouter aux produits récents dans localStorage
  const ajouterAuxRecents = (product) => {
    try {
      // Récupérer les produits récents existants
      const stored = localStorage.getItem("recentProducts");
      let recentProducts = stored ? JSON.parse(stored) : [];
      
      // Créer l'objet produit avec la date de consultation
      const productWithDate = {
        ...product,
        consultedAt: new Date().toISOString()
      };
      
      // Vérifier si le produit existe déjà dans la liste
      const existingIndex = recentProducts.findIndex(p => p.code === product.code);
      
      if (existingIndex !== -1) {
        // Supprimer l'ancienne entrée
        recentProducts.splice(existingIndex, 1);
      }
      
      // Ajouter le produit au début de la liste
      recentProducts.unshift(productWithDate);
      
      // Limiter à 10 produits maximum
      recentProducts = recentProducts.slice(0, 10);
      
      // Sauvegarder dans localStorage
      localStorage.setItem("recentProducts", JSON.stringify(recentProducts));
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux produits récents:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Image - Le clic sur l'image enregistre aussi la consultation */}
      <div 
        onClick={(e) => {
          e.preventDefault();
          enregistrerConsultation(product.code);
          ajouterAuxRecents(product);
          window.location.href = `/produit/${product.code}`;
        }}
        className="block overflow-hidden cursor-pointer"
      >
        <img
          src={product.image ? `${product.image}` : "/placeholder-image.jpg"}
          alt={product.titre}
          className="w-full h-40 object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Contenu */}
      <div className="p-3">
        {/* Titre */}
        <div 
          onClick={(e) => {
            e.preventDefault();
            enregistrerConsultation(product.code);
            ajouterAuxRecents(product);
            window.location.href = `/produit/${product.code}`;
          }}
          className="block hover:text-orange-500 transition-colors cursor-pointer"
        >
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
            {product.titre}
          </h3>
        </div>

        {/* Prix */}
        <p className="text-orange-500 font-bold text-base mb-2">
          {formatPrice(product.prix)}
        </p>

        {/* Localisation */}
        <div className="flex items-center gap-1 mb-1">
          <FaMapMarkerAlt className="text-orange-500 text-[10px]" />
          <span className="text-gray-500 text-xs truncate">{product.localisation}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1 mb-3">
          <FaClock className="text-orange-500 text-[10px]" />
          <span className="text-gray-400 text-xs">{formatDate(product.created_at)}</span>
        </div>

        {/* Bouton */}
        <button
          onClick={handleClick}
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 rounded-lg transition-colors cursor-pointer"
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
