// src/pages/PublishProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaTimes, FaPlus } from "react-icons/fa";
import api from '../api'
import toast from "react-hot-toast";

const PublishProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // Pour le chargement initial
  const [apiError, setApiError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  // État du formulaire
  const [formData, setFormData] = useState({
    categorie: "",
    categorieId: "",
    sousCategorie: "",
    sousCategorieId: "",
    titre: "",
    prix: "",
    description: "",
    qte: "",
    localisation: "",
    images: []
  });

  // État des dropdowns
  const [isCategorieOpen, setIsCategorieOpen] = useState(false);
  const [isSousCategorieOpen, setIsSousCategorieOpen] = useState(false);
  const [isVilleOpen, setIsVilleOpen] = useState(false);

  // État des erreurs
  const [errors, setErrors] = useState({});

  // Villes du Cameroun
  const villes = [
    "Douala", "Yaoundé", "Bafoussam", "Garoua", "Maroua",
    "Ngaoundéré", "Bamenda", "Bertoua", "Ebolowa", "Kribi",
    "Limbe", "Buea", "Dschang", "Foumban", "Mbalmayo"
  ];
  // Charger les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Chargement des catégories...");
        const response = await api.get(`categories/`);
        console.log("Catégories chargées:", response.data);
        setCategories(response.data);
        setApiError(null);
      } catch (error) {

        setApiError("Impossible de charger les catégories. Vérifiez votre connexion au réseau.");
        // Données mock pour que la page s'affiche quand même
        setCategories([]);
      } finally {
        setPageLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Charger les sous-catégories quand la catégorie change
  useEffect(() => {
    const fetchSousCategories = async () => {
      if (!formData.categorieId) {
        setSousCategories([]);
        return;
      }

      try {
        const response = await api.get(
          `low_categories/${formData.categorieId}/sous_categories/`
        );
        console.log("Sous-catégories chargées:", response.data);
        setSousCategories(response.data);
      } catch (error) {
        console.error("Erreur chargement sous-catégories:", error);
        setSousCategories([]);
      }
    };

    fetchSousCategories();
  }, [formData.categorieId]);

  // Gestionnaire de changement de champ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Gestionnaire de sélection de catégorie
  const handleCategorieSelect = (categorie) => {
    setFormData(prev => ({
      ...prev,
      categorie: categorie.nom,
      categorieId: categorie.code,
      sousCategorie: "",
      sousCategorieId: ""
    }));
    setIsCategorieOpen(false);
    if (errors.categorie) setErrors(prev => ({ ...prev, categorie: "" }));
  };

  // Gestionnaire de sélection de sous-catégorie
  const handleSousCategorieSelect = (sousCategorie) => {
    setFormData(prev => ({
      ...prev,
      sousCategorie: sousCategorie.nom,
      sousCategorieId: sousCategorie.code
    }));
    setIsSousCategorieOpen(false);
    if (errors.sousCategorie) setErrors(prev => ({ ...prev, sousCategorie: "" }));
  };

  // Gestionnaire de sélection de ville
  const handleVilleSelect = (ville) => {
    setFormData(prev => ({ ...prev, localisation: ville }));
    setIsVilleOpen(false);
    if (errors.localisation) setErrors(prev => ({ ...prev, localisation: "" }));
  };

  // Gestionnaire d'upload d'images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 3) {
      setErrors(prev => ({ ...prev, images: "Maximum 3 images autorisées" }));
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    if (errors.images) setErrors(prev => ({ ...prev, images: "" }));
  };

  // Supprimer une image
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.categorie) newErrors.categorie = "Veuillez sélectionner une catégorie";
    if (!formData.sousCategorie) newErrors.sousCategorie = "Veuillez sélectionner un type";
    if (!formData.titre.trim()) newErrors.titre = "Nom du produit requis";
    if (formData.titre.trim().length < 3) newErrors.titre = "Minimum 3 caractères";
    if (!formData.prix || formData.prix <= 0) newErrors.prix = "Prix valide requis";
    if (!formData.description.trim()) newErrors.description = "Description requise";
    if (formData.description.trim().length < 20) newErrors.description = "Minimum 20 caractères";
    if (formData.qte === "" || formData.qte < 0) newErrors.qte = "Stock valide requis";
    if (!formData.localisation) newErrors.localisation = "Veuillez sélectionner une ville";
    if (formData.images.length === 0) newErrors.images = "Au moins une image requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("titre", formData.titre);
      submitData.append("prix", formData.prix);
      submitData.append("description", formData.description);
      submitData.append("qte", formData.qte);
      submitData.append("localisation", formData.localisation);
      submitData.append("sous_categorie", formData.sousCategorieId);
      formData.images.forEach((image) => {
        submitData.append("images_upload", image.file);
      });
      submitData.append("statut", "Disponible")

      submitData.append("image", formData.images[0].file)

      for (let [key, value] of submitData.entries()) {
        console.log(key, value);
      }
      await api.post(`annonces/`, submitData);
      toast.success("Anonce publié avec succès !",{position:"top-right"})
      setTimeout(
        ()=>{
          navigate("/");
        },1500
      )
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error.response.data.error)
      }
      else if (error.response?.status === 404) {
        toast.error(error.response.data.error)
      }
      else if (error.response?.status === 500) {
        toast.error("Un problème avec le serveur est survenue!")
      }
      else {
        toast.error(`Erreur : `, error)
      }
      setErrors({ submit: "Erreur lors de la publication. Veuillez réessayer." });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/vendre/");
  };

  // Afficher un écran de chargement
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  // Composant de dropdown personnalisé
  const Dropdown = ({ label, value, isOpen, setIsOpen, items, onSelect, placeholder, error }) => (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} <span className="text-orange-500">*</span>
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-left bg-white border ${error ? "border-red-500" : "border-gray-300"} rounded-xl flex items-center justify-between hover:border-gray-400 transition-colors`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <FaChevronDown className={`text-gray-400 text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isOpen && items.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
          {items.map((item, index) => (
            <button
              key={item.code || index}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
            >
              {item.nom || item}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Publier un produit
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Remplissez les informations pour mettre votre produit en vente
        </p>

        {/* Message d'erreur API */}
        {apiError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm">
            ⚠️ {apiError}
            <button
              onClick={() => window.location.reload()}
              className="ml-3 text-yellow-800 underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Message d'erreur global */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Étape 1: Catégorie */}
          <div>
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              Etape 1 : Sélectionnez la catégorie principal
            </h2>
            <Dropdown
              value={formData.categorie}
              isOpen={isCategorieOpen}
              setIsOpen={setIsCategorieOpen}
              items={categories}
              onSelect={handleCategorieSelect}
              placeholder="-- Choisir une catégorie --"
              error={errors.categorie}
            />
          </div>

          {/* Étape 2: Type de produit */}
          {formData.categorie && (
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-2">
                Etape 2 : Précisez le type de produit
              </h2>
              <Dropdown
                value={formData.sousCategorie}
                isOpen={isSousCategorieOpen}
                setIsOpen={setIsSousCategorieOpen}
                items={sousCategories}
                onSelect={handleSousCategorieSelect}
                placeholder="-- Choisir un type --"
                error={errors.sousCategorie}
              />
            </div>
          )}

          {/* Formulaire détaillé - reste identique */}
          {formData.sousCategorie && (
            <>
              {/* Nom du produit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom du produit <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder="Ex : Casque Sony"
                  className={`w-full px-4 py-3 border ${errors.titre ? "border-red-500" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                />
                {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre}</p>}
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Prix (FCFA) <span className="text-orange-500">*</span>
                </label>
                <input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full px-4 py-3 border ${errors.prix ? "border-red-500" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                />
                {errors.prix && <p className="text-red-500 text-xs mt-1">{errors.prix}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Décrivez votre produit en détail..."
                  className={`w-full px-4 py-3 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stock <span className="text-orange-500">*</span>
                </label>
                <input
                  type="number"
                  name="qte"
                  value={formData.qte}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full px-4 py-3 border ${errors.qte ? "border-red-500" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                />
                {errors.qte && <p className="text-red-500 text-xs mt-1">{errors.qte}</p>}
              </div>

              {/* Ville */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ville <span className="text-orange-500">*</span>
                </label>
                <Dropdown
                  value={formData.localisation}
                  isOpen={isVilleOpen}
                  setIsOpen={setIsVilleOpen}
                  items={villes.map(v => ({ nom: v, code: v }))}
                  onSelect={(item) => handleVilleSelect(item.nom)}
                  placeholder="Sélectionner une ville"
                  error={errors.localisation}
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Image du produit <span className="text-orange-500">*</span>
                </label>
                <div className={`border-2 border-dashed ${errors.images ? "border-red-500" : "border-gray-300"} rounded-xl p-4 transition-all`}>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img src={image.preview} alt={`Aperçu ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    ))}
                    {formData.images.length < 3 && (
                      <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors">
                        <FaPlus className="text-gray-400 text-xl" />
                        <span className="text-xs text-gray-400 mt-1">Ajouter</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png"
                          onChange={handleImageUpload}
                          className="hidden"
                          multiple
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    Cliquez pour ajouter une image (Maximum 3 images, format jpg/png)
                  </p>
                </div>
                {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
              </div>
            </>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publication..." : "Publier le produit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishProduct;