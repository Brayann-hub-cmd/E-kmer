// src/pages/CategoriePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CategorySection from "../../components/Categorie";

const CategoriePage = () => {
  const { categorieSlug } = useParams();
  const [searchParams] = useSearchParams();
  const categorieId = searchParams.get("id");

  const [sousCategories, setSousCategories] = useState([]);
  const [categorieNom, setCategorieNom] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSousCategorie, setActiveSousCategorie] = useState(null);

  // Mapping des slugs vers les noms
  const slugToNom = {
    electronique: "Électronique",
    vehicule: "Véhicule",
    mode: "Mode",
    immobilier: "Immobilier",
    services: "Services",
    "produits-agricoles": "Produits Agricoles"
  };

  // 🔹 DONNÉES MOCK COMPLÈTES POUR TOUTES LES CATÉGORIES
  const mockSousCategories = {
    // Électronique (Cat_1)
    Cat_1: [
      { code: "S_C_1", nom: "Téléphone", categorie: "Cat_1" },
      { code: "S_C_2", nom: "Ordinateur", categorie: "Cat_1" },
      { code: "S_C_3", nom: "Accessoire Informatique", categorie: "Cat_1" },
      { code: "S_C_4", nom: "Électroménager", categorie: "Cat_1" },
      { code: "S_C_5", nom: "Accessoire high-tech", categorie: "Cat_1" },
      { code: "S_C_6", nom: "Jeux vidéos et Console", categorie: "Cat_1" }
    ],
    // Véhicule (Cat_2)
    Cat_2: [
      { code: "S_C_7", nom: "Voitures", categorie: "Cat_2" },
      { code: "S_C_8", nom: "Motos", categorie: "Cat_2" },
      { code: "S_C_9", nom: "Vélos", categorie: "Cat_2" },
      { code: "S_C_10", nom: "Pièces détachées", categorie: "Cat_2" },
      { code: "S_C_11", nom: "Accessoires auto", categorie: "Cat_2" }
    ],
    // Mode (Cat_3)
    Cat_3: [
      { code: "S_C_12", nom: "Hommes", categorie: "Cat_3" },
      { code: "S_C_13", nom: "Femmes", categorie: "Cat_3" },
      { code: "S_C_14", nom: "Enfants", categorie: "Cat_3" },
      { code: "S_C_15", nom: "Chaussures", categorie: "Cat_3" },
      { code: "S_C_16", nom: "Accessoires", categorie: "Cat_3" }
    ],
    // Immobilier (Cat_4)
    Cat_4: [
      { code: "S_C_17", nom: "Appartements", categorie: "Cat_4" },
      { code: "S_C_18", nom: "Maisons", categorie: "Cat_4" },
      { code: "S_C_19", nom: "Terrains", categorie: "Cat_4" },
      { code: "S_C_20", nom: "Bureaux", categorie: "Cat_4" },
      { code: "S_C_21", nom: "Locaux commerciaux", categorie: "Cat_4" }
    ],
    // Services (Cat_5)
    Cat_5: [
      { code: "S_C_22", nom: "Réparation", categorie: "Cat_5" },
      { code: "S_C_23", nom: "Cours particuliers", categorie: "Cat_5" },
      { code: "S_C_24", nom: "Ménage", categorie: "Cat_5" },
      { code: "S_C_25", nom: "Jardinage", categorie: "Cat_5" },
      { code: "S_C_26", nom: "Informatique", categorie: "Cat_5" }
    ],
    // Produits Agricoles (Cat_6)
    Cat_6: [
      { code: "S_C_27", nom: "Fruits", categorie: "Cat_6" },
      { code: "S_C_28", nom: "Légumes", categorie: "Cat_6" },
      { code: "S_C_29", nom: "Céréales", categorie: "Cat_6" },
      { code: "S_C_30", nom: "Graines", categorie: "Cat_6" },
      { code: "S_C_31", nom: "Matériel agricole", categorie: "Cat_6" },
      { code: "S_C_32", nom: "Produits laitiers", categorie: "Cat_6" }
    ]
  };

  useEffect(() => {
    const loadSousCategories = async () => {
      if (!categorieId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Simulation de délai de chargement
      setTimeout(() => {
        const filtered = mockSousCategories[categorieId] || [];
        setSousCategories(filtered);

        if (filtered.length > 0) {
          setActiveSousCategorie(filtered[0].code);
        }

        setCategorieNom(slugToNom[categorieSlug] || "Catégorie");
        setLoading(false);
      }, 500);
    };

    loadSousCategories();
  }, [categorieId, categorieSlug]);

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
              ID: {categorieId}
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSousCategorie === sc.code
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