import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Ajout de l'import Link
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaChevronDown,
} from "react-icons/fa";

export default function Header() {
  const [category, setCategory] = useState("Toutes les categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [language, setLanguage] = useState("FRA");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  const categoryRef = useRef(null);
  const languageRef = useRef(null);

  // LISTE COMPLÈTE DES CATÉGORIES
  const categories = [
    "Toutes les categories",
    "Électronique",
    "Véhicules",
    "Téléphones",
    "Produits agricoles",
    "Immobilier",
    "Vêtements",
    "Maison",
  ];

  // Fermer les dropdowns au clic externe
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fonction pour changer de catégorie
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsCategoryOpen(false);
    console.log("Catégorie sélectionnée PC:", selectedCategory);
  };

  // Fonction pour changer de langue
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
    console.log("Langue sélectionnée PC:", lang);
  };

  // Drapeaux pour les langues
  const flagIcon = language === "FRA" ? "🇫🇷" : "🇬🇧";

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        
        {/* ===== DESKTOP LAYOUT (lg et plus) ===== */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <a href="/" className="flex-shrink-0">
            <img src="/logo.png" alt="eKMER" className="h-10 w-auto" />
          </a>

          {/* SEARCH BAR AVEC CATÉGORIES */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center bg-gray-100 rounded-2xl h-11">
              
              {/* BOUTON CATÉGORIE */}
              <div className="relative h-full" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-4 text-gray-700 bg-gray-200 h-full whitespace-nowrap hover:bg-gray-300 transition-colors rounded-l-2xl min-w-[160px]"
                >
                  <span className="text-sm font-medium truncate">{category}</span>
                  <FaChevronDown className={`text-xs transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                
                {/* DROPDOWN CATÉGORIES PC */}
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl w-56 max-h-80 overflow-y-auto" style={{ zIndex: 9999 }}>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className="w-full text-left px-4 py-3 hover:bg-orange-500 hover:text-white text-gray-700 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <span className="text-sm">{cat}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* INPUT RECHERCHE */}
              <input
                type="text"
                placeholder="Recherchez un produit"
                className="flex-1 px-4 text-gray-900 outline-none text-sm bg-transparent"
              />

              {/* BOUTON RECHERCHE */}
              <button className="bg-orange-500 hover:bg-orange-600 px-8 cursor-pointer h-full flex items-center justify-center rounded-2xl">
                <FaSearch className="text-white text-sm" />
              </button>
            </div>
          </div>

          {/* LANGUAGE */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors"
            >
              <span className="text-base">{flagIcon}</span>
              <span className="font-medium">{language}</span>
              <FaChevronDown className={`text-xs transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl w-32 overflow-hidden" style={{ zIndex: 9999 }}>
                <button
                  onClick={() => handleLanguageChange("FRA")}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-orange-500 hover:text-white transition-colors border-b border-gray-100"
                >
                  <span>🇫🇷</span> Français
                </button>
                <button
                  onClick={() => handleLanguageChange("ENG")}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <span>🇬🇧</span> English
                </button>
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
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>

        {/* ===== TABLET LAYOUT (md à lg) ===== */}
        <div className="hidden md:flex lg:hidden items-center justify-between gap-2">
          
          <a href="/">
            <img src="/logo.png" alt="eKMER" className="h-8 w-auto" />
          </a>

          {/* SEARCH BAR AVEC CATÉGORIES - TABLET */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center bg-gray-100 rounded-lg h-10">
              
              {/* BOUTON CATÉGORIE TABLET */}
              <div className="relative h-full" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-2 text-gray-700 bg-gray-200 h-full text-xs whitespace-nowrap rounded-l-lg"
                >
                  <span className="truncate max-w-[70px]">{category}</span>
                  <FaChevronDown className={`text-[10px] transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                
                {/* DROPDOWN CATÉGORIES */}
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl w-48 max-h-80 overflow-y-auto" style={{ zIndex: 9999 }}>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-orange-500 hover:text-white text-gray-700 border-b border-gray-100 transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Rechercher..."
                className="flex-1 px-2 text-gray-900 outline-none text-xs bg-transparent"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-3 h-full rounded-r-lg">
                <FaSearch className="text-white text-xs" />
              </button>
            </div>
          </div>

          {/* LANGUAGE - TABLET */}
          <div className="relative" ref={languageRef}>
            <button 
              onClick={() => setIsLanguageOpen(!isLanguageOpen)} 
              className="flex items-center gap-1 text-sm hover:text-orange-500"
            >
              <span className="text-base">{flagIcon}</span>
              <span className="text-xs font-medium">{language}</span>
              <FaChevronDown className={`text-[10px] transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} />
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl w-24 overflow-hidden" style={{ zIndex: 9999 }}>
                <button
                  onClick={() => handleLanguageChange("FRA")}
                  className="w-full flex items-center gap-1 px-3 py-2 text-xs hover:bg-orange-500 hover:text-white transition-colors border-b border-gray-100"
                >
                  <span>🇫🇷</span> FRA
                </button>
                <button
                  onClick={() => handleLanguageChange("ENG")}
                  className="w-full flex items-center gap-1 px-3 py-2 text-xs hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <span>🇬🇧</span> ENG
                </button>
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
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>

        {/* ===== MOBILE LAYOUT - 2 LIGNES ===== */}
        <div className="md:hidden">
          
          {/* LIGNE 1 : Logo + Langue + User + Register + Panier */}
          <div className="flex items-center justify-between mb-3">
            <a href="/">
              <img src="/logo.png" alt="eKMER" className="h-6 w-auto" />
            </a>

            <div className="flex items-center gap-3">
              
              {/* LANGUAGE - MOBILE */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-1 text-sm hover:text-orange-500"
                >
                  <span className="text-base">{flagIcon}</span>
                  <span className="text-xs font-medium">{language}</span>
                  <FaChevronDown className={`text-[10px] transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} />
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl w-20 overflow-hidden" style={{ zIndex: 9999 }}>
                    <button
                      onClick={() => handleLanguageChange("FRA")}
                      className="w-full flex items-center justify-center gap-1 px-2 py-2 text-xs hover:bg-orange-500 hover:text-white transition-colors border-b border-gray-100"
                    >
                      <span>🇫🇷</span> FRA
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ENG")}
                      className="w-full flex items-center justify-center gap-1 px-2 py-2 text-xs hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      <span>🇬🇧</span> ENG
                    </button>
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
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* LIGNE 2 : Barre de recherche AVEC catégories */}
          <div className="flex items-center bg-gray-100 rounded-lg h-10">
            
            {/* BOUTON CATÉGORIE MOBILE */}
            <div className="relative h-full" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 px-2 text-gray-700 bg-gray-200 h-full text-xs whitespace-nowrap rounded-l-lg"
              >
                <span className="truncate max-w-[60px]">{category}</span>
                <FaChevronDown className={`text-[10px] transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              
              {/* DROPDOWN CATÉGORIES MOBILE */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl w-48 max-h-60 overflow-y-auto" style={{ zIndex: 9999 }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className="w-full text-left px-3 py-2.5 text-xs hover:bg-orange-500 hover:text-white text-gray-700 border-b border-gray-100 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Rechercher un produit"
              className="flex-1 px-2 text-gray-900 outline-none text-xs bg-transparent"
            />

            <button className="bg-orange-500 hover:bg-orange-600 px-3 h-full rounded-r-lg">
              <FaSearch className="text-white text-xs" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}