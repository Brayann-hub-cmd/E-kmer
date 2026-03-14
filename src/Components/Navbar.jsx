import { useState } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [category, setCategory] = useState("Toutes les catégories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("FRA");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const categories = ["Toutes les catégories", "Électronique","Véhicules","Téléphones et accessoires","Produits agricoles","Immobilier","Vêtements", "Maison"];
  const languages = ["FRA", "ENG"];

  return (
    <nav className="bg-black text-white px-4 py-2 flex items-center justify-between flex-wrap">
      {/* LOGO */}
      <div className="mb-1 md:mb-0">
        <img src="/logo.png"  className="h-6 w-auto" />
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-white rounded-lg overflow-visible w-full md:w-[400px] h-8 mb-1 md:mb-0">
        {/* category */}
        <div className="relative flex items-center px-2 text-gray-700 border-r cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <span className="text-xs">{category}</span>
          <FaChevronDown className="ml-1 text-xs" />
          {isDropdownOpen && (
            <div className="absolute top-full left-0 bg-white border border-gray-300 rounded mt-1 w-full z-10">
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
          className="flex-1 px-2 text-black outline-none h-full text-sm"
        />

        {/* search button */}
        <button className="bg-orange-500 px-3 h-full flex items-center justify-center rounded-r-lg">
          <FaSearch className="text-white text-sm" />
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-12 flex-wrap">
        {/* language */}
        <div className="relative flex items-center gap-1 cursor-pointer mb-1 md:mb-0" onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
          <span className="text-xs">{language}</span>
          <FaChevronDown className="text-xs" />
          {isLanguageDropdownOpen && (
            <div className="absolute top-full left-0 bg-white border border-gray-300 rounded mt-1 w-full z-10">
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

        {/* login */}
        <div className="flex items-center gap-1 cursor-pointer mb-1 md:mb-0">
          <FaUser className="text-sm" />
          <span className="text-xs">Se connecter</span>
        </div>

        {/* register */}
        <span className="text-xs cursor-pointer mb-1 md:mb-0">S'inscrire</span>

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