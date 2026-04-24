import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaChevronDown,
} from "react-icons/fa";
import api from "../api";
<<<<<<< HEAD

export default function Navbar() {
  const [category, setCategory] = useState({
    code: "CAT_000",
    nom: "Toutes les categories",
    path: "/toutes-categories",
=======
export default function Navbar({ setTitle, setCategorie }) {
  const [category, setCategory] = useState({
    code: "CAT_000",
    nom: "Toutes les categories",
    path: "/toutes-categories"
>>>>>>> 92e17beac2711cb45f15b87a855051725367eebd
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
<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const categoryDesktopRef = useRef(null);
  const categoryTabletRef = useRef(null);
  const categoryMobileRef = useRef(null);
  const languageDesktopRef = useRef(null);
  const languageTabletRef = useRef(null);
  const languageMobileRef = useRef(null);
=======
  const [categories, setCategories] = useState([])
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [categorySelected, setCategorySelected] = useState("CAT_000")
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
>>>>>>> 92e17beac2711cb45f15b87a855051725367eebd

  useEffect(() => {
    const getCategorie = async () => {
      try {
        const response = await api.get("categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur catégories:", error);
      }
    };
    getCategorie();
<<<<<<< HEAD
  }, []);

  const mockProduits = [
    { code: "P001", title: "Casque Sony", prix: 15000, categorie: "CAT_001", localisation: "Douala" },
    { code: "P002", title: "Jacket en cuir", prix: 80000, categorie: "CAT_006", localisation: "Yaoundé" },
    { code: "P003", title: "Pixel 8 Pro", prix: 250000, categorie: "CAT_001", localisation: "Bafoussam" },
    { code: "P004", title: "Friteuse Philips", prix: 120000, categorie: "CAT_001", localisation: "Douala" },
    { code: "P005", title: "Air Jordan", prix: 20000, categorie: "CAT_006", localisation: "Garoua" },
  ];
=======
  }, [])
>>>>>>> 92e17beac2711cb45f15b87a855051725367eebd

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("props reçues: ", { setTitle, setCategorie })
    if (!searchTerm.trim()) return;
<<<<<<< HEAD
    setIsSearching(true);
    setShowResults(true);
    try {
      const results = mockProduits.filter((produit) => {
        const matchTitle = produit.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = category.code === "CAT_000" || produit.categorie === category.code;
        return matchTitle && matchCategory;
      });
      setSearchResults(results);
=======

    setIsSearching(true);
    setShowResults(true);
    setTitle(searchTerm)
    setCategorie(categorySelected)
    try {
>>>>>>> 92e17beac2711cb45f15b87a855051725367eebd
    } catch (error) {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target))
        setShowResults(false);
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

  /* ── Drapeau affiché dans le bouton langue (rectangle arrondi rouge+bleu) ── */
  const FlagButton = () => (
    <button
      onClick={() => setIsLanguageOpen(!isLanguageOpen)}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors"
      style={{ background: "#1a1a1a" }}
    >
      {/* Mini drapeau FR stylisé : deux bandes colorées */}
      <span className="flex rounded-sm overflow-hidden" style={{ width: 22, height: 15 }}>
        <span style={{ flex: 1, background: "#002395" }} />
        <span style={{ flex: 1, background: "#EDEDED" }} />
        <span style={{ flex: 1, background: "#ED2939" }} />
      </span>
      <FaChevronDown className="text-gray-400 text-[10px]" />
    </button>
  );

  return (
    <header className="bg-black text-white sticky top-0 z-50">
<<<<<<< HEAD
      <div className="container mx-auto px-4 sm:px-6 py-3">

        {/* ═══════════════════════════════════════
            DESKTOP (≥ lg)
        ═══════════════════════════════════════ */}
        <div className="hidden lg:flex items-center justify-between gap-6">
=======
      <div className="container mx-auto px-3 sm:px-4 py-3">

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden lg:flex items-center justify-between gap-4">
>>>>>>> 92e17beac2711cb45f15b87a855051725367eebd

          {/* LOGO */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1.5">
            <img src="/logo.png" alt="eKMER" className="h-9 w-auto" />
          </Link>

          {/* ── BARRE DE RECHERCHE ── */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1.5px solid #E0E0E0",
                height: 46,
              }}
            >
              {/* Dropdown catégorie */}
              <div className="relative h-full flex-shrink-0" ref={categoryDesktopRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-2 px-4 h-full text-gray-800 hover:bg-gray-50 transition-colors whitespace-nowrap"
                  style={{ minWidth: 185, borderRight: "1.5px solid #E0E0E0" }}
                >
                  <span className="text-sm font-medium truncate">{category.nom}</span>
                  <FaChevronDown
                    className={`text-gray-500 text-xs flex-shrink-0 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl w-56 max-h-72 overflow-y-auto z-50">
                    {[{ code: "CAT_000", nom: "Toutes les categories" }, ...categories].map((cat) => (
                      <button
                        key={cat.code}
                        type="button"
                        onClick={() => handleCategoryChange(cat)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-500 hover:text-white transition-colors border-b border-gray-100 last:border-0"
                      >
                        {cat.nom}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input texte */}
              <input
                type="text"
                placeholder="Recherchez un produit"
                value={searchTerm}
                onChange={handleInputChange}
                className="flex-1 px-4 text-gray-800 outline-none text-sm bg-transparent placeholder-gray-400"
              />

              {/* Bouton loupe */}
              <button
                type="submit"
                className="flex items-center justify-center h-full px-5 rounded-r-2xl transition-colors flex-shrink-0"
                style={{ background: "#F07B10", minWidth: 52 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#D96A08")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#F07B10")}
              >
                <FaSearch className="text-white text-base" />
              </button>
            </form>

            {/* Résultats de recherche */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                {isSearching ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Recherche...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => navigate(`/produit/${item.code}`)}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 border-b border-gray-100 last:border-0 flex justify-between items-center"
                    >
                      <span>{item.title}</span>
                      <span className="text-orange-500 font-semibold text-xs">{item.prix.toLocaleString()} FCFA</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-400">Aucun résultat trouvé</div>
                )}
              </div>
            )}
          </div>

          {/* ── LANGUE ── */}
          <div className="relative flex-shrink-0" ref={languageDesktopRef}>
            <FlagButton />
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-xl shadow-xl w-36 overflow-hidden z-50 border border-gray-100">
                <button
                  onClick={() => handleLanguageChange("FRA")}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-orange-500 hover:text-white transition-colors"
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

          {/* ── SE CONNECTER ── */}
          <Link
            to="auth/login"
            className="flex items-center gap-2 text-sm text-white hover:text-orange-400 whitespace-nowrap transition-colors flex-shrink-0"
          >
            {/* Icône utilisateur cerclée */}
            <span
              className="flex items-center justify-center rounded-full"
              style={{ width: 30, height: 30, background: "#2a2a2a", border: "1.5px solid #444" }}
            >
              {/* Silhouette personne SVG */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </span>
            <span>Se connecter</span>
          </Link>

          {/* ── S'INSCRIRE ── */}
          <Link
            to="auth/register"
            className="text-sm font-semibold text-white hover:text-orange-400 whitespace-nowrap transition-colors flex-shrink-0"
          >
            S'inscrire
          </Link>

          {/* ── PANIER ── */}
          <Link to="/panier" className="relative hover:text-orange-400 transition-colors flex-shrink-0">
            {/* Icône panier outline */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span
              className="absolute -top-2 -right-2 text-white text-[10px] rounded-full flex items-center justify-center font-bold"
              style={{ background: "#F07B10", minWidth: 18, height: 18, padding: "0 3px" }}
            >
              {cartCount}
            </span>
          </Link>
        </div>

        {/* ═══════════════════════════════════════
            TABLET (md → lg)
        ═══════════════════════════════════════ */}
        <div className="hidden md:flex lg:hidden items-center justify-between gap-3">
          <Link to="/"><img src="/logo.png" alt="eKMER" className="h-8 w-auto" /></Link>

          <div className="flex-1 max-w-md relative" ref={searchRef}>
            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-xl overflow-hidden"
              style={{ background: "#fff", border: "1.5px solid #E0E0E0", height: 40 }}
            >
              <div className="relative h-full" ref={categoryTabletRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-3 h-full text-gray-700 text-xs whitespace-nowrap"
                  style={{ borderRight: "1.5px solid #E0E0E0" }}
                >
                  <span className="truncate max-w-[80px]">{category.nom}</span>
                  <FaChevronDown className="text-[10px] text-gray-500" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-xl w-48 max-h-72 overflow-y-auto z-50">
                    {[{ code: "CAT_000", nom: "Toutes les categories" }, ...categories].map((cat) => (
                      <button key={cat.code} onClick={() => handleCategoryChange(cat)} className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-orange-500 hover:text-white">{cat.nom}</button>
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={handleInputChange} className="flex-1 px-3 text-gray-800 outline-none text-xs bg-transparent placeholder-gray-400" />
              <button type="submit" className="flex items-center justify-center h-full px-4" style={{ background: "#F07B10" }}>
                <FaSearch className="text-white text-xs" />
              </button>
            </form>
          </div>

<<<<<<< HEAD
=======
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

>>>>>>> 92e17beac2711cb45f15b87a855051725367eebd
          <div className="relative" ref={languageTabletRef}>
            <FlagButton />
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-xl shadow-xl w-32 z-50 border border-gray-100">
                <button onClick={() => handleLanguageChange("FRA")} className="w-full px-3 py-2 text-xs hover:bg-orange-500 hover:text-white flex items-center gap-2">🇫🇷 Français</button>
                <button onClick={() => handleLanguageChange("ENG")} className="w-full px-3 py-2 text-xs hover:bg-orange-500 hover:text-white flex items-center gap-2">🇬🇧 English</button>
              </div>
            )}
          </div>

          <Link to="/auth/login" className="text-white hover:text-orange-400 transition-colors">
            <span className="flex items-center justify-center rounded-full" style={{ width: 28, height: 28, background: "#2a2a2a", border: "1.5px solid #444" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </span>
          </Link>

          <Link to="/auth/register" className="text-xs font-semibold text-white hover:text-orange-400 whitespace-nowrap">S'inscrire</Link>

          <Link to="/panier" className="relative text-white hover:text-orange-400 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span className="absolute -top-2 -right-2 text-white text-[9px] rounded-full flex items-center justify-center font-bold" style={{ background: "#F07B10", minWidth: 16, height: 16 }}>{cartCount}</span>
          </Link>
        </div>

        {/* ═══════════════════════════════════════
            MOBILE (< md)
        ═══════════════════════════════════════ */}
        <div className="md:hidden">
          {/* Ligne 1 : logo + icônes */}
          <div className="flex items-center justify-between mb-3">
            <Link to="/"><img src="/logo.png" alt="eKMER" className="h-6 w-auto" /></Link>
            <div className="flex items-center gap-3">
              <div className="relative" ref={languageMobileRef}>
                <FlagButton />
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded-xl shadow-xl w-28 z-50 border border-gray-100">
                    <button onClick={() => handleLanguageChange("FRA")} className="w-full px-3 py-2 text-xs hover:bg-orange-500 hover:text-white flex items-center gap-2">🇫🇷 Français</button>
                    <button onClick={() => handleLanguageChange("ENG")} className="w-full px-3 py-2 text-xs hover:bg-orange-500 hover:text-white flex items-center gap-2">🇬🇧 English</button>
                  </div>
                )}
              </div>
              <Link to="/auth/login" className="text-white hover:text-orange-400">
                <span className="flex items-center justify-center rounded-full" style={{ width: 26, height: 26, background: "#2a2a2a", border: "1.5px solid #444" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </span>
              </Link>
              <Link to="/auth/register" className="text-xs font-semibold text-white hover:text-orange-400 whitespace-nowrap">S'inscrire</Link>
              <Link to="/panier" className="relative text-white hover:text-orange-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <span className="absolute -top-2 -right-2 text-white text-[8px] rounded-full flex items-center justify-center font-bold" style={{ background: "#F07B10", minWidth: 15, height: 15 }}>{cartCount}</span>
              </Link>
            </div>
          </div>

          {/* Ligne 2 : barre de recherche */}
          <div className="relative" ref={searchRef}>
            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-xl overflow-hidden"
              style={{ background: "#fff", border: "1.5px solid #E0E0E0", height: 40 }}
            >
              <div className="relative h-full" ref={categoryMobileRef}>
<<<<<<< HEAD
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-2 h-full text-gray-700 text-xs whitespace-nowrap"
                  style={{ borderRight: "1.5px solid #E0E0E0" }}
                >
                  <span className="truncate max-w-[60px]">{category.nom}</span>
                  <FaChevronDown className="text-[10px] text-gray-500" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-xl w-48 max-h-60 overflow-y-auto z-50">
                    {[{ code: "CAT_000", nom: "Toutes les categories" }, ...categories].map((cat) => (
                      <button key={cat.code} onClick={() => handleCategoryChange(cat)} className="w-full text-left px-3 py-2.5 text-xs text-gray-700 hover:bg-orange-500 hover:text-white">{cat.nom}</button>
=======
                <button type="button" onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-1 px-2 text-gray-700 bg-gray-200 h-full text-xs whitespace-nowrap rounded-l-lg">
                  <span className="truncate max-w-[60px]">{category.nom}</span>
                  <FaChevronDown className="text-[10px]" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-xl w-48 max-h-60 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button key={cat.code} onClick={() => handleCategoryChange(cat)} className="w-full text-left px-3 py-2.5 text-xs hover:bg-orange-500 text-black hover:text-white">{cat.nom}</button>
>>>>>>> 92e17beac2711cb45f15b87a855051725367eebd
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder="Rechercher un produit" value={searchTerm} onChange={handleInputChange} className="flex-1 px-3 text-gray-800 outline-none text-xs bg-transparent placeholder-gray-400" />
              <button type="submit" className="flex items-center justify-center h-full px-4 flex-shrink-0" style={{ background: "#F07B10" }}>
                <FaSearch className="text-white text-xs" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </header>
  );
}
