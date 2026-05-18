import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaChevronDown,
  FaSignOutAlt, 
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../api";

export default function Navbar({ setTitle, setCategorie }) {
  const [category, setCategory] = useState({
    code: "CAT_000",
    nom: "Toutes les categories",
    path: "/toutes-categories"
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [language, setLanguage] = useState("FRA");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([])
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [categorySelected, setCategorySelected] = useState("CAT_000")

  //AJOUT : état de connexion 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si un token existe dans le localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  // Refs séparées pour chaque vue
  const categoryDesktopRef = useRef(null);
  const categoryTabletRef = useRef(null);
  const categoryMobileRef = useRef(null);

  const languageDesktopRef = useRef(null);
  const languageTabletRef = useRef(null);
  const languageMobileRef = useRef(null);

  useEffect(() => {
    const getCategorie = async () => {
      try {
        const response = await api.get("categories/")
        setCategories((categories) => response.data)
      } catch (error) {
        toast.error("Une erreur est survenue lors de la collection des catégories de produits:" + error, { position: 'top-center' })
      }
    }
    getCategorie();
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setShowResults(true);
    setTitle(searchTerm)
    setCategorie(categorySelected)
    try {
    } catch (error) {
      console.error("Erreur de recherche:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setCategorySelected(selectedCategory);
    setCategory(selectedCategory)
    setIsCategoryOpen(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const flagIcon = language === "FRA" ? "🇫🇷" : "🇬🇧";

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3">

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden lg:flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="eKMER" className="h-10 w-auto" />
          </Link>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-2xl h-11">
              <div className="relative h-full" ref={categoryDesktopRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-4 text-gray-700 bg-gray-200 h-full whitespace-nowrap hover:bg-gray-300 transition-colors rounded-l-2xl min-w-[160px]"
                >
                  <span className="text-sm font-medium truncate">{category.nom}</span>
                  <FaChevronDown className={`text-xs transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl w-56 max-h-80 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button
                        key={cat.code}
                        type="button"
                        onClick={() => handleCategoryChange(cat)}
                        className="w-full text-left px-4 py-3 hover:bg-orange-500 hover:text-white text-gray-700 border-b border-gray-100 last:border-0 transition-colors block"
                      >
                        <span className="text-sm">{cat.nom}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Recherchez un produit..."
                value={searchTerm}
                onChange={handleInputChange}
                className="flex-1 px-4 text-gray-900 outline-none text-sm bg-transparent"
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-8 cursor-pointer h-full flex items-center justify-center rounded-2xl">
                <FaSearch className="text-white text-sm" />
              </button>
            </form>
          </div>

          {/* LANGUAGE */}
          <div className="relative" ref={languageDesktopRef}>
            <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="flex items-center gap-2 text-sm hover:text-orange-500">
              <span className="text-base">{flagIcon}</span>
              <span className="font-medium">{language}</span>
              <FaChevronDown className="text-xs" />
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl w-32 overflow-hidden z-50">
                <button onClick={() => handleLanguageChange("FRA")} className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-orange-500 hover:text-white">🇫🇷 Français</button>
                <button onClick={() => handleLanguageChange("ENG")} className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-orange-500 hover:text-white">🇬🇧 English</button>
              </div>
            )}
          </div>

          {/* ── AJOUT : Se connecter / Se déconnecter (Desktop) ── */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm hover:text-orange-500 whitespace-nowrap transition-colors"
            >
              <FaSignOutAlt className="text-sm" />
              <span>Se déconnecter</span>
            </button>
          ) : (
            <Link
              to="auth/login"
              className="flex items-center gap-2 text-sm hover:text-orange-500 whitespace-nowrap transition-colors"
            >
              <FaUser className="text-sm" />
              <span>Se connecter</span>
            </Link>
          )}

          {/* REGISTER */}
          <Link
            to="auth/register"
            className="text-sm font-medium hover:text-orange-500 whitespace-nowrap transition-colors"
          >
            S'inscrire
          </Link>

          {/* CART */}
          <Link
            to={'/panier'}
            className="relative hover:text-orange-500 transition-colors"
          >
            <FaShoppingCart className="text-lg" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">{cartCount}</span>
          </Link>
        </div>

        {/*  TABLET LAYOUT (md à lg)  */}
        <div className="hidden md:flex lg:hidden items-center justify-between gap-2">
          <Link to="/"><img src="/logo.png" alt="eKMER" className="h-8 w-auto" /></Link>

          <div className="flex-1 max-w-md relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg h-10">
              <div className="relative h-full" ref={categoryTabletRef}>
                <button type="button" onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-1 px-2 text-gray-700 bg-gray-200 h-full text-xs whitespace-nowrap rounded-l-lg">
                  <span className="truncate max-w-[70px]">{category.nom}</span>
                  <FaChevronDown className="text-[10px]" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl w-48 max-h-80 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button key={cat.code} onClick={() => handleCategoryChange(cat)} className="w-full text-left px-3 py-2 text-xs hover:bg-orange-500 text-black hover:text-white">{cat.nom}</button>
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={handleInputChange} className="flex-1 px-2 text-gray-900 outline-none text-xs bg-transparent" />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-3 h-full rounded-r-lg"><FaSearch className="text-white text-xs" /></button>
            </form>
          </div>

          <div className="relative" ref={languageTabletRef}>
            <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="text-lg">{flagIcon}</button>
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl w-24 z-50">
                <button onClick={() => handleLanguageChange("FRA")} className="w-full px-3 py-2 text-xs hover:bg-orange-500 hover:text-white">🇫🇷 FRA</button>
                <button onClick={() => handleLanguageChange("ENG")} className="w-full px-3 py-2 text-xs hover:bg-orange-500 hover:text-white">🇬🇧 ENG</button>
              </div>
            )}
          </div>

          {/* AJOUT : Se connecter / Se déconnecter (Tablet) */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-orange-500 transition-colors">
              <FaSignOutAlt className="text-sm" />
            </button>
          ) : (
            <Link to={'/auth/login'} className="hover:text-orange-500">
              <FaUser className="text-sm" />
            </Link>
          )}

          <Link to={'/auth/register'} className="text-xs font-medium hover:text-orange-500 whitespace-nowrap">
            S'inscrire
          </Link>

          <Link to={'/panier'} className="relative hover:text-orange-500">
            <FaShoppingCart className="text-sm" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
          </Link>
        </div>

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            <Link to="/"><img src="/logo.png" alt="eKMER" className="h-6 w-auto" /></Link>
            <div className="flex items-center gap-3">
              <div className="relative" ref={languageMobileRef}>
                <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="text-base">{flagIcon}</button>
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl w-20 z-50">
                    <button onClick={() => handleLanguageChange("FRA")} className="w-full px-2 py-2 text-xs hover:bg-orange-500 hover:text-white">🇫🇷 FRA</button>
                    <button onClick={() => handleLanguageChange("ENG")} className="w-full px-2 py-2 text-xs hover:bg-orange-500 hover:text-white">🇬🇧 ENG</button>
                  </div>
                )}
              </div>

              {/* ── AJOUT : Se connecter / Se déconnecter (Mobile) ── */}
              {isLoggedIn ? (
                <button onClick={handleLogout} className="hover:text-orange-500 transition-colors">
                  <FaSignOutAlt className="text-sm" />
                </button>
              ) : (
                <Link to={'/auth/login'} className="hover:text-orange-500">
                  <FaUser className="text-sm" />
                </Link>
              )}
              {/* ─────────────────────────────────────────────────── */}

              <Link to={'/auth/register'} className="text-xs font-medium hover:text-orange-500 whitespace-nowrap">
                S'inscrire
              </Link>

              <Link to={'/panier'} className="relative hover:text-orange-500">
                <FaShoppingCart className="text-sm" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">{cartCount}</span>
              </Link>
            </div>
          </div>

          {/* LIGNE 2 : Barre de recherche mobile */}
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg h-10">
              <div className="relative h-full" ref={categoryMobileRef}>
                <button type="button" onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-1 px-2 text-gray-700 bg-gray-200 h-full text-xs whitespace-nowrap rounded-l-lg">
                  <span className="truncate max-w-[60px]">{category.nom}</span>
                  <FaChevronDown className="text-[10px]" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl w-48 max-h-60 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button key={cat.code} onClick={() => handleCategoryChange(cat)} className="w-full text-left px-3 py-2.5 text-xs hover:bg-orange-500 text-black hover:text-white">{cat.nom}</button>
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder="Rechercher un produit" value={searchTerm} onChange={handleInputChange} className="flex-1 px-2 text-gray-900 outline-none text-xs bg-transparent" />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-3 h-full rounded-r-lg"><FaSearch className="text-white text-xs" /></button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
