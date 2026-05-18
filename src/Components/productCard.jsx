// src/components/ProductCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const apiBaseUrl =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000";

const normalizeImageSrc = (src) => {

  if (!src) return null;

  if (
    src.startsWith("http://") ||
    src.startsWith("https://")
  ) {
    return src;
  }

  const normalized = src.startsWith("/")
    ? src
    : `/${src}`;

  return `${apiBaseUrl}${normalized}`;
};

const ProductCard = ({ product }) => {

  // Format prix
  const formatPrice = (price) => {

    return (
      new Intl.NumberFormat("fr-FR").format(price) +
      " FCFA"
    );

  };

  // Format date
  const formatDate = (dateString) => {

    if (!dateString) return "";

    const date = new Date(dateString);
    const today = new Date();

    const diffTime = Math.abs(today - date);

    const diffDays = Math.floor(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Aujourd'hui";

    if (diffDays === 1) return "Hier";

    if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    }

    return date.toLocaleDateString("fr-FR");

  };

  const imageSrc =
    normalizeImageSrc(product.image) ||
    "/placeholder-image.jpg";

  return (

    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">

      {/* IMAGE */}
      <Link
        to={`/produit/${product.code}`}
        className="block overflow-hidden"
      >

        <div className="relative w-full h-40 overflow-hidden bg-gray-100">

          {/* Fond flou */}
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
          />

          {/* Image principale */}
          <img
            src={imageSrc}
            alt={product.title}
            className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

        </div>

      </Link>

      {/* CONTENU */}
      <div className="p-3">

        {/* TITRE */}
        <Link
          to={`/produit/${product.code}`}
          className="block hover:text-orange-500 transition-colors"
        >

          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
            {product.title}
          </h3>

        </Link>

        {/* PRIX */}
        <p className="text-orange-500 font-bold text-base mb-2">
          {formatPrice(product.prix)}
        </p>

        {/* LOCALISATION */}
        <div className="flex items-center gap-1 mb-1">

          <FaMapMarkerAlt className="text-orange-500 text-[10px]" />

          <span className="text-gray-500 text-xs truncate">
            {product.localisation}
          </span>

        </div>

        {/* DATE */}
        <div className="flex items-center gap-1 mb-3">

          <FaClock className="text-orange-500 text-[10px]" />

          <span className="text-gray-400 text-xs">
            {formatDate(product.created_at)}
          </span>

        </div>

        {/* BOUTON */}
        <Link
          to={`/produit/${product.code}`}
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 rounded-lg transition-colors"
        >
          Voir les détails
        </Link>

      </div>

    </div>

  );

};

export default ProductCard;