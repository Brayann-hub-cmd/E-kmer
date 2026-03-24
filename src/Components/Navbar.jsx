import { useState, useRef, useEffect } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [category, setCategory] = useState("Toutes les catégories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("FRA");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  //  reférence pour chaque menu
  const categoryRef = useRef(null);
  const languageRef = useRef(null);
  const userRef = useRef(null);

  const categories = ["Toutes les catégories", "Électronique","Véhicules","Téléphones et accessoires","Produits agricoles","Immobilier","Vêtements", "Maison"];
  const languages = ["FRA", "ENG"];

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
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

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
        </div>

      </div>
    </nav>
  );
}