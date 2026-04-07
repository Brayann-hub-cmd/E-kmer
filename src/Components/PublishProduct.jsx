// src/pages/PublishProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaTimes, FaPlus, FaCloudUploadAlt, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

import { FaChevronDown, FaTimes, FaPlus } from "react-icons/fa";
import api from '../api'


const PublishProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  
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
  const token = localStorage.getItem('token')
  // Charger les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {

        const response = await axios.get(`${API_BASE_URL}/categories/`);
        setCategories(response.data);
        setApiError(null);
      } catch (error) {
        console.error("Erreur chargement catégories:", error);
        setCategories([
          { code: "Cat_1", nom: "Électronique" },
          { code: "Cat_2", nom: "Véhicule" },
          { code: "Cat_3", nom: "Mode" },
          { code: "Cat_4", nom: "Immobilier" },
          { code: "Cat_5", nom: "Services" },
          { code: "Cat_6", nom: "Produit agricole" }
        ]);

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

        const response = await axios.get(
          `${API_BASE_URL}/sous_categories/?categorie=${formData.categorieId}`

        const response = await api.get(
          `low_categories/${formData.categorieId}/sous_categories/`

        );
        setSousCategories(response.data);
      } catch (error) {

        const mockSousCategories = {
          Cat_1: [
            { code: "S_C_1", nom: "Téléphone" },
            { code: "S_C_2", nom: "Ordinateur" },
            { code: "S_C_3", nom: "Accessoire informatique" },
            { code: "S_C_4", nom: "Électroménager" },
            { code: "S_C_5", nom: "Accessoire high-tech" },
            { code: "S_C_6", nom: "Jeux vidéos et Console" }
          ]
        };
        setSousCategories(mockSousCategories[formData.categorieId] || []);

        console.error("Erreur chargement sous-catégories:", error);   
        setSousCategories([]);

      }
    };
    
    fetchSousCategories();
  }, [formData.categorieId]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
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
      setErrors(prev => ({ ...prev, images: "Maximum 3 images autorisées" }));
      return;
    }
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
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
      submitData.append("statut","Disponible")

      submitData.append("image",formData.images[0])

      await api.post(`annonces/`, submitData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization:`Bearer ${token}`
        },
      });
      console.log(submitData);
      
      navigate("/");
    } catch (error) {
      setErrors({ submit: "Erreur lors de la publication. Veuillez réessayer." });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate("/");
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  const Dropdown = ({ items, onSelect, placeholder, value, isOpen, setIsOpen, error }) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-left bg-white border ${error ? "border-red-500" : "border-gray-200"} rounded-xl flex items-center justify-between hover:border-orange-300 transition-all`}
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <FaChevronDown className={`text-gray-400 text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
          {items.map((item, idx) => (
            <button
              key={item.code || idx}
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
    <>
      {/* <Navbar /> - Commenté car à intégrer plus tard */}
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        {/* Modale */}
        <div className="w-full max-w-[680px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header orange */}
          <div className="bg-[#F07B10] px-6 py-5 relative">
            <h1 className="text-white text-2xl font-bold">Publier un produit</h1>
            <p className="text-white/80 text-sm mt-1">
              Remplissez les informations pour mettre votre produit en vente
            </p>
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <FaTimes className="text-white text-sm" />
            </button>
          </div>
          
          {/* Corps du formulaire */}
          <div className="p-6">
            {apiError && (
              <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                ⚠️ {apiError}
                <button onClick={() => window.location.reload()} className="ml-3 underline">Réessayer</button>
              </div>
            )}
            
            {errors.submit && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Étape 1 */}
              <div className={`p-4 rounded-xl border ${formData.categorie ? 'border-orange-300 bg-orange-50/30' : 'border-[#F5C18A] bg-[#FFF3E6]'}`}>
                <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  🗂 Etape 1 : Sélectionnez la catégorie principal
                </h2>
                <Dropdown
                  items={categories}
                  onSelect={handleCategorieSelect}
                  placeholder="-- Choisi une categorie --"
                  value={formData.categorie}
                  isOpen={isCategorieOpen}
                  setIsOpen={setIsCategorieOpen}
                  error={errors.categorie}
                />
              </div>
              
              {/* Étape 2 */}
              {formData.categorie && (
                <div className={`p-4 rounded-xl border ${formData.sousCategorie ? 'border-orange-300 bg-orange-50/30' : 'border-[#BFCFEA] bg-[#EEF4FF]'}`}>
                  <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    📦 Etape 2 : Précisez le type de produit
                  </h2>
                  <Dropdown
                    items={sousCategories}
                    onSelect={handleSousCategorieSelect}
                    placeholder="-- Choisi un type --"
                    value={formData.sousCategorie}
                    isOpen={isSousCategorieOpen}
                    setIsOpen={setIsSousCategorieOpen}
                    error={errors.sousCategorie}
                  />
                </div>
              )}
              
              {/* Formulaire complet */}
              {formData.sousCategorie && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du produit <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="titre"
                      value={formData.titre}
                      onChange={handleChange}
                      placeholder="Ex : Votre nom complet"
                      className={`w-full px-4 py-3 border ${errors.titre ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    />
                    {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prix (FCFA) <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="prix"
                      value={formData.prix}
                      onChange={handleChange}
                      placeholder="0"
                      className={`w-full px-4 py-3 border ${errors.prix ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                    {errors.prix && <p className="text-red-500 text-xs mt-1">{errors.prix}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Décrivez votre produit en détail..."
                      className={`w-full px-4 py-3 border ${errors.description ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none`}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="qte"
                        value={formData.qte}
                        onChange={handleChange}
                        placeholder="0"
                        className={`w-full px-4 py-3 border ${errors.qte ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      />
                      {errors.qte && <p className="text-red-500 text-xs mt-1">{errors.qte}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ville <span className="text-orange-500">*</span>
                      </label>
                      <Dropdown
                        items={villes.map(v => ({ nom: v, code: v }))}
                        onSelect={(item) => handleVilleSelect(item.nom)}
                        placeholder="Sélectionner"
                        value={formData.localisation}
                        isOpen={isVilleOpen}
                        setIsOpen={setIsVilleOpen}
                        error={errors.localisation}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image du produit <span className="text-orange-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed ${errors.images ? "border-red-500" : "border-orange-300"} rounded-xl p-6 transition-all bg-orange-50/30`}>
                      <div className="flex flex-wrap gap-3 mb-4">
                        {formData.images.map((image, idx) => (
                          <div key={idx} className="relative w-[72px] h-[72px] rounded-lg overflow-hidden bg-gray-100 border">
                            <img src={image.preview} alt="aperçu" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <FaTimesCircle className="text-xs" />
                            </button>
                          </div>
                        ))}
                        {formData.images.length < 3 && (
                          <label className="w-[72px] h-[72px] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors bg-white">
                            <FaPlus className="text-gray-400 text-lg" />
                            <span className="text-[10px] text-gray-400 mt-1">Ajouter</span>
                            <input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" multiple />
                          </label>
                        )}
                      </div>
                      <div className="text-center">
                        <FaCloudUploadAlt className="text-gray-400 text-3xl mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Cliquez pour ajouter une image</p>
                        <p className="text-xs text-gray-400">(Maximum 3 images, format jpg/png)</p>
                      </div>
                    </div>
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                  </div>
                </>
              )}
              
              {/* Boutons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.sousCategorie}
                  className={`flex-1 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-colors ${
                    formData.sousCategorie
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Publication..." : "Publier le produit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* <Footer /> - Commenté car à intégrer plus tard */}
    </>
  );
};

export default PublishProduct;