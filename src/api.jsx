// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import api from "../api"; 
import { safeReadStorage } from '../utils/storage'; 

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

  // Fonction pour enregistrer la consultation via Axios
  const enregistrerConsultation = async (codeAnnonce) => {
    try {
      await api.post(`/annonces/${codeAnnonce}/consultation/`);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la consultation:', error);
    }
  };

  // Fonction pour ajouter aux produits récents dans localStorage
  const ajouterAuxRecents = (product) => {
    try {
      const stored = localStorage.getItem("recentProducts");
      let recentProducts = stored ? JSON.parse(stored) : [];
      
      const productWithDate = {
        ...product,
        consultedAt: new Date().toISOString()
      };
      
      const existingIndex = recentProducts.findIndex(p => p.code === product.code);
      
      if (existingIndex !== -1) {
        recentProducts.splice(existingIndex, 1);
      }
      
      recentProducts.unshift(productWithDate);
      recentProducts = recentProducts.slice(0, 10);
      
      localStorage.setItem("recentProducts", JSON.stringify(recentProducts));
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux produits récents:', error);
    }
  };

  // Fonction pour gérer le clic
  const handleProductClick = async (e) => {
    e.preventDefault();
    
    // Enregistrer la consultation via l'API
    await enregistrerConsultation(product.code);
    
    // Ajouter aux produits récents
    ajouterAuxRecents(product);
    
    // Rediriger vers la page du produit
    window.location.href = `/produit/${product.code}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div 
        onClick={handleProductClick}
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
          onClick={handleProductClick}
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
          onClick={handleProductClick}
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 rounded-lg transition-colors cursor-pointer"
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
