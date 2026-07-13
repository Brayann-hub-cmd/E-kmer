// src/pages/AllProducts.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import api from "../../api";
import BackToHome from "../../components/BackToHome";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

export default function AllProducts() {
  const { t } = useAppContext(); // ← Récupère les traductions
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [lowCategorie, setLowCategorie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await api.get("annonces/");
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);

        const categoriesRes = await api.get("categories/");
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Erreur chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(p => p.titre?.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.sous_categorie === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackToHome />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          <T>allProducts</T>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          <T>discoverAllProducts</T>
        </p>

        {/* Barre de recherche et filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t.searchProduct || "Rechercher un produit..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none transition-colors duration-300"
            >
              <option value=""><T>allCategoriesFilter</T></option>
              {categories.map((cat) => {
                return (
                  <option key={cat.code} value={cat.code}>{cat.nom}</option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Résultats */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          {filteredProducts.length} <T>productsFound</T>
        </p>

        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <p className="text-gray-400 dark:text-gray-400 text-lg">
              <T>noProductsFound</T>
            </p>
            <button onClick={() => { setSearchTerm(""); setSelectedCategory(""); }} className="mt-4 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors">
              <T>resetFilters</T>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}