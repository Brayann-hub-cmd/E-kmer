// src/components/CategorySection.jsx
import  { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./productCard";
import api from "../api"
const CategorySection = ({ sousCategorie, categorieId }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadProduits = async (page) => {
    setLoading(true);
    try {
      const limit = 2;

      // Appel API réel
      const response = await api.get(`all_annonces/${sousCategorie.code}/annonces/`);

      const data = response.data;

      // Transformer les données au format attendu par ProductCard
      const produitsFormates =  data.map((annonce) => ({
        code: annonce.code,
        title: annonce.titre,
        prix: annonce.prix,
        image: annonce.image,
        localisation: annonce.localisation,
        created_at: annonce.created_at,
        description: annonce.description,
        statut: annonce.statut,
        qte: annonce.qte,
        vendeur:annonce.vendeur,
        autres_images:annonce.images
      }));

      setProduits(produitsFormates);

      // Calculer le nombre total de pages (si l'API renvoie le total)
      // setTotalPages(Math.ceil(data.total / limit));
      setTotalPages(produitsFormates.length /limit); // À adapter selon la réponse de l'API
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

  // Organiser les produits en lignes de 6
  const rows = [];
  for (let i = 0; i < produits.length; i += 6) {
    rows.push(produits.slice(i, i + 6));
  }

  if (loading && produits.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!produits.length) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500 inline-block">
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
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500"
              }`}
          >
            <FaChevronLeft className="text-sm" />
          </button>

          <span className="text-gray-700 font-medium">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border transition-colors ${currentPage === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500"
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