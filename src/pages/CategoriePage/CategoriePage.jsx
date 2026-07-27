// src/pages/CategoriePage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CategorySection from "../../components/Categorie";
import BackToHome from "../../components/BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

const CategoriePage = () => {
  const { t } = useAppContext(); // ← Récupère les traductions
  const { categorieSlug } = useParams();
  const [searchParams] = useSearchParams();
  const categorieId = searchParams.get("id");

  const [sousCategories, setSousCategories] = useState([]);
  const [categorie, setCategorie] = useState({
    code: "",
    nom: ""
  });
  const [categories, setCategories] = useState([]);
  const [categorieNom, setCategorieNom] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSousCategorie, setActiveSousCategorie] = useState(null);
  
  useEffect(() => {
    const getCategorie = async () => {
      try {
        const response = await api.get(`categories/${categorieId}/`);
        setCategorie({
          code: `${response.data.code}`,
          nom: `${response.data.nom}`
        });
      } catch (error) {
        toast.error(t.errorLoading + ": " + error, { position: 'top-center' });
      }
    };
    getCategorie();
  }, [categorieId, t]);
  
  useEffect(() => {
    setCategorieNom(categorie.nom);
  }, [categorie]);
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("categories/");
        setCategories(response.data);
      } catch (error) {
        toast.error(t.errorLoadingCategories + ": " + error, { position: 'top-center' });
      }
    };
    getCategories();
  }, [t]);

  const slugToNom = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      const slug = cat.nom.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, '');
      map[slug] = cat.nom;
    });
    return map;
  }, [categories]);
  
  useEffect(() => {
    const loadSousCategories = async () => {
      if (!categorieId) {
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const response = await api.get(`low_categories/${categorieId}/sous_categories/`);
        const data = response.data;
        setSousCategories(data);

        if (data.length > 0) {
          setActiveSousCategorie(data[0].code);
        }
        setCategorieNom(slugToNom[categorieSlug] || t.category || "Catégorie");
      } catch (error) {
        console.error("Erreur API:", error);
        setSousCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadSousCategories();
  }, [categorieId, categorieSlug, slugToNom, t]);

  const scrollToSection = (code) => {
    setActiveSousCategorie(code);
    const element = document.getElementById(`section-${code}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <BackToHome />

        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            {categorieNom || <T>category</T>}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            <T>discoverAllProducts</T>
          </p>
          {categorieId && import.meta.env.MODE === "development" && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          </p>
          )}
        </div>

        {/* Barre "Rechercher par Catégories" */}
        {sousCategories.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <T>searchCategories</T>
            </h2>
            <div className="flex flex-wrap gap-2">
              {sousCategories.map((sc) => (
                <button
                  key={sc.code}
                  onClick={() => scrollToSection(sc.code)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSousCategorie === sc.code
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400"
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
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  <T>noSubCategories</T>
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  <T>noSubCategoriesDesc</T>
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