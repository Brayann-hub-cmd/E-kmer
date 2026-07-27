// src/components/PopularOffers.jsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "../api";
import { useAppContext } from "../context/AppContext"; // ← IMPORT
import T from "./T"; // ← IMPORT

function PopularOffers({ title, categorie }) {
  const { t } = useAppContext(); // ← Récupère les traductions
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [data, setData] = useState([]);
  const [dataR, setDataR] = useState([]);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const getAnnonces = async () => {
      try {
        const response = await api.get('annonces/');
        setData(response.data);
        setDataR(response.data);
      } catch (error) {
        console.error("Erreur chargement produits:", error);
      }
    };
    getAnnonces();
  }, []);

  const filtered = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((annonce) => ({
      code: annonce.code,
      title: annonce.titre,
      prix: annonce.prix,
      image: annonce.image,
      localisation: annonce.localisation,
      created_at: annonce.created_at,
      description: annonce.description,
      statut: annonce.statut,
      qte: annonce.qte,
      vendeur: annonce.vendeur,
      autres_images: annonce.images,
      slug: `${annonce.code}`
    }));
  }, [data]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const hasScroll = scrollWidth > clientWidth;
      setShowButtons(hasScroll);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [filtered]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 220;
      const gap = 16;
      const scrollAmount = cardWidth + gap;

      const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // ✅ Formatage de date avec traduction
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t.today || "Aujourd'hui";
    if (diffDays === 1) return t.yesterday || "Hier";
    if (diffDays < 7) return (t.daysAgo || "Il y a {days} jours").replace('{days}', diffDays);
    return date.toLocaleDateString('fr-FR');
  };

  const getCardWidthClass = () => {
    return "w-[200px] xs:w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px]";
  };

  const handleSearch = async () => {
    try {
      console.log("Recherche: ", title);
      const categoryCode = typeof categorie === 'string'
        ? categorie
        : categorie?.code || "CAT_000";
      let response = [];

      if (title) {
        if (categoryCode !== "CAT_000") {
          const matchTitle = await api.get(`annonce/search/?titre=${title}&categorie=${categoryCode}`);
          response = matchTitle.data;
        } else {
          const matchTitle = await api.get(`annonce/search/?titre=${title}`);
          response = matchTitle.data;
        }
      } else if (categoryCode !== "CAT_000") {
        const matchTitle = await api.get(`annonce/search/?categorie=${categoryCode}`);
        response = matchTitle.data;
      } else {
        response = dataR;
      }

      console.log("dans popular offer", response);
      setData(response);
    } catch (error) {
      console.error("Erreur de recherche:", error);
      setData(dataR);
    }
  };

  useEffect(() => {
    if (title) {
      handleSearch();
    }
  }, [title]);

  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4 md:px-6 relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* En-tête avec titre */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-xl font-bold text-black dark:text-white">
          <T>ourProducts</T>
        </h2>
      </div>

      {/* Carrousel Container */}
      <div className="relative group">
        {/* Boutons de navigation - Affichage conditionnel */}
        {showButtons && (
          <>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 -ml-3 sm:-ml-4 ${
                canScrollLeft
                  ? 'opacity-100 hover:scale-110'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label={t.scrollLeft || "Défiler vers la gauche"}
            >
              <FaChevronLeft className="text-base sm:text-lg md:text-xl" />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 -mr-3 sm:-mr-4 ${
                canScrollRight
                  ? 'opacity-100 hover:scale-110'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label={t.scrollRight || "Défiler vers la droite"}
            >
              <FaChevronRight className="text-base sm:text-lg md:text-xl" />
            </button>
          </>
        )}

        {/* Carrousel défilant horizontalement */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide scroll-smooth touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {filtered.map((product) => (
            <div
              key={product.code}
              className={`flex-none ${getCardWidthClass()} bg-[#F2F2F2] dark:bg-gray-800 rounded-lg sm:rounded-xl shadow hover:shadow-xl dark:shadow-gray-800 transition-all duration-300 overflow-hidden`}
            >
              {/* Image */}
              <Link to={`/produit/${product.slug}`} className="block w-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[120px] xs:h-[130px] sm:h-[140px] md:h-[160px] lg:h-[160px] object-cover"
                />
              </Link>

              {/* Contenu avec padding */}
              <div className="p-2.5 sm:p-3 md:p-4">
                <Link to={`/produit/${product.slug}`}>
                  <h3 className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg mb-1 line-clamp-1 hover:text-orange-500 transition-colors text-gray-800 dark:text-white">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-orange-500 font-bold text-sm xs:text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2">
                  {product.prix} FCFA
                </p>

                {/* Lieu avec icône */}
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-[10px] xs:text-xs sm:text-sm mb-1">
                  <FaMapMarkerAlt className="text-orange-500 mr-1 flex-shrink-0 text-[10px] xs:text-xs sm:text-sm" />
                  <span className="truncate">{product.localisation}</span>
                </div>

                {/* Date avec icône */}
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-[10px] xs:text-xs sm:text-sm mb-2 sm:mb-3">
                  <FaCalendarAlt className="text-orange-500 mr-1 flex-shrink-0 text-[10px] xs:text-xs sm:text-sm" />
                  <span className="truncate">{formatDate(product.created_at)}</span>
                </div>

                <Link
                  to={`/produit/${product.slug}`}
                  className="inline-block mt-1 bg-orange-500 hover:bg-orange-600 text-white text-[10px] xs:text-xs sm:text-sm md:text-base px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg transition-colors w-full text-center font-medium"
                >
                  <T>viewDetails</T>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message de défilement */}
      {!showButtons && scrollContainerRef.current?.scrollWidth > scrollContainerRef.current?.clientWidth && (
        <p className="text-center text-gray-400 dark:text-gray-500 text-xs mt-4 sm:hidden">
          ← <T>swipeHint</T> →
        </p>
      )}

      {/* Styles CSS personnalisés */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 480px) {
          .xs\\:w-\\[220px\\] {
            width: 220px;
          }
          .xs\\:text-sm {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
}

export default PopularOffers;