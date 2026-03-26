<<<<<<< HEAD
import { useState, useRef, useEffect } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

=======
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaChevronDown,
} from "react-icons/fa";
import api from "../api";
>>>>>>> 5bcfe065ba02ea5c84a7b69c7e7acd8e2e3d1d6f
export default function Navbar() {
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
  const [categories,setCategories] = useState([])
  const searchRef = useRef(null);
  const navigate = useNavigate();

<<<<<<< HEAD
  //  reférence pour chaque menu
  const categoryRef = useRef(null);
  const languageRef = useRef(null);
  const userRef = useRef(null);

  const categories = ["Toutes les catégories", "Électronique","Véhicules","Téléphones et accessoires","Produits agricoles","Immobilier","Vêtements", "Maison"];
  const languages = ["FRA", "ENG"];
=======
  // Refs séparées pour chaque vue
  const categoryDesktopRef = useRef(null);
  const categoryTabletRef = useRef(null);
  const categoryMobileRef = useRef(null);
  
  const languageDesktopRef = useRef(null);
  const languageTabletRef = useRef(null);
  const languageMobileRef = useRef(null);
  useEffect(()=>{
    const getCategorie = async ()=>{
      try {
        const response = await api.get("categories/")
        setCategories((categories)=>response.data)
      } catch (error) {
        toast.error("Une erreur est survenue lors de la collection des catégories de produits:" + error, { position: 'top-center' })
      }
    }

    getCategorie();
  },[])
  // Données mock des produits pour la recherche
  const mockProduits = [
    { code: "P001", title: "Casque Sony", prix: 15000, categorie: "CAT_001", localisation: "Douala" },
    { code: "P002", title: "Jacket en cuir", prix: 80000, categorie: "CAT_006", localisation: "Yaoundé" },
    { code: "P003", title: "Pixel 8 Pro", prix: 250000, categorie: "CAT_001", localisation: "Bafoussam" },
    { code: "P004", title: "Friteuse Philips", prix: 120000, categorie: "CAT_001", localisation: "Douala" },
    { code: "P005", title: "Air Jordan", prix: 20000, categorie: "CAT_006", localisation: "Garoua" },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const results = mockProduits.filter(produit => {
        const matchTitle = produit.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = category.id === "CAT_000" || produit.categorie === category.id;
        return matchTitle && matchCategory;
      });
      setSearchResults(results);
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
    setCategory(selectedCategory);
    setIsCategoryOpen(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const flagIcon = language === "FRA" ? "🇫🇷" : "🇬🇧";

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
>>>>>>> 5bcfe065ba02ea5c84a7b69c7e7acd8e2e3d1d6f

  // click outside pour chaque menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }

      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
<<<<<<< HEAD
    <nav className="bg-black text-white px-4 py-2 flex items-center justify-between flex-wrap">

      {/* LOGO */}
      <div className="shrink-0">
        <img src="/logo.png" className="h-7 w-auto" />
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-white rounded-lg overflow-visible flex-1 md:flex-none md:w-[420px] lg:w-[480px] h-9 min-w-0">

        {/* category */}
        <div
          ref={categoryRef}
          className="relative flex items-center px-2 text-gray-700 border-r cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-xs hidden sm:block">{category}</span>
          <FaChevronDown className="ml-1 text-xs" />

          {isDropdownOpen && (
            <div className="absolute top-full left-0 bg-white border border-gray-300 rounded mt-1 w-40 z-20">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-black text-xs"
                  onClick={() => {
                    setCategory(cat);
                    setIsDropdownOpen(false);
                  }}
=======
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
>>>>>>> 5bcfe065ba02ea5c84a7b69c7e7acd8e2e3d1d6f
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

          {/* LOGIN - Transformé en Link */}
          <Link 
            to="auth/login" 
            className="flex items-center gap-2 text-sm hover:text-orange-500 whitespace-nowrap transition-colors"
          >
            <FaUser className="text-sm" />
            <span>Se connecter</span>
          </Link>

          {/* REGISTER - Transformé en Link */}
          <Link 
            to="auth/register" 
            className="text-sm font-medium hover:text-orange-500 whitespace-nowrap transition-colors"
          >
            S'inscrire
          </Link>

          {/* CART - Transformé en Link */}
          <Link 
            to={'/panier'}
            className="relative hover:text-orange-500 transition-colors"
          >
            <FaShoppingCart className="text-lg" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">{cartCount}</span>
          </Link>
        </div>

        {/* ===== TABLET LAYOUT (md à lg) ===== */}
        <div className="hidden md:flex lg:hidden items-center justify-between gap-2">
          <Link to="/"><img src="/logo.png" alt="eKMER" className="h-8 w-auto" /></Link>
          
          <div className="flex-1 max-w-md relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg h-10">
              <div className="relative h-full" ref={categoryTabletRef}>
                <button type="button" onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-1 px-2 text-gray-700 bg-gray-200 h-full text-xs whitespace-nowrap rounded-l-lg">
                  <span className="truncate max-w-[70px]">{category.name}</span>
                  <FaChevronDown className="text-[10px]" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl w-48 max-h-80 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button key={cat.code} onClick={() => handleCategoryChange(cat)} className="w-full text-left px-3 py-2 text-xs hover:bg-orange-500 hover:text-white">{cat.nom}</button>
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

          {/* LOGIN - Tablet transformé en Link */}
          <Link to={'/auth/login'} className="hover:text-orange-500">
            <FaUser className="text-sm" />
          </Link>

          {/* REGISTER - Tablet transformé en Link */}
          <Link to={'/auth/register'} className="text-xs font-medium hover:text-orange-500 whitespace-nowrap">
            S'inscrire
          </Link>

          {/* CART - Tablet transformé en Link */}
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

              {/* LOGIN - Mobile transformé en Link */}
              <Link to={'/auth/login'} className="hover:text-orange-500">
                <FaUser className="text-sm" />
              </Link>

              {/* REGISTER - Mobile transformé en Link */}
              <Link to={'/auth/register'} className="text-xs font-medium hover:text-orange-500 whitespace-nowrap">
                S'inscrire
              </Link>

              {/* CART - Mobile transformé en Link */}
              <Link to={'/panier'} className="relative hover:text-orange-500">
                <FaShoppingCart className="text-sm" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">{cartCount}</span>
              </Link>
            </div>
          </div>

<<<<<<< HEAD
        {/* input */}
        <input
          type="text"
          placeholder="Recherchez un produit"
          className="flex-1 px-2 text-black outline-none text-sm min-w-0"
        />

        {/* search button */}
        <button className="bg-orange-500 px-3 h-full flex items-center justify-center rounded-r-lg">
          <FaSearch className="text-white text-sm" />
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-10 shrink-0">

        {/* language */}
        <div
          ref={languageRef}
          className="relative flex items-center gap-1 cursor-pointer"
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
        >
          <span className="text-xs hidden sm:block">{language}</span>
          <FaChevronDown className="text-xs" />

          {isLanguageDropdownOpen && (
            <div className="absolute top-full left-0 bg-white border border-gray-300 rounded mt-1 w-20 z-20">
              {languages.map((lang) => (
                <div
                  key={lang}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-black text-xs"
                  onClick={() => {
                    setLanguage(lang);
                    setIsLanguageDropdownOpen(false);
                  }}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* user */}
        <div ref={userRef} className="relative">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <FaUser className="text-sm" />
            <Link to="/Login" className="text-xs hidden sm:block">
              Se connecter
            </Link>
          </div>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-20">
              <Link to="/Login" className="block px-3 py-2 hover:bg-gray-100 text-sm">
  Se connecter
</Link>
              <Link to="/SignUp" className="block px-3 py-2 hover:bg-gray-100 text-sm">
                S'inscrire
              </Link>
            </div>
          )}
        </div>

        {/* register */}
       <Link to="/SignUp" className="text-xs hidden sm:block hover:text-orange-500">
         S'inscrire
       </Link>

        {/* cart */}
        <div className="relative cursor-pointer">
          <FaShoppingCart size={16} />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-xs rounded-full px-1">
            0
          </span>
=======
          {/* LIGNE 2 : Barre de recherche mobile */}
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg h-10">
              <div className="relative h-full" ref={categoryMobileRef}>
                <button type="button" onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-1 px-2 text-gray-700 bg-gray-200 h-full text-xs whitespace-nowrap rounded-l-lg">
                  <span className="truncate max-w-[60px]">{category.name}</span>
                  <FaChevronDown className="text-[10px]" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl w-48 max-h-60 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button key={cat.id} onClick={() => handleCategoryChange(cat)} className="w-full text-left px-3 py-2.5 text-xs hover:bg-orange-500 hover:text-white">{cat.nom}</button>
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder="Rechercher un produit" value={searchTerm} onChange={handleInputChange} className="flex-1 px-2 text-gray-900 outline-none text-xs bg-transparent" />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-3 h-full rounded-r-lg"><FaSearch className="text-white text-xs" /></button>
            </form>
          </div>
>>>>>>> 5bcfe065ba02ea5c84a7b69c7e7acd8e2e3d1d6f
        </div>

      </div>
    </header>
  );
}