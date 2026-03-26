import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "../api";
import { useMemo } from "react";

function PopularOffers() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [data, setData] = useState([])
  useEffect(() => {
    const getAnnonces = async () => {
      try {
        const response = await api.get('annonces/')
        setData((data)=>response.data)
      } catch (error) {
        console.error("Erreur chargement produits:", error);
      }
    }

    getAnnonces(); 
  }, [])

  const produits = useMemo(
    () => {
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
      }))
    }, [data]
  )
  // Vérifier si on peut défiler
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScroll();
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);

      return () => {
        scrollContainer.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

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
  // Formatage de la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  // Déterminer la largeur des cartes selon l'écran
  const getCardWidthClass = () => {
    return "w-[200px] xs:w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px]";
  };

  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4 md:px-6 relative bg-gray-50">
      {/* En-tête avec titre */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-xl font-bold text-black">
          Nos Produits
        </h2>
      </div>

      {/* Carrousel Container */}
      <div className="relative group">
        {/* Boutons de navigation */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 -ml-3 sm:-ml-4 ${canScrollLeft
            ? 'opacity-100 hover:scale-110'
            : 'opacity-30 cursor-not-allowed'
            }`}
          aria-label="Défiler vers la gauche"
        >
          <FaChevronLeft className="text-base sm:text-lg md:text-xl" />
        </button>

        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 -mr-3 sm:-mr-4 ${canScrollRight
            ? 'opacity-100 hover:scale-110'
            : 'opacity-30 cursor-not-allowed'
            }`}
          aria-label="Défiler vers la droite"
        >
          <FaChevronRight className="text-base sm:text-lg md:text-xl" />
        </button>

        {/* Carrousel défilant horizontalement */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide scroll-smooth touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {produits.map((product) => (
            <div
              key={product.code}
              className={`flex-none ${getCardWidthClass()} bg-[#F2F2F2] rounded-lg sm:rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden`}
            >
              {/* Image avec les mêmes bordures arrondies que la carte */}
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
                  <h3 className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg mb-1 line-clamp-1 hover:text-orange-500 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-orange-500 font-bold text-sm xs:text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2">
                  {product.prix}
                </p>

                {/* Lieu avec icône */}
                <div className="flex items-center text-gray-600 text-[10px] xs:text-xs sm:text-sm mb-1">
                  <FaMapMarkerAlt className="text-orange-500 mr-1 flex-shrink-0 text-[10px] xs:text-xs sm:text-sm" />
                  <span className="truncate">{product.localisation}</span>
                </div>

                {/* Date avec icône */}
                <div className="flex items-center text-gray-500 text-[10px] xs:text-xs sm:text-sm mb-2 sm:mb-3">
                  <FaCalendarAlt className="text-orange-500 mr-1 flex-shrink-0 text-[10px] xs:text-xs sm:text-sm" />
                  <span className="truncate">{formatDate(product.created_at)}</span>
                </div>

                <Link
                  to={`/produit/${product.slug}`}
                  className="inline-block mt-1 bg-orange-500 text-white text-[10px] xs:text-xs sm:text-sm md:text-base px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg hover:bg-orange-600 transition-colors w-full text-center font-medium"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message de défilement (optionnel) */}
      <p className="text-center text-gray-400 text-xs mt-4 sm:hidden">
        ← Faites glisser pour voir plus d'articles →
      </p>

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
        /* Breakpoint personnalisé pour très petits écrans */
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