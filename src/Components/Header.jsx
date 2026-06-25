import { useState, useCallback, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import bg from "../assets/images/bg Header.png";
import products from "../assets/images/products.png";
import toast from "react-hot-toast";
import api from "../api";

export default function Header() {
  const [active, setActive] = useState("Electronique");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [categorieData, setCategorieData] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("categories/");
        const data = Array.isArray(response.data) ? response.data : [];
        setCategorieData(data);
      } catch (error) {
        toast.error(
          "Une erreur est survenue lors du chargement des catégories.",
          { position: "top-center" }
        );
        console.error(error);
      }
    };

    getCategories();
  }, []);

  // Transformer les catégories API
  const categories = useMemo(() => {
    return categorieData.map((cat) => ({
      code: `${cat.code}`,
      nom: `${cat.nom}`,
      path: `/categorie/${cat.nom
        .toLowerCase()
        .replace(/\s+/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")}`,
      slug: cat.nom
        .toLowerCase()
        .replace(/\s+/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    }));
  }, [categorieData]);

  // Mettre à jour la catégorie active selon l'URL
  useEffect(() => {
    const currentPath = location.pathname;
    const currentCategory = categories.find((cat) =>
      currentPath.includes(cat.slug)
    );

    if (currentCategory) {
      setActive(currentCategory.nom);
    }
  }, [location.pathname, categories]);

  const handleCategoryClick = useCallback((cat) => {
    setActive(cat.nom);
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header className="relative text-white dark:text-gray-100 transition-colors duration-300">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bg})`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* TOP BAR */}
        <div className="border-b border-orange-500/30 dark:border-orange-500/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <div className="w-[72px]"></div>

              {/* Desktop Navigation */}
              <nav
                className="hidden md:flex items-center justify-center flex-1"
                aria-label="Catégories"
              >
                <div className="flex items-center space-x-1 lg:space-x-2 mx-auto">
                  {categories.map((cat) => (
                    <Link
                      key={cat.code}
                      to={`/categorie/${cat.slug}?id=${cat.code}`}
                      onClick={() => handleCategoryClick(cat)}
                      className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-colors whitespace-nowrap ${
                        active === cat.nom
                          ? "text-orange-500 dark:text-orange-400"
                          : "text-gray-200 dark:text-gray-300 hover:text-orange-400 dark:hover:text-orange-300"
                      }`}
                      aria-current={active === cat.nom ? "page" : undefined}
                    >
                      {cat.nom}
                      {active === cat.nom && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 dark:bg-orange-400 rounded-full" />
                      )}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="hidden md:block w-[72px]"></div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden fixed inset-x-0 top-16 bg-black/95 dark:bg-gray-950/95 backdrop-blur-sm transition-all duration-300 ease-in-out z-20
            ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col items-center space-y-4">
            {categories.map((cat) => (
              <Link
                key={cat.code}
                to={`/categorie/${cat.slug}?id=${cat.code}`}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full max-w-xs text-center py-3 px-4 rounded-lg text-lg font-medium transition-all ${
                  active === cat.nom
                    ? "bg-orange-500/20 dark:bg-orange-500/30 text-orange-500 dark:text-orange-400 border-l-4 border-orange-500 dark:border-orange-400"
                    : "text-gray-200 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/5"
                }`}
                aria-current={active === cat.nom ? "page" : undefined}
              >
                {cat.nom}
              </Link>
            ))}
          </nav>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 dark:bg-black/70 z-10"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* HERO SECTION */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Texte */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight dark:text-white">
                Achetez et vendez au Cameroun
              </h1>

              <p className="mt-4 sm:mt-6 text-gray-300 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                Trouvez les meilleurs produits ou vendez facilement les vôtres
                partout au Cameroun.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
                <Link
                  to="/produits"
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/25 dark:hover:shadow-orange-600/25 text-center inline-block"
                >
                  Commencez vos achats
                </Link>
                <Link
                  to="/vendre"
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-center inline-block"
                >
                  Vendez vos produits
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[420px] xl:max-w-[500px]">
                <img
                  src={products}
                  alt="Produits populaires sur E-KMER"
                  className="w-full h-auto object-contain drop-shadow-2xl dark:drop-shadow-none hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}