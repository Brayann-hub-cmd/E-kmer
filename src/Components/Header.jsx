import { useState, useCallback, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import bg from "../assets/images/bg Header.png";
import products from "../assets/images/products.png";
import toast from "react-hot-toast";
import api from "../api";




export default function Header(){

  const [active,setActive] = useState("Electronique")
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null)

 

  //  clic extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return(

    <div
      className="relative text-white bg-cover bg-center min-h-[60vh]"
      style={{
        backgroundImage:`linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)), url(${bg})`
      }}
    >

      {/* CATEGORIES BAR */}
      <div className="border-b border-orange-500/40">

        <div className="max-w-2xl mx-auto px-2 flex items-center justify-between">

          {/* menu hamburger mobile */}
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={(e)=>{
              e.stopPropagation()
              setMenuOpen(!menuOpen)
            }}
          >
            <FaBars/>
          </div>

          {/* categories desktop */}
          <div className="hidden md:flex gap-8 text-sm font-medium">

            {categories.map((cat)=>(

              <div
                key={cat}
                onClick={()=>setActive(cat)}
                className="relative cursor-pointer py-4"
              >

                <span className={active===cat ? "text-orange-500" : "hover:text-orange-400"}>
                  {cat}
                </span>

                {active===cat && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500"></div>
                )}

              </div>

            ))}

          </div>

        </div>

        {/* mobile menu */}
        {menuOpen && (

          <div
            ref={menuRef}
            className="md:hidden bg-black/90 flex flex-col items-center gap-6 py-6"
          >

            {categories.map((cat)=>(

              <div
                key={cat}
                onClick={()=>{
                  setActive(cat)
                  setMenuOpen(false) //  ferme après clic
                }}
                className="cursor-pointer text-lg hover:text-orange-500"
              >
                {cat}
              </div>

            ))}

          </div>

        )}

      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">

        {/* texte */}
        <div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Achetez et vendez  
            <br />
            au Cameroun
          </h1>

          <p className="mt-6 text-gray-200 max-w-md">
            Trouvez les meilleurs produits ou vendez facilement les vôtres partout au Cameroun.
          </p>

          {/* boutons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition">
              Commencez vos achats
            </button>

            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Vendez vos produits
            </button>

          </div>

        </div>

        {/* image produits */}
        <div className="flex justify-center lg:justify-end">

          <img
            src={products}
            alt="produits"
            className="w-full max-w-[420px] hover:scale-105 transition duration-300"
          />

        </div>

      </div>

    </div>

  )


  
  const location = useLocation(); // Pour détecter la route actuelle
  const [categorieData, setCategorieData] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("categories/")
        setCategorieData((categorieData)=>response.data)
      } catch (error) {
        toast.error("Une erreur est survenue lors de la collection des catégories de produits:" + error, { position: 'top-center' })
      }
    }
    getCategories();
  }, [])

  // Catégories avec les IDs de l'API
  const categories = useMemo(
    ()=>{
      return categorieData.map((cat)=>({
        code: `${cat.code}`,
        nom: `${cat.nom}`,
        path: `/categorie/${cat.nom.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, '')}`,
        slug: cat.nom.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, '')
      }));
    },[categorieData]
  );

  // Mettre à jour active en fonction de l'URL actuelle
  useEffect(() => {
    const currentPath = location.pathname;
    const currentCategory = categories.find(cat => currentPath.includes(cat.slug));
    if (currentCategory) {
      setActive(currentCategory.nom);
    } else if (currentPath === "/") {
      // Optionnel: mettre un état par défaut sur la page d'accueil
      // setActive("Electronique");
    }
  }, [location.pathname, categories]);

  const handleCategoryClick = useCallback(
    (cat) => {
      setActive(cat.nom);
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
              {/* Espace vide à gauche pour équilibrer (remplace le logo) */}
              <div className="w-[72px]"></div>

              {/* Desktop Navigation - CENTRÉ */}
              <nav className="hidden md:flex items-center justify-center flex-1" aria-label="Catégories">
                <div className="flex items-center space-x-1 lg:space-x-2 mx-auto">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/categorie/${cat.slug}?id=${cat.code}`}
                      onClick={() => handleCategoryClick(cat)}
                      className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-colors whitespace-nowrap ${active === cat.name
                          ? "text-orange-500"
                          : "text-gray-200 hover:text-orange-400"
                        }`}
                      aria-current={active === cat.nom ? "page" : undefined}
                    >
                      {cat.nom}
                      {active === cat.nom && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                      )}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Espace vide à droite pour équilibrer */}
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
              <Link
                key={cat.code}
                to={`/categorie/${cat.slug}?id=${cat.code}`}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full max-w-xs text-center py-3 px-4 rounded-lg text-lg font-medium transition-all ${active === cat.name
                    ? "bg-orange-500/20 text-orange-500 border-l-4 border-orange-500"
                    : "text-gray-200 hover:bg-white/10"
                  }`}
                aria-current={active === cat.nom ? "page" : undefined}
              >
                {cat.nom}
              </Link>
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
                Achetez et vendez au Cameroun
              </h1>

              <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                Trouvez les meilleurs produits ou vendez facilement les vôtres partout au Cameroun.
              </p>

              {/* Boutons avec liens */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
                <Link
                  to="/achats"
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/25 text-center inline-block"
                >
                  Commencez vos achats
                </Link>
                <Link
                  to="/vendre"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-center inline-block"
                >
                  Vendez vos produits
                </Link>
              </div>
            </div>

            {/* Image produits avec lien */}
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