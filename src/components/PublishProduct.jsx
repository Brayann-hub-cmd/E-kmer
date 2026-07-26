// src/pages/PublishProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaTimes, FaPlus } from "react-icons/fa";
import api from '../api';
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext"; // ← IMPORT
import T from "./T"; // ← IMPORT

const PublishProduct = () => {
  const { t } = useAppContext(); // ← Récupère les traductions
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  
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

  const [isCategorieOpen, setIsCategorieOpen] = useState(false);
  const [isSousCategorieOpen, setIsSousCategorieOpen] = useState(false);
  const [isVilleOpen, setIsVilleOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const villes = [
    "Douala", "Yaoundé", "Bafoussam", "Garoua", "Maroua",
    "Ngaoundéré", "Bamenda", "Bertoua", "Ebolowa", "Kribi",
    "Limbe", "Buea", "Dschang", "Foumban", "Mbalmayo"
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Chargement des catégories...");
        const response = await api.get(`categories/`);
        console.log("Catégories chargées:", response.data);
        setCategories(response.data);
        setApiError(null);
      } catch (error) {
        setApiError(t.errorLoadingCategories || "Impossible de charger les catégories. Vérifiez votre connexion au réseau.");
        setCategories([]);
      } finally {
        setPageLoading(false);
      }
    };
    fetchCategories();
  }, []);

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
        setSousCategories(response.data);
      } catch (error) {
        console.error("Erreur chargement sous-catégories:", error);
        setSousCategories([]);
      }
    };

    fetchSousCategories();
  }, [formData.categorieId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

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

  const handleSousCategorieSelect = (sousCategorie) => {
    setFormData(prev => ({
      ...prev,
      sousCategorie: sousCategorie.nom,
      sousCategorieId: sousCategorie.code
    }));
    setIsSousCategorieOpen(false);
    if (errors.sousCategorie) setErrors(prev => ({ ...prev, sousCategorie: "" }));
  };

  const handleVilleSelect = (ville) => {
    setFormData(prev => ({ ...prev, localisation: ville }));
    setIsVilleOpen(false);
    if (errors.localisation) setErrors(prev => ({ ...prev, localisation: "" }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 3) {
      setErrors(prev => ({ ...prev, images: t.maxImagesError || "Maximum 3 images autorisées" }));
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

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.categorie) newErrors.categorie = t.required || "Veuillez sélectionner une catégorie";
    if (!formData.sousCategorie) newErrors.sousCategorie = t.required || "Veuillez sélectionner un type";
    if (!formData.titre.trim()) newErrors.titre = t.required || "Nom du produit requis";
    if (formData.titre.trim().length < 3) newErrors.titre = t.minChars || "Minimum 3 caractères";
    if (!formData.prix || formData.prix <= 0) newErrors.prix = t.validPrice || "Prix valide requis";
    if (!formData.description.trim()) newErrors.description = t.required || "Description requise";
    if (formData.description.trim().length < 20) newErrors.description = t.min20Chars || "Minimum 20 caractères";
    if (formData.qte === "" || formData.qte < 0) newErrors.qte = t.validStock || "Stock valide requis";
    if (!formData.localisation) newErrors.localisation = t.required || "Veuillez sélectionner une ville";
    if (formData.images.length === 0) newErrors.images = t.atLeastOneImage || "Au moins une image requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      submitData.append("statut", "Disponible");
      submitData.append("image", formData.images[0].file);

      for (let [key, value] of submitData.entries()) {
      }
      await api.post(`annonces/`, submitData);
      toast.success(t.successPublish || "Annonce publiée avec succès !", { position: "top-right" });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error.response.data.error);
      } else if (error.response?.status === 404) {
        toast.error(error.response.data.error);
      } else if (error.response?.status === 500) {
        toast.error(t.serverError || "Un problème avec le serveur est survenue!");
      } else {
        toast.error(`Erreur : `, error);
      }
      setErrors({ submit: t.publishError || "Erreur lors de la publication. Veuillez réessayer." });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/vendre/");
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400"><T>loading</T></p>
        </div>
      </div>
    );
  }

  const Dropdown = ({ label, value, isOpen, setIsOpen, items, onSelect, placeholder, error }) => (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          <T>{label}</T> <span className="text-orange-500">*</span>
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-left bg-white dark:bg-gray-800 border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-xl flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-500 transition-colors`}
      >
        <span className={value ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}>
          {value || (placeholder ? t[placeholder] || placeholder : "")}
        </span>
        <FaChevronDown className={`text-gray-400 dark:text-gray-500 text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isOpen && items.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
          {items.map((item, index) => (
            <button
              key={item.code || index}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              {item.nom || item}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
          <T>publishTitle</T>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
          <T>publishSubtitle</T>
        </p>

        {apiError && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl text-yellow-700 dark:text-yellow-300 text-sm">
            ⚠️ {apiError}
            <button
              onClick={() => window.location.reload()}
              className="ml-3 text-yellow-800 dark:text-yellow-400 underline"
            >
              <T>tryAgain</T>
            </button>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
              <T>step1</T>
            </h2>
            <Dropdown
              label={null}
              value={formData.categorie}
              isOpen={isCategorieOpen}
              setIsOpen={setIsCategorieOpen}
              items={categories}
              onSelect={handleCategorieSelect}
              placeholder="chooseCategory"
              error={errors.categorie}
            />
          </div>

          {formData.categorie && (
            <div>
              <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
                <T>step2</T>
              </h2>
              <Dropdown
                label={null}
                value={formData.sousCategorie}
                isOpen={isSousCategorieOpen}
                setIsOpen={setIsSousCategorieOpen}
                items={sousCategories}
                onSelect={handleSousCategorieSelect}
                placeholder="chooseType"
                error={errors.sousCategorie}
              />
            </div>
          )}

          {formData.sousCategorie && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <T>productName</T> <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder={t.productNamePlaceholder || "Ex : Casque Sony"}
                  className={`w-full px-4 py-3 border ${errors.titre ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                />
                {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <T>productPrice</T> <span className="text-orange-500">*</span>
                </label>
                <input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full px-4 py-3 border ${errors.prix ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                />
                {errors.prix && <p className="text-red-500 text-xs mt-1">{errors.prix}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <T>productDescription</T> <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t.productDescriptionPlaceholder || "Décrivez votre produit en détail..."}
                  className={`w-full px-4 py-3 border ${errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <T>productStock</T> <span className="text-orange-500">*</span>
                </label>
                <input
                  type="number"
                  name="qte"
                  value={formData.qte}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full px-4 py-3 border ${errors.qte ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                />
                {errors.qte && <p className="text-red-500 text-xs mt-1">{errors.qte}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <T>productCity</T> <span className="text-orange-500">*</span>
                </label>
                <Dropdown
                  label={null}
                  value={formData.localisation}
                  isOpen={isVilleOpen}
                  setIsOpen={setIsVilleOpen}
                  items={villes.map(v => ({ nom: v, code: v }))}
                  onSelect={(item) => handleVilleSelect(item.nom)}
                  placeholder="selectCity"
                  error={errors.localisation}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <T>productImage</T> <span className="text-orange-500">*</span>
                </label>
                <div className={`border-2 border-dashed ${errors.images ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-xl p-4 transition-all`}>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
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
                      <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors">
                        <FaPlus className="text-gray-400 dark:text-gray-500 text-xl" />
                        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1"><T>addImage</T></span>
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
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    <T>clickToAddImage</T>
                  </p>
                </div>
                {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
              </div>
            </>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <T>cancelPublish</T>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <T>publishing</T> : <T>publish</T>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishProduct;