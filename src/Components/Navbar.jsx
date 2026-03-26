import { useState, useRef, useEffect } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api";

export default function Navbar() {

  const [category, setCategory] = useState({
    code: "CAT_000",
    nom: "Toutes les catégories"
  });

  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [language, setLanguage] = useState("FRA");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount] = useState(2);

  const categoryRef = useRef(null);
  const searchRef = useRef(null);

  // Charger catégories API
  useEffect(() => {
    const getCategorie = async () => {
      try {
        const res = await api.get("categories/");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategorie();
  }, []);

  // fermer dropdown si clic extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-white p-3 flex justify-between items-center">

      {/* LOGO */}
      <Link to="/">
        <img src="/logo.png" className="h-8" />
      </Link>

      {/* SEARCH */}
      <div className="flex items-center bg-white rounded-lg overflow-hidden w-[400px]" ref={searchRef}>

        {/* CATEGORY */}
        <div
          ref={categoryRef}
          className="relative bg-gray-200 px-3 cursor-pointer flex items-center"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <span className="text-sm text-black">{category.nom}</span>
          <FaChevronDown className="ml-1 text-xs text-black" />

          {isCategoryOpen && (
            <div className="absolute top-full left-0 bg-white text-black w-48 shadow-md z-50">
              {categories.map((cat) => (
                <div
                  key={cat.code}
                  className="px-3 py-2 hover:bg-orange-500 hover:text-white cursor-pointer"
                  onClick={() => {
                    setCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                >
                  {cat.nom}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Rechercher..."
          className="flex-1 px-3 outline-none text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* BUTTON */}
        <button className="bg-orange-500 px-4 h-full">
          <FaSearch />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* LANGUAGE */}
        <div className="relative">
          <button onClick={() => setIsLanguageOpen(!isLanguageOpen)}>
            {language}
          </button>

          {isLanguageOpen && (
            <div className="absolute right-0 bg-white text-black">
              <div onClick={() => setLanguage("FRA")} className="p-2 cursor-pointer">FRA</div>
              <div onClick={() => setLanguage("ENG")} className="p-2 cursor-pointer">ENG</div>
            </div>
          )}
        </div>

        {/* LOGIN */}
        <Link to="/auth/login">
          <FaUser />
        </Link>

        {/* REGISTER */}
        <Link to="/auth/register">
          S'inscrire
        </Link>

        {/* CART */}
        <Link to="/panier" className="relative">
          <FaShoppingCart />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full px-1">
            {cartCount}
          </span>
        </Link>

      </div>
    </header>
  );
}