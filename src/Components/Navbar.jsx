import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaChevronDown,
} from "react-icons/fa";

export default function Header() {
  const [category, setCategory] = useState({ 
    id: "CAT_000", 
    name: "Toutes les categories",
    path: "/toutes-categories" 
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [language, setLanguage] = useState("FRA");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  // Refs séparées pour chaque vue
  const categoryDesktopRef = useRef(null);
  const categoryTabletRef = useRef(null);
  const categoryMobileRef = useRef(null);
  
  const languageDesktopRef = useRef(null);
  const languageTabletRef = useRef(null);
  const languageMobileRef = useRef(null);

  // ============================================
  // SYSTÈME DE CATÉGORIES - UNIQUEMENT LES IDs
  // ============================================
  
  // Catégories principales avec leurs IDs
  const categories = [
    { id: "CAT_000", name: "Toutes les categories", path: "/toutes-categories" },
    { id: "CAT_001", name: "Électronique", path: "/categorie/electronique" },
    { id: "CAT_002", name: "Véhicules", path: "/categorie/vehicules" },
    { id: "CAT_003", name: "Téléphones", path: "/categorie/telephones" },
    { id: "CAT_004", name: "Produits agricoles", path: "/categorie/produits-agricoles" },
    { id: "CAT_005", name: "Immobilier", path: "/categorie/immobilier" },
    { id: "CAT_006", name: "Vêtements", path: "/categorie/vetements" },
    { id: "CAT_007", name: "Maison", path: "/categorie/maison" },
  ];

  // Sous-catégories reliées par parentId (ID de la catégorie principale)
  const sousCategories = {
    CAT_001: [ // Électronique
      { id: "S_C_001", name: "Téléphone", parentId: "CAT_001" },
      { id: "S_C_002", name: "Ordinateur", parentId: "CAT_001" },
      { id: "S_C_003", name: "Accessoire Informatique", parentId: "CAT_001" },
      { id: "S_C_004", name: "Électroménager", parentId: "CAT_001" },
      { id: "S_C_005", name: "Accessoire high-tech", parentId: "CAT_001" },
      { id: "S_C_006", name: "Jeux vidéos et Console", parentId: "CAT_001" },
    ],
    CAT_002: [ // Véhicules
      { id: "S_C_007", name: "Voitures", parentId: "CAT_002" },
      { id: "S_C_008", name: "Motos", parentId: "CAT_002" },
      { id: "S_C_009", name: "Vélos", parentId: "CAT_002" },
      { id: "S_C_010", name: "Pièces détachées", parentId: "CAT_002" },
    ],
    // ... autres catégories
  };

  // Fonction pour obtenir les sous-catégories d'une catégorie
  const getSousCategoriesByCategorieId = (categorieId) => {
    return sousCategories[categorieId] || [];
  };

  // Fermer les dropdowns au clic externe
  useEffect(() => {
    function handleClickOutside(event) {
      const isCategoryClick = 
        (categoryDesktopRef.current && categoryDesktopRef.current.contains(event.target)) ||
        (categoryTabletRef.current && categoryTabletRef.current.contains(event.target)) ||
        (categoryMobileRef.current && categoryMobileRef.current.contains(event.target));
      
      const isLanguageClick = 
        (languageDesktopRef.current && languageDesktopRef.current.contains(event.target)) ||
        (languageTabletRef.current && languageTabletRef.current.contains(event.target)) ||
        (languageMobileRef.current && languageMobileRef.current.contains(event.target));

      if (!isCategoryClick) setIsCategoryOpen(false);
      if (!isLanguageClick) setIsLanguageOpen(false);
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fonction pour changer de catégorie
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsCategoryOpen(false);
    
    // Récupérer les sous-catégories de cette catégorie
    const sousCats = getSousCategoriesByCategorieId(selectedCategory.id);
    console.log("Catégorie ID:", selectedCategory.id);
    console.log("Sous-catégories:", sousCats);
    
    // Les IDs des sous-catégories pourront être utilisés dans l'API
    // Exemple: /api/annonces?sous_categorie=S_C_001
  };

  // Fonction pour changer de langue
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const flagIcon = language === "FRA" ? "🇫🇷" : "🇬🇧";

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
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center bg-gray-100 rounded-2xl h-11">
              
              {/* BOUTON CATÉGORIE */}
              <div className="relative h-full" ref={categoryDesktopRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-1 px-4 text-gray-700 bg-gray-200 h-full whitespace-nowrap hover:bg-gray-300 transition-colors rounded-l-2xl min-w-[160px]"
                >
                  <span className="text-sm font-medium truncate">{category.name}</span>
                  <FaChevronDown className={`text-xs transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                
                {/* DROPDOWN CATÉGORIES */}
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl w-56 max-h-80 overflow-y-auto" style={{ zIndex: 9999 }}>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={cat.path}
                        state={{ categorieId: cat.id }} // L'ID est passé à la page de catégorie
                        onClick={() => handleCategoryChange(cat)}
                        className="w-full text-left px-4 py-3 hover:bg-orange-500 hover:text-white text-gray-700 border-b border-gray-100 last:border-0 transition-colors block"
                      >
                        <span className="text-sm">{cat.name}</span>
                      </Link>
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
              <Link 
                to="/recherche" 
                className="bg-orange-500 hover:bg-orange-600 px-8 cursor-pointer h-full flex items-center justify-center rounded-2xl"
              >
                <FaSearch className="text-white text-sm" />
              </Link>
            </div>
          </div>

          {/* LANGUAGE */}
          <div className="relative" ref={languageDesktopRef}>
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

          {/* LOGIN */}
          <Link to="/auth/login" className="flex items-center gap-2 text-sm hover:text-orange-500 whitespace-nowrap">
            <FaUser className="text-sm" />
            <span>Se connecter</span>
          </Link>

          {/* REGISTER */}
          <Link to="/auth/register" className="text-sm font-medium hover:text-orange-500 whitespace-nowrap">
            S'inscrire
          </Link>

          {/* CART */}
          <Link to="/panier" className="relative hover:text-orange-500">
            <FaShoppingCart className="text-lg" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>

        {/* ===== VUES TABLET ET MOBILE (similaires avec les mêmes IDs) ===== */}
        {/* ... (les autres vues restent identiques avec les mêmes liens et IDs) */}
        
      </div>
    </header>
  );
}