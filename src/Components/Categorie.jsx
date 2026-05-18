// src/components/CategorySection.jsx

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./productCard";
import api from "../api";

const CategorySection = ({ sousCategorie }) => {

  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadProduits = async (page = 1) => {

    setLoading(true);

    try {

      const response = await api.get(
        `all_annonces/${sousCategorie.code}/annonces/`
      );

      const data = response.data || [];

      // ✅ FIX IMPORTANT : gestion propre des images
      const produitsFormates = data.map((annonce) => {

        let imageFinale = null;

        if (annonce.image) {
          imageFinale = annonce.image;
        } 
        else if (annonce.images && annonce.images.length > 0) {
          imageFinale =
            annonce.images[0]?.image ||
            annonce.images[0] ||
            null;
        }

        return {
          code: annonce.code,
          title: annonce.titre,
          prix: annonce.prix,
          image: imageFinale,
          localisation: annonce.localisation,
          created_at: annonce.created_at,
          description: annonce.description,
          statut: annonce.statut,
          qte: annonce.qte,
          vendeur: annonce.vendeur,
          autres_images: annonce.images
        };

      });

      setProduits(produitsFormates);

      // pagination simple (à adapter backend si besoin)
      const limit = 12;
      setTotalPages(Math.ceil(produitsFormates.length / limit));

      setCurrentPage(page);

    } catch (error) {
      console.error("Erreur chargement produits:", error);
      setProduits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sousCategorie?.code) {
      loadProduits(1);
    }
  }, [sousCategorie?.code]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadProduits(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // groupement en lignes
  const rows = [];
  for (let i = 0; i < produits.length; i += 6) {
    rows.push(produits.slice(i, i + 6));
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!produits.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        Aucun produit disponible
      </p>
    );
  }

  return (
    <div className="mb-12">

      {/* titre */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500 inline-block">
        {sousCategorie.nom}
      </h2>

      {/* produits */}
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6"
        >
          {row.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>
      ))}

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "hover:bg-orange-500 hover:text-white"
            }`}
          >
            <FaChevronLeft />
          </button>

          <span className="font-medium">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "hover:bg-orange-500 hover:text-white"
            }`}
          >
            <FaChevronRight />
          </button>

        </div>
      )}

    </div>
  );
};

export default CategorySection;