// src/components/RecentProducts.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import T from "./T";

function RecentProducts() {
  const { t } = useAppContext();
  const [recentProducts, setRecentProducts] = useState([]);
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Charger les produits récemment consultés depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentProducts");
    if (stored) {
      try {
        const products = JSON.parse(stored);
        // Prendre uniquement les 5 premiers
        setRecentProducts(products.slice(0, 5));
      } catch (e) {
        console.error("Erreur chargement produits récents:", e);
      }
    }
  }, []);

  // Vérifier si on peut scroller à gauche ou à droite
  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [checkScrollability, recentProducts]);

  // Scroll horizontal
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollability, 300);
    }
  };

  // Gestion du swipe/drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    checkScrollability();
  };

  // Touch events pour mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    checkScrollability();
  };

  // Formater le prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(Number(price) || 0) + " FCFA";
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t.today || "Aujourd'hui";
    if (diffDays === 1) return t.yesterday || "Hier";
    if (diffDays < 7) return (t.daysAgo || "Il y a {days} jours").replace('{days}', diffDays);
    return date.toLocaleDateString('fr-FR');
  };

  // Rediriger vers la page "Tous les produits"
  const handleExploreClick = () => {
    navigate("/produits");
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 md:p-10 my-8 sm:my-10 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        <T>recentConsultations</T>
      </h2>

      {recentProducts.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            <T>noRecentArticles</T>
          </p>
          <button
            onClick={handleExploreClick}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base font-medium"
          >
            <T>exploreArticles</T>
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Flèche gauche */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 shadow-md rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors hidden md:block"
              aria-label="Défiler vers la gauche"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-300 text-sm" />
            </button>
          )}

          {/* Conteneur scrollable */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing"
            onScroll={checkScrollability}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {recentProducts.map((product) => (
              <div
                key={product.code}
                className="flex-shrink-0 w-64 sm:w-72"
              >
                {/* Style ProductCard */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group h-full">
                  {/* Image */}
                  <Link to={`/produit/${product.code}`} className="block overflow-hidden">
                    <img
                      src={product.image || "/placeholder-image.jpg"}
                      alt={product.titre}
                      className="w-full h-40 object-cover bg-gray-100 dark:bg-gray-600 group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Contenu */}
                  <div className="p-3">
                    {/* Titre */}
                    <Link to={`/produit/${product.code}`} className="block hover:text-orange-500 transition-colors">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1 mb-1">
                        {product.titre}
                      </h3>
                    </Link>

                    {/* Prix */}
                    <p className="text-orange-500 font-bold text-base mb-2">
                      {formatPrice(product.prix)}
                    </p>

                    {/* Localisation */}
                    <div className="flex items-center gap-1 mb-1">
                      <FaMapMarkerAlt className="text-orange-500 text-[10px]" />
                      <span className="text-gray-500 dark:text-gray-400 text-xs truncate">
                        {product.localisation || t.cameroon || "Cameroun"}
                      </span>
                    </div>

                    {/* Date de consultation */}
                    <div className="flex items-center gap-1 mb-3">
                      <FaClock className="text-orange-500 text-[10px]" />
                      <span className="text-gray-400 dark:text-gray-500 text-xs">
                        <T>consulted</T> {formatDate(product.consultedAt)}
                      </span>
                    </div>

                    {/* Bouton */}
                    <Link
                      to={`/produit/${product.code}`}
                      className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                    >
                      Voir les détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flèche droite */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 shadow-md rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors hidden md:block"
              aria-label="Défiler vers la droite"
            >
              <FaChevronRight className="text-gray-600 dark:text-gray-300 text-sm" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default RecentProducts;
