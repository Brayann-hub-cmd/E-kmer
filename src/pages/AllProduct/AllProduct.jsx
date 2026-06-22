// src/pages/AllProducts.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import ProductCard from "../../Components/productCard";
import api from "../../api";
import BackToHome from "../../Components/BackToHome";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [lowCategorie, setLowCategorie] = useState([])
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

  // useEffect(() => {
  //   const lowcat = async () => {
  //     categories.map((c, index) => {
  //       const obj = new FormData({
  //         nom: "",
  //         categories: []
  //       })
  //       try {
  //         const response = await api.get(`low_categories/${c.code}/sous_categories/`)
  //         obj.nom = c.nom
  //         obj.categories = response.data
  //         lowCategorie.push(obj)
  //       } catch (error) {
  //         toast.error('erreur lors des chargements des sous catégories')
  //       }
  //     })
  //   }
  //   lowcat()
  //   console.log(lowCategorie);

  // }, [categories])

  // Filtrage
  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(p => p.titre.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.sous_categorie === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackToHome />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tous les produits</h1>
        <p className="text-gray-500 mb-6">Découvrez tous les produits disponibles sur la plateforme</p>

        {/* Barre de recherche et filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white appearance-none"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => {

                return (
                  <option key={cat.code} value={cat.code}>{cat.nom}</option>
                )
              })}
            </select>
          </div>
        </div>

        {/* Résultats */}
        <p className="text-gray-500 text-sm mb-4">{filteredProducts.length} produit(s) trouvé(s)</p>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <p className="text-gray-400 text-lg">Aucun produit trouvé</p>
            <button onClick={() => { setSearchTerm(""); setSelectedCategory(""); }} className="mt-4 text-orange-500">Réinitialiser les filtres</button>
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