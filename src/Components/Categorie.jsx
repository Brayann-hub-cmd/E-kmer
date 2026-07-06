// src/components/CategorySection.jsx
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./productCard";
import api from "../api";

const CategorySection = ({ sousCategorie, categorieId }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProduits, setTotalProduits] = useState(0);

  const loadProduits = async (page) => {
    setLoading(true);
    try {
      const limit = 12;
      
      const response = await api.get(`all_annonces/${sousCategorie.code}/annonces/?page=${page}&limit=${limit}`);
      
      const data = response.data;
      const produitsData = data.results || data;

      const produitsFormates = produitsData.map((annonce) => ({
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
        autres_images: annonce.images
      }));

      setProduits(produitsFormates);
      
      const total = data.count || produitsData.length;
      setTotalProduits(total);
      setTotalPages(Math.ceil(total / limit));
      setCurrentPage(page);

    } catch (error) {
      console.error("Erreur chargement produits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduits(1);
  }, [sousCategorie.code]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadProduits(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const rows = [];
  for (let i = 0; i < produits.length; i += 6) {
    rows.push(produits.slice(i, i + 6));
  }

  if (loading && produits.length === 0) {
    return (
      <div className="flex justify-center py-12 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!produits.length && !loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b-2 border-orange-500 inline-block">
          {sousCategorie.nom}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">Aucun produit disponible dans cette catégorie.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b-2 border-orange-500 inline-block">
        {sousCategorie.nom}
      </h2>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {row.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border transition-colors ${currentPage === 1
                ? "border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:hover:border-orange-500"
              }`}
          >
            <FaChevronLeft className="text-sm" />
          </button>

          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border transition-colors ${currentPage === totalPages
                ? "border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:hover:border-orange-500"
              }`}
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySection;