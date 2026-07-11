// src/pages/Parametres.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import api from "../../api";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaPhone, FaStore, FaSave, FaCamera, FaTimes, FaUpload, FaEdit } from "react-icons/fa";

// ── Champ de formulaire ───────────────────────────────────────
const FormField = ({ label, required, icon: Icon, type = "text", name, value, onChange, placeholder, error, disabled }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-white dark:bg-gray-800 transition-colors ${
      error ? "border-red-400" : "border-gray-200 dark:border-gray-600 focus-within:border-orange-400 dark:focus-within:border-orange-500"
    } ${disabled ? "bg-gray-50 dark:bg-gray-700" : ""}`}>
      {Icon && <Icon className="text-gray-400 dark:text-gray-500 flex-shrink-0" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`flex-1 outline-none text-sm bg-transparent placeholder-gray-400 dark:placeholder-gray-500 ${disabled ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-white"}`}
      />
    </div>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

// ── Champ textarea ────────────────────────────────────────────
const FormTextArea = ({ label, required, name, value, onChange, placeholder, error, disabled }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      disabled={disabled}
      className={`border rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 outline-none transition-colors resize-none ${
        error ? "border-red-400" : "border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500"
      } ${disabled ? "bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-white"}`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

// ── Mode édition ─────────────────────────────────────────────
const InfoDisplay = ({ label, value, icon: Icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
    <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
      {Icon && <Icon className="text-gray-400 dark:text-gray-500 flex-shrink-0" />}
      <span className="flex-1 text-sm text-gray-800 dark:text-white">{value || "Non renseigné"}</span>
    </div>
  </div>
);

// ── Page principale ───────────────────────────────────────────
export default function Parametres() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nom_complet: "",
    email: "",
    telephone: "",
    nom_boutique: "",
    description_boutique: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("auth/profile/");
        const u = response.data;
        setUser(u);
        setFormData({
          nom_complet: u.username || "",
          email: u.email || "",
          telephone: u.telephone || "",
          nom_boutique: u.nom_boutique || "",
          description_boutique: u.description_boutique || "",
        });
        if (u.photo_profil) {
          setAvatarPreview(u.photo_profil);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Erreur de chargement");
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    getUser();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5Mo");
      return;
    }

    setUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const formDataAvatar = new FormData();
      formDataAvatar.append("photo_profil", file);
      const response = await api.patch("auth/profil/photo/", formDataAvatar, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser((prev) => ({ ...prev, photo_profil: response.data.photo_profil }));
      toast.success("Photo de profil mise à jour");
    } catch (error) {
      console.error("Erreur upload avatar:", error);
      toast.error("Erreur lors de l'upload de la photo");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!window.confirm("Voulez-vous supprimer votre photo de profil ?")) return;
    
    try {
      await api.delete("auth/profile/avatar/");
      setAvatarPreview(null);
      setUser((prev) => ({ ...prev, photo_profil: null }));
      toast.success("Photo de profil supprimée");
    } catch (error) {
      console.error("Erreur suppression avatar:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.nom_complet.trim()) e.nom_complet = "Champ requis";
    if (!formData.email.trim()) e.email = "Champ requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Email invalide";
    if (!formData.telephone.trim()) e.telephone = "Champ requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.patch("auth/profile/", {
        username: formData.nom_complet,
        email: formData.email,
        telephone: formData.telephone,
        nom_boutique: formData.nom_boutique,
        description_boutique: formData.description_boutique,
      });
      toast.success("Profil mis à jour avec succès !");
      setUser((prev) => ({ 
        ...prev, 
        username: formData.nom_complet, 
        telephone: formData.telephone,
        nom_boutique: formData.nom_boutique,
        description_boutique: formData.description_boutique,
      }));
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {user ? <SideBar user={user} activeTab="parametres" /> : <SideBar activeTab="parametres" />}

        <div className="flex-1 p-4 sm:p-6">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Paramètres du compte</h1>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <FaEdit /> Modifier
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  if (user) {
                    setFormData({
                      nom_complet: user.username || "",
                      email: user.email || "",
                      telephone: user.telephone || "",
                      nom_boutique: user.nom_boutique || "",
                      description_boutique: user.description_boutique || "",
                    });
                  }
                }}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Annuler
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">

              {/* ── Photo de profil ── */}
              <div className="mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Photo de profil</h2>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center overflow-hidden">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <FaUser className="text-4xl sm:text-6xl text-orange-400 dark:text-orange-300" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                      disabled={uploading}
                    >
                      <FaCamera className="text-xs sm:text-sm" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <FaUpload className="text-gray-500 dark:text-gray-400" />
                      Changer la photo
                    </button>
                    {avatarPreview && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="flex items-center gap-2 px-4 py-2 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <FaTimes />
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
                {uploading && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center sm:text-left">
                    Téléchargement en cours...
                  </p>
                )}
              </div>

              {/* ── Informations personnelles ── */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">Informations personnelles</h2>

              <div className="flex flex-col gap-5">
                {isEditing ? (
                  <>
                    <FormField
                      label="Nom complet"
                      required
                      icon={FaUser}
                      name="nom_complet"
                      value={formData.nom_complet}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      error={errors.nom_complet}
                    />
                    <FormField
                      label="Email"
                      required
                      icon={FaEnvelope}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@exemple.com"
                      error={errors.email}
                    />
                    <FormField
                      label="Numéro de téléphone"
                      required
                      icon={FaPhone}
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="+237 6XX XXX XXX"
                      error={errors.telephone}
                    />
                  </>
                ) : (
                  <>
                    <InfoDisplay label="Nom complet" icon={FaUser} value={formData.nom_complet} />
                    <InfoDisplay label="Email" icon={FaEnvelope} value={formData.email} />
                    <InfoDisplay label="Numéro de téléphone" icon={FaPhone} value={formData.telephone} />
                  </>
                )}
              </div>

              {/* ── Mode vendeur ── */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-6">Mode vendeur</h2>

              <div className="flex flex-col gap-5">
                {isEditing ? (
                  <>
                    <FormField
                      label="Nom de la boutique"
                      icon={FaStore}
                      name="nom_boutique"
                      value={formData.nom_boutique}
                      onChange={handleChange}
                      placeholder="Nom de votre boutique"
                      error={errors.nom_boutique}
                    />
                    <FormTextArea
                      label="Description de la boutique"
                      name="description_boutique"
                      value={formData.description_boutique}
                      onChange={handleChange}
                      placeholder="Décrivez votre boutique..."
                      error={errors.description_boutique}
                    />
                  </>
                ) : (
                  <>
                    <InfoDisplay label="Nom de la boutique" icon={FaStore} value={formData.nom_boutique} />
                    <InfoDisplay label="Description de la boutique" value={formData.description_boutique} />
                  </>
                )}
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base"
                  >
                    <FaSave />
                    {loading ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}