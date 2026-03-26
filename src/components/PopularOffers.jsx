import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Casque Sony",
    price: "15000 FCFA",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    slug: "casque-sony",
    location: "Douala",
    date: "12 Mars 2026"
  },
  {
    id: 2,
    name: "Jacket en cuir",
    price: "80000 FCFA",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
    slug: "jacket-en-cuir",
    location: "Yaoundé",
    date: "10 Mars 2026"
  },
  {
    id: 3,
    name: "Pixel 8 Pro",
    price: "250000 FCFA",
    image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=300&h=300&fit=crop",
    slug: "pixel-8-pro",
    location: "Bafoussam",
    date: "8 Mars 2026"
  },
  {
    id: 4,
    name: "Friteuse Philips",
    price: "120000 FCFA",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop",
    slug: "friteuse-philips",
    location: "Douala",
    date: "5 Mars 2026"
  },
  {
    id: 5,
    name: "Air Jordan",
    price: "20000 FCFA",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    slug: "air-jordan",
    location: "Garoua",
    date: "3 Mars 2026"
  },
  {
    id: 6,
    name: "MacBook Pro",
    price: "450000 FCFA",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    slug: "macbook-pro",
    location: "Yaoundé",
    date: "1 Mars 2026"
  },
  {
    id: 7,
    name: "Montre Connectée",
    price: "35000 FCFA",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    slug: "montre-connectee",
    location: "Douala",
    date: "28 Fév 2026"
  },
  {
    id: 8,
    name: "Enceinte JBL",
    price: "45000 FCFA",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    slug: "enceinte-jbl",
    location: "Buea",
    date: "25 Fév 2026"
  },
  {
    id: 9,
    name: "Sac à main",
    price: "25000 FCFA",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop",
    slug: "sac-a-main",
    location: "Douala",
    date: "22 Fév 2026"
  },
  {
    id: 10,
    name: "Lunettes de soleil",
    price: "15000 FCFA",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop",
    slug: "lunettes-soleil",
    location: "Kribi",
    date: "20 Fév 2026"
  }
];

function PopularOffers() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 -ml-3 sm:-ml-4 ${
            canScrollLeft 
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
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 -mr-3 sm:-mr-4 ${
            canScrollRight 
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
          {products.map((product) => (
            <div
              key={product.id}
              className={`flex-none ${getCardWidthClass()} bg-[#F2F2F2] rounded-lg sm:rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden`}
            >
              {/* Image avec les mêmes bordures arrondies que la carte */}
              <Link to={`/produit/${product.slug}`} className="block w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[120px] xs:h-[130px] sm:h-[140px] md:h-[160px] lg:h-[160px] object-cover"
                />
              </Link>

              {/* Contenu avec padding */}
              <div className="p-2.5 sm:p-3 md:p-4">
                <Link to={`/produit/${product.slug}`}>
                  <h3 className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg mb-1 line-clamp-1 hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-orange-500 font-bold text-sm xs:text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2">
                  {product.price}
                </p>

                {/* Lieu avec icône */}
                <div className="flex items-center text-gray-600 text-[10px] xs:text-xs sm:text-sm mb-1">
                  <FaMapMarkerAlt className="text-orange-500 mr-1 flex-shrink-0 text-[10px] xs:text-xs sm:text-sm" />
                  <span className="truncate">{product.location}</span>
                </div>

                {/* Date avec icône */}
                <div className="flex items-center text-gray-500 text-[10px] xs:text-xs sm:text-sm mb-2 sm:mb-3">
                  <FaCalendarAlt className="text-orange-500 mr-1 flex-shrink-0 text-[10px] xs:text-xs sm:text-sm" />
                  <span className="truncate">{product.date}</span>
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