import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

function RecentProducts() {
  const [recentProducts, setRecentProducts] = useState([]);
  const navigate = useNavigate();

  // Charger les produits récemment consultés depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentProducts");
    if (stored) {
      try {
        setRecentProducts(JSON.parse(stored));
      } catch (e) {
        console.error("Erreur chargement produits récents:", e);
      }
    }
  }, []);

  // Formater le prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
  };

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  // Rediriger vers la page "Tous les produits"
  const handleExploreClick = () => {
    navigate("/produits");
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 md:p-10 my-8 sm:my-10 text-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Consultations récentes
      </h2>

      {recentProducts.length === 0 ? (
        <>
          <p className="mb-4 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Vous n'avez pas encore consulté d'articles.
          </p>

          <button
            onClick={handleExploreClick}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base font-medium"
          >
            Explorer les articles
          </button>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 text-left">
          {recentProducts.map((product) => (
            <Link
              key={product.code}
              to={`/produit/${product.code}`}
              className="group bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600"
            >
              {/* Image */}
              <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-100 dark:bg-gray-600">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Infos produit */}
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base line-clamp-1">
                  {product.titre}
                </h3>
                <p className="text-orange-500 font-bold text-sm sm:text-base mt-1">
                  {formatPrice(product.prix)}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <FaMapMarkerAlt className="text-orange-400 text-[10px]" />
                  <span>{product.localisation || "Cameroun"}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 dark:text-gray-500">
                  <FaClock className="text-orange-400 text-[10px]" />
                  <span>Consulté {formatDate(product.consultedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentProducts;