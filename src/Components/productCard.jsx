// src/components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import api from "../api";
const LINK = import.meta.env.VITE_API_URL
const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(product?.likes_count || 0);
  const [viewsCount, setViewsCount] = useState(product?.views_count || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(product.image+'')
  const [titre,setTitre] = useState("Sans titre")
  // Vérifier si le produit est déjà dans les favoris au chargement
  useEffect(() => {
    const checkIfLiked = async () => {
      if (!product?.code) return;
      try {
        const response = await api.get(`favoris/check/${product.code}/`);
        setIsLiked(response.data.is_favori);
        if (response.data.likes_count) {
          setLikesCount(response.data.likes_count);
        }
      } catch (error) {
        console.error("Erreur vérification favori:", error);
      }
    };
    checkIfLiked();
  }, [product.code]);

  useEffect(() => {
    const getImage = () => {
      image.includes(LINK+'') ? setImage(product.image) : setImage(LINK + product.image)
      image.includes(LINK+'') ? setTitre(product.titre) : setTitre(product.title)
    }
    getImage()
  }, [product.code])

  // Incrémenter les vues quand la carte est affichée
  useEffect(() => {
    const incrementViews = async () => {
      if (!product?.code) return;
      try {
        await api.post(`annonces/${product.code}/vues/`);
        setViewsCount(prev => prev + 1);
      } catch (error) {
        console.error("Erreur incrémentation vues:", error);
      }
    };
    incrementViews();
  }, [product.code]);

  // Gestion du like/unlike
  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isLiked) {
        await api.delete(`favoris/${product.code}/`);
        setLikesCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        await api.post(`favoris/`, { produit_id: product.code });
        setLikesCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Erreur like/unlike:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Formatage du prix avec espaces
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
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

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative">

      {/* Badge de vues - en haut à gauche */}
      <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
        <FaEye className="text-[9px]" />
        <span>{viewsCount.toLocaleString()} vues</span>
      </div>

      {/* Bouton Like - en haut à droite */}
      <button
        onClick={handleLike}
        disabled={isLoading}
        className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition-all duration-200 disabled:opacity-50"
        aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {isLiked ? (
          <FaHeart className="text-red-500 text-sm" />
        ) : (
          <FaRegHeart className="text-gray-500 text-sm hover:text-red-500 transition-colors" />
        )}
        {likesCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">
            {likesCount > 99 ? "99+" : likesCount}
          </span>
        )}
      </button>

      {/* Image */}
      <Link to={`/produit/${product?.code}`} className="block overflow-hidden">
        <img
          // src={product?.image ? product.image : LINK + product.image}
          src={image}
          alt={product?.titre || "Produit"}
          className="w-full h-40 object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Contenu */}
      <div className="p-3">
        {/* Titre */}
        <Link to={`/produit/${product?.code}`} className="block hover:text-orange-500 transition-colors">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
            {titre || "Sans titre"}
          </h3>
        </Link>

        {/* Prix */}
        <p className="text-orange-500 font-bold text-base mb-2">
          {formatPrice(product?.prix || 0)}
        </p>

        {/* Localisation */}
        <div className="flex items-center gap-1 mb-1">
          <FaMapMarkerAlt className="text-orange-500 text-[10px]" />
          <span className="text-gray-500 text-xs truncate">
            {product?.localisation || "Localisation inconnue"}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1 mb-3">
          <FaClock className="text-orange-500 text-[10px]" />
          <span className="text-gray-400 text-xs">{formatDate(product?.created_at)}</span>
        </div>

        {/* Bouton */}
        <Link
          to={`/produit/${product?.code}`}
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 rounded-lg transition-colors"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;