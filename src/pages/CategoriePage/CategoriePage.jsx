import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CategorySection from "../../components/Categorie";
import api from "../../api";
import toast from "react-hot-toast";
const CategoriePage = () => {
  const { categorieSlug } = useParams();
  const [searchParams] = useSearchParams();
  const categorieId = searchParams.get("id");

  const [sousCategories, setSousCategories] = useState([]);
  const [categorie, setCategorie] = useState({
    code: "",
    nom: ""
  })
  const [categories, setCategories] = useState([])
  const [categorieNom, setCategorieNom] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSousCategorie, setActiveSousCategorie] = useState(null);
  //Recuperation de la catégorie sélectionnée
  useEffect(() => {
    const getCategorie = async (code) => {
      try {
        const response = await api.get(`categories/${categorieId}/`)
        setCategorie(prev => ({
          ...prev,
          code: `${response.data.code}`,
          nom: `${response.data.nom}`
        }))
      } catch (error) {
        toast.error("Une erreur est survenue lors de la collection de la catégorie:" + error, { position: 'top-center' })
      }
    }
    getCategorie();
  }, [])
  //Initialisation de la variable categorieNom
  useEffect(() => {
    setCategorieNom((categorieNom) => categorie.nom);
  }, [categorie])
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("categories/")
        setCategories((categories) => response.data)
      } catch (error) {
        toast.error("Erreur survenue lors de la collection des catégories de produits:" + error, { position: 'top-center' })
      }
    }
    getCategories();
  }, [])

  const slugToNom = useMemo(
    () => {
      const map = {}
      categories.forEach((cat) => {
        const slug = cat.nom.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, '')
        map[slug] = cat.nom;
      });
      return map;
    }, [categories]
  )
  const allSousCategories = async (id_categorie) =>{
    try {
      const response = await api.get(`low_categories/${id_categorie}/sous_categories/`)
      return response.data
    } catch (error) {
      toast.error("Erreur survenue lors de la collection des sous catégories" + error, { position: 'top-center' })
      return []
    }
  }
  
  useEffect(() => {
    const loadSousCategories = async () => {
      if (!categorieId) {
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const response = await api.get(`low_categories/${categorieId}/sous_categories/`)
        const data = response.data;
        setSousCategories(data)

        if(data.length > 0){
          setActiveSousCategorie(data[0].code)
        }
        setCategorieNom(slugToNom[categorieSlug] || "Catégorie");
      } catch (error) {
        console.error("Erreur API:",error);
        setSousCategories([])
      }finally{
        setLoading(false)
      }
      // setTimeout(() => {
      //   const filtered = mockSousCategories[categorieId] || [];
      //   setSousCategories(filtered);

      //   if (filtered.length > 0) {
      //     setActiveSousCategorie(filtered[0].code);
      //   }
          // setCategorieNom(slugToNom[categorieSlug] || "Catégorie");
      //   setLoading(false);
      // }, 500);
    };

    loadSousCategories();
  }, [categorieId, categorieSlug, slugToNom]);

  const scrollToSection = (code) => {
    setActiveSousCategorie(code);
    const element = document.getElementById(`section-${code}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {categorieNom || "Catégorie"}
          </h1>
          <p className="text-gray-500 mt-1">
            Découvrez tous nos produits
          </p>
          {categorieId && process.env.NODE_ENV === "development" && (
            <p className="text-xs text-gray-400 mt-1">
            </p>
          )}
        </div>

        {/* Barre "Rechercher par Catégories" */}
        {sousCategories.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Rechercher par Catégories
            </h2>
            <div className="flex flex-wrap gap-2">
              {sousCategories.map((sc) => (
                <button
                  key={sc.code}
                  onClick={() => scrollToSection(sc.code)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeSousCategorie === sc.code
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                    }`}
                >
                  {sc.nom}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contenu principal */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {sousCategories.map((sc) => (
              <div key={sc.code} id={`section-${sc.code}`}>
                <CategorySection sousCategorie={sc} categorieId={categorieId} />
              </div>
            ))}

            {sousCategories.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">
                  Aucune sous-catégorie trouvée.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Cette catégorie n'a pas encore de sous-catégories.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriePage;