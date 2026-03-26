import React, { useRef, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import api from "../api";

function PopularOffers() {
  const scrollContainerRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Charger les annonces depuis l'API
  useEffect(() => {
    const getAnnonces = async () => {
      try {
        const response = await api.get("annonces/");
        setData(response.data);
      } catch (error) {
        console.error("Erreur chargement produits :", error);
      }
    };

    getAnnonces();
  }, []);

  // Transformer les données API en produits utilisables
  const produits = useMemo(() => {
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
      slug: `${annonce.code}`,
    }));
  }, [data]);

  // Gestion des favoris
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Vérifier si on peut encore défiler
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      checkScroll();
      scrollContainer.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [produits]);

  // Défilement gauche/droite
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 220;
      const gap = 16;
      const scrollAmount = cardWidth + gap;

      const newScrollLeft =
        container.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Formatage date
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";

    const date = new Date(dateString);
    const today = new Date();

    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd’hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString("fr-FR");
  };

  // Taille responsive des cartes
  const getCardWidthClass = () => {
    return "w-[200px] xs:w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px]";
  };

  return (
    <div className="px-6 py-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Offres Populaires</h2>

      {/* Carrousel */}
      <div className="relative group">
        {/* Bouton gauche */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 -ml-3 sm:-ml-4 ${
            canScrollLeft
              ? "opacity-100 hover:scale-110"
              : "opacity-30 cursor-not-allowed"
          }`}
          aria-label="Défiler vers la gauche"
        >
          <FaChevronLeft className="text-base sm:text-lg md:text-xl" />
        </button>

        {/* Bouton droite */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 -mr-3 sm:-mr-4 ${
            canScrollRight
              ? "opacity-100 hover:scale-110"
              : "opacity-30 cursor-not-allowed"
          }`}
          aria-label="Défiler vers la droite"
        >
          <FaChevronRight className="text-base sm:text-lg md:text-xl" />
        </button>

        {/* Liste des cartes */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {produits.map((product) => (
            <div
              key={product.code}
              className={`flex-none ${getCardWidthClass()} bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}
            >
              {/* Image */}
              <div className="relative">
                <Link to={`/produit/${product.slug}`} className="block w-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[140px] sm:h-[160px] md:h-[180px] object-cover"
                  />
                </Link>

                {/* Coeur Favori */}
                <button
                  onClick={() => toggleFavorite(product.code)}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:scale-110 transition"
                >
                  {favorites.includes(product.code) ? (
                    <FaHeart className="text-red-500 text-lg" />
                  ) : (
                    <FaRegHeart className="text-gray-700 text-lg" />
                  )}
                </button>
              </div>

              {/* Contenu */}
              <div className="p-3 sm:p-4">
                <Link to={`/produit/${product.slug}`}>
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 line-clamp-1 hover:text-orange-500 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-orange-500 font-bold text-base sm:text-lg md:text-xl mb-2">
                  {product.prix} FCFA
                </p>

                {/* Localisation */}
                <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-1">
                  <FaMapMarkerAlt className="text-orange-500 mr-1 flex-shrink-0" />
                  <span className="truncate">{product.localisation}</span>
                </div>

                {/* Date */}
                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-3">
                  <FaCalendarAlt className="text-orange-500 mr-1 flex-shrink-0" />
                  <span className="truncate">
                    {formatDate(product.created_at)}
                  </span>
                </div>

                <Link
                  to={`/produit/${product.slug}`}
                  className="inline-block mt-1 bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors w-full text-center font-medium"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularOffers;