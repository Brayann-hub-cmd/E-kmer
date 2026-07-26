// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch, FaUser, FaShoppingCart, FaChevronDown,
  FaSignOutAlt, FaTimes, FaSun, FaMoon,
} from "react-icons/fa";
import api from "../api";
import { useAppContext } from "../context/AppContext";

export default function Navbar({ setTitle, setCategorie }) {
  const { isDarkMode, toggleTheme, language, changeLanguage, t } = useAppContext();

  // ── États existants 
  const [category, setCategory] = useState({
    code: "CAT_000", nom: "Toutes les categories", path: "/toutes-categories"
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("CAT_000");
  const [panier, setPanier] = useState([]);

  // Connexion
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Panier — nombre dynamique
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Profil utilisateur
  const [userProfile, setUserProfile] = useState(null);

  const searchRef = useRef(null);
  const categoryDesktopRef = useRef(null);
  const categoryTabletRef = useRef(null);
  const categoryMobileRef = useRef(null);
  const languageDesktopRef = useRef(null);
  const languageTabletRef = useRef(null);
  const languageMobileRef = useRef(null);
  const navigate = useNavigate();

  const getPanier = async () => {
    try {
      const res = await api.get("panier/");
      setPanier(res.data.items || []);
    } catch (error) {
      setCartCount(0);
    }
  };

  // ── Vérification connexion + chargement profil + panier ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      api.get("auth/profile/")
        .then((res) => setUserProfile(res.data))
        .catch(() => setUserProfile(null));
      getPanier();
    }
  }, []);

  useEffect(() => {
    setCartCount(panier.length);
  }, [panier]);

  // ── Déconnexion ───────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserProfile(null);
    setCartCount(0);
    setShowLogoutModal(false);
    setMobileMenuOpen(false);
    navigate("/auth/login");
  };

  // ── Catégories ────────────────────────────────────────────
  useEffect(() => {
    api.get("categories/")
      .then((res) => setCategories(res.data))
      .catch(() => { });
  }, []);

  // ── Recherche ─────────────────────────────────────────────
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!searchTerm.trim()) return;
  //   setIsSearching(true);
  //   setShowResults(true);
  //   setTitle(searchTerm);
  //   setCategorie(categorySelected);
  //   try {
  //   } catch {
  //     setSearchResults([]);
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setShowResults(true);
    setTitle(searchTerm);
    setCategorie(categorySelected);
    try {
      const res = await api.get(`annonce/search/?titre=${encodeURIComponent(searchTerm)}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error("Erreur recherche:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target))
        setShowResults(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleCategoryChange = (cat) => {
  //   setCategorySelected(cat);
  //   setCategory(cat);
  //   setIsCategoryOpen(false);
  // };
  const handleCategoryChange = (cat) => {
    setCategorySelected(cat.code);   // <- reste cohérent : toujours une string
    setCategory(cat);
    setIsCategoryOpen(false);
  };
  // ── Avatar utilisateur ────────────────────────────────────
  // ✅ BUG CORRIGÉ : la variable 't' renommée en 'parts' pour éviter le conflit avec le traducteur
  const formateProfil = (valeur) => {
    if (!valeur) return "P";
    const parts = String(valeur).split(" ");
    return parts.length > 1
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : parts[0][0]?.toUpperCase() || "P";
  };

  const AvatarBtn = ({ size = "sm" }) => {
    const cls = size === "sm"
      ? "w-7 h-7 text-[10px]"
      : "w-8 h-8 text-xs";

    return (
      <Link to="/profile" className="flex-shrink-0">
        {userProfile?.avatar ? (
          <img
            src={userProfile.avatar}
            alt="Profil"
            className={`${cls} rounded-full object-cover border-2 border-orange-400 hover:border-orange-500 transition-colors`}
          />
        ) : (
          <div className={`${cls} rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center transition-colors`}>
            {userProfile ? formateProfil(userProfile.username) : <FaUser className="text-xs" />}
          </div>
        )}
      </Link>
    );
  };

  // ── Modale déconnexion ────────────────────────────────────
  // ✅ BUG CORRIGÉ : message de confirmation plus propre
  const LogoutModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{t.logout}</h3>
          <button onClick={() => setShowLogoutModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {t.confirmLogout || "Êtes-vous sûr de vouloir vous déconnecter ?"}
          </p>
        </div>
        <div className="flex gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <button onClick={() => setShowLogoutModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
            {t.cancel}
          </button>
          <button onClick={handleLogout}
            className="flex-1 px-4 py-2 bg-orange-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-semibold">
            {t.logout}
          </button>
        </div>
      </div>
    </div>
  );

  // ── Bouton langue ────────────────────────────────────────────
  const LangBtn = ({ onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 border border-gray-600 transition-colors text-sm"
    >
      <span>{language === "FRA" ? "🇫🇷" : "🇬🇧"}</span>
      <FaChevronDown className="text-gray-300 text-[10px]" />
    </button>
  );

  // ── Bouton dark mode ──────────────────────────────────────
  const DarkBtn = () => (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 border border-gray-600 transition-colors"
      title={isDarkMode ? "Mode clair" : "Mode sombre"}
      aria-label={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {isDarkMode
        ? <FaSun className="text-yellow-400 text-sm" />
        : <FaMoon className="text-blue-300 text-sm" />
      }
    </button>
  );

  // ─────────────────────────────────────────────────────────
  return (
    <header className="bg-black dark:bg-gray-950 text-white sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-4 py-3">

        {/* ═══════════════════════════════════
            DESKTOP (≥ lg)
        ═══════════════════════════════════ */}
        <div className="hidden lg:flex items-center justify-between gap-4">

          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="eKMER" className={`h-10 w-auto transition-all duration-300 ${isDarkMode ? 'brightness-0 invert' : ''}`} />
          </Link>

          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl h-11">
              <div className="relative h-full" ref={categoryDesktopRef}>
                <button type="button" onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-4 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 h-full whitespace-nowrap hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors rounded-l-2xl min-w-[160px]">
                  <span className="text-sm font-medium truncate">{category.nom}</span>
                  <FaChevronDown className={`text-xs transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-56 max-h-80 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button key={cat.code} type="button" onClick={() => handleCategoryChange(cat)}
                        className="w-full text-left px-4 py-3 hover:bg-orange-500 hover:text-white text-gray-700 dark:text-gray-300 dark:hover:text-white border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors block">
                        <span className="text-sm">{cat.nom}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder={t.search}
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 text-gray-900 dark:text-gray-100 outline-none text-sm bg-transparent" />
              <button type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-8 h-full flex items-center justify-center rounded-2xl transition-colors">
                <FaSearch className="text-white text-sm" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">

            <DarkBtn />

            <div className="relative" ref={languageDesktopRef}>
              <LangBtn onClick={() => setIsLanguageOpen(!isLanguageOpen)} />
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl w-32 overflow-hidden z-50 border border-gray-100 dark:border-gray-700">
                  <button onClick={() => changeLanguage("FRA")} className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-orange-500 hover:text-white transition-colors">🇫🇷 Français</button>
                  <button onClick={() => changeLanguage("ENG")} className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-orange-500 hover:text-white transition-colors">🇬🇧 English</button>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <AvatarBtn size="md" />
                <button onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 transition-colors text-sm">
                  <FaSignOutAlt className="text-xs" />
                  <span>{t.logout}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-sm whitespace-nowrap transition-colors">
                  <FaUser className="text-xs" />
                  <span>{t.login}</span>
                </Link>
                <Link to="/auth/register"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-sm font-semibold whitespace-nowrap transition-colors">
                  {t.register}
                </Link>
              </div>
            )}

            <Link to="/panier" className="relative hover:text-orange-400 transition-colors">
              <FaShoppingCart className="text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════
            TABLET (md → lg)
        ═══════════════════════════════════ */}
        <div className="hidden md:flex lg:hidden items-center justify-between gap-2">
          <Link to="/"><img src="/logo.png" alt="eKMER" className={`h-8 w-auto transition-all duration-300 ${isDarkMode ? 'brightness-0 invert' : ''}`} /></Link>

          <div className="flex-1 max-w-md relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg h-10">
              <div className="relative h-full" ref={categoryTabletRef}>
                <button type="button" onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 h-full text-xs whitespace-nowrap rounded-l-lg">
                  <span className="truncate max-w-[70px]">{category.nom}</span>
                  <FaChevronDown className="text-[10px]" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-xl w-48 max-h-80 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button key={cat.code} onClick={() => handleCategoryChange(cat)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-orange-500 text-black dark:text-white hover:text-white">{cat.nom}</button>
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder={t.search} value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-2 text-gray-900 dark:text-gray-100 outline-none text-xs bg-transparent" />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-3 h-full rounded-r-lg transition-colors">
                <FaSearch className="text-white text-xs" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <DarkBtn />

            <div className="relative" ref={languageTabletRef}>
              <LangBtn onClick={() => setIsLanguageOpen(!isLanguageOpen)} />
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl w-28 z-50 border border-gray-100 dark:border-gray-700">
                  <button onClick={() => changeLanguage("FRA")} className="w-full px-3 py-2 text-xs hover:bg-orange-500 hover:text-white flex items-center gap-2 transition-colors">🇫🇷 Français</button>
                  <button onClick={() => changeLanguage("ENG")} className="w-full px-3 py-2 text-xs hover:bg-orange-500 hover:text-white flex items-center gap-2 transition-colors">🇬🇧 English</button>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <>
                <AvatarBtn size="sm" />
                <button onClick={() => setShowLogoutModal(true)}
                  className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 transition-colors">
                  <FaSignOutAlt className="text-xs" />
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login"
                  className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 transition-colors">
                  <FaUser className="text-sm" />
                </Link>
                <Link to="/auth/register"
                  className="px-2 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-semibold whitespace-nowrap transition-colors">
                  {t.register}
                </Link>
              </>
            )}

            <Link to="/panier" className="relative hover:text-orange-400 transition-colors">
              <FaShoppingCart className="text-sm" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════
            MOBILE (< md)
        ═══════════════════════════════════ */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            <Link to="/"><img src="/logo.png" alt="eKMER" className={`h-6 w-auto transition-all duration-300 ${isDarkMode ? 'brightness-0 invert' : ''}`} /></Link>

            <div className="flex items-center gap-2">
              <DarkBtn />

              <div className="relative" ref={languageMobileRef}>
                <LangBtn onClick={() => setIsLanguageOpen(!isLanguageOpen)} />
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl w-24 z-50 border border-gray-100 dark:border-gray-700">
                    <button onClick={() => changeLanguage("FRA")} className="w-full px-2 py-2 text-xs hover:bg-orange-500 hover:text-white flex items-center gap-1 transition-colors">🇫🇷 FRA</button>
                    <button onClick={() => changeLanguage("ENG")} className="w-full px-2 py-2 text-xs hover:bg-orange-500 hover:text-white flex items-center gap-1 transition-colors">🇬🇧 ENG</button>
                  </div>
                )}
              </div>

              {isLoggedIn ? (
                <>
                  <AvatarBtn size="sm" />
                  <button onClick={() => setShowLogoutModal(true)}
                    className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 transition-colors">
                    <FaSignOutAlt className="text-xs" />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login"
                    className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 transition-colors">
                    <FaUser className="text-sm" />
                  </Link>
                  <Link to="/auth/register"
                    className="px-2 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-semibold transition-colors">
                    {t.register}
                  </Link>
                </>
              )}

              <Link to="/panier" className="relative hover:text-orange-400 transition-colors">
                <FaShoppingCart className="text-sm" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                    {cartCount > 99 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg h-10">
              <div className="relative h-full" ref={categoryMobileRef}>
                <button type="button" onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 h-full text-xs whitespace-nowrap rounded-l-lg">
                  <span className="truncate max-w-[60px]">{category.nom}</span>
                  <FaChevronDown className="text-[10px]" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-xl w-48 max-h-60 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <button key={cat.code} onClick={() => handleCategoryChange(cat)}
                        className="w-full text-left px-3 py-2.5 text-xs hover:bg-orange-500 text-black dark:text-white hover:text-white">{cat.nom}</button>
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder={t.search}
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-2 text-gray-900 dark:text-gray-100 outline-none text-xs bg-transparent" />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-3 h-full rounded-r-lg transition-colors">
                <FaSearch className="text-white text-xs" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {showLogoutModal && <LogoutModal />}
    </header>
  );
}