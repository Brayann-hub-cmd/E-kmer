import { useState, useCallback, useMemo } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import bg from "../assets/images/bg Header.png";
import products from "../assets/images/products.png";

export default function Header() {
  const [active, setActive] = useState("Electronique");
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = useMemo(
    () => [
      "Electronique",
      "Véhicule",
      "Mode",
      "Immobilier",
      "Services",
      "Produits Agricoles",
    ],
    []
  );

  const handleCategoryClick = useCallback(
    (cat) => {
      setActive(cat);
      setMenuOpen(false);
    },
    []
  );

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header className="relative text-white">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bg})`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* TOP BAR - Logo et menu hamburger */}
        <div className="border-b border-orange-500/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo - Ajout du logo manquant */}
              

              {/* Desktop Navigation - CENTRÉ */}
              <nav className="hidden md:flex items-center justify-center flex-3" aria-label="Catégories">
                <div className="flex items-center space-x-1 lg:space-x-2 mx-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-colors whitespace-nowrap ${
                        active === cat
                          ? "text-orange-500"
                          : "text-gray-200 hover:text-orange-400"
                      }`}
                      aria-current={active === cat ? "page" : undefined}
                    >
                      {cat}
                      {active === cat && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Espace vide pour équilibrer le layout (invisible sur mobile) */}
              <div className="hidden md:block w-[72px]"></div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
            md:hidden fixed inset-x-0 top-16 bg-black/95 backdrop-blur-sm transition-all duration-300 ease-in-out z-20
            ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col items-center space-y-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full max-w-xs text-center py-3 px-4 rounded-lg text-lg font-medium transition-all ${
                  active === cat
                    ? "bg-orange-500/20 text-orange-500 border-l-4 border-orange-500"
                    : "text-gray-200 hover:bg-white/10"
                }`}
                aria-current={active === cat ? "page" : undefined}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Overlay pour fermer le menu mobile */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-10"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* HERO SECTION */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Texte */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight">
                Achetez et vendre au Cameroun
              </h1>

              <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                Trouvez les meilleurs produits ou vendez facilement les vôtres partout au Cameroun.
              </p>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
                <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/25">
                  Commencez vos achats
                </button>
                <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                  Vendez vos produits
                </button>
              </div>
            </div>

            {/* Image produits */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[420px] xl:max-w-[500px]">
                <img
                  src={products}
                  alt="Produits populaires sur E-KMER"
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
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