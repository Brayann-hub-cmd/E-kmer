// src/Components/Userventes/SideBar.jsx
import { useEffect, useState, useRef } from "react";
// import { FaHeart, FaCog, FaShoppingCart, FaStore, FaBoxes, FaCamera, FaMotorcycle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import BackToHome from "../../BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import T from "../../components/T";

export default function SideBar({ user, onProfileUpdate }) {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [ventes, setVentes] = useState(0);
  const [achats, setAchats] = useState(0);
  const [articles, setArticles] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const formaterTelephone = (valeur) => {
    if (!valeur) return t.phonePlaceholder || '+237 6XX XXX XXX';
    let numeros = valeur.replace(/[^\d+]/g, '');
    if (numeros.startsWith('+237')) {
      const sansPrefix = numeros.slice(4);
      if (sansPrefix.length > 0) {
        const p1 = sansPrefix.slice(0, 3);
        const p2 = sansPrefix.slice(3, 6);
        const p3 = sansPrefix.slice(6, 9);
        let f = '+237';
        if (p1) f += ' ' + p1;
        if (p2) f += ' ' + p2;
        if (p3) f += ' ' + p3;
        return f;
      }
    }
    return valeur;
  };

  const formateProfil = (valeur) => {
    if (!valeur) return "P";
    const tableau = String(valeur).split(' ');
    if (tableau.length > 1) {
      return tableau[0][0].toUpperCase() + tableau[1][0].toUpperCase();
    }
    return tableau[0][0]?.toUpperCase() || "P";
  };

  const menuItems = [
    { key: "ventes", label: t.mySales || "Mes ventes", icon: FaStore, path: "/profile" },
    { key: "achats", label: t.myPurchases || "Mes achats", icon: FaShoppingCart, path: "/profile/achats" },
    { key: "favoris", label: t.myFavorites || "Mes favoris", icon: FaHeart, path: "/profile/favoris" },
    { key: "articles", label: t.myArticles || "Mes articles", icon: FaBoxes, path: "/profile/articles" },
    // { key: "livreur", label: t.livreurSpace || "Espace Livreur", icon: FaMotorcycle, path: "/livreur/dashboard" },
    { key: "parametres", label: t.settings || "Paramètres", icon: FaCog, path: "/profile/parametres" },
  ];

  const isActive = (path) => {
    if (path === "/profile") {
      return location.pathname === "/profile" || location.pathname === "/profile/";
    }
    return location.pathname === path;
  };

  // Charger les statistiques
  useEffect(() => {
    const getAchats = async () => {
      try {
        const achatsResponse = await api.get('achats/');
        setAchats(achatsResponse.data.length);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
    };

    const getVentes = async () => {
      try {
        const ventesResponse = await api.get('ventes/vendeur/');
        setVentes(ventesResponse.data.length);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
    };

    const getArticles = async () => {
      try {
        const articlesResponse = await api.get('annonces-user/');
        setArticles(articlesResponse.data.length);
      } catch (error) {
        console.error("Erreur chargement articles:", error);
        setArticles(0);
      }
    };

    getAchats();
    getVentes();
    getArticles();
  }, []);

  // --- Gestion du changement d'avatar ---
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type et la taille
    if (!file.type.startsWith('image/')) {
      toast.error(t.invalidImage || "Veuillez sélectionner une image valide.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t.imageTooLarge || "L'image ne doit pas dépasser 5 Mo.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('photo_profil', file);

    // URL de l'endpoint – vous pouvez ajuster selon votre backend
    const endpoint = 'auth/profile/'; // Essayez d'abord celle-ci
    // const endpoint = 'auth/update-profile/'; // Alternative possible

    try {
      console.log(`📤 Envoi de la photo vers ${endpoint}...`);
      const response = await api.patch(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Réponse du serveur :', response.data);

      // Si la réponse contient l'utilisateur mis à jour
      const updatedUser = response.data;
      if (onProfileUpdate) {
        onProfileUpdate(updatedUser);
      } else {
        // Sinon, recharge la page pour mettre à jour l'affichage
        window.location.reload();
      }
      toast.success(t.avatarUpdated || "Photo de profil mise à jour !");
    } catch (error) {
      console.error('❌ Erreur lors de l\'upload :', error);

      // Affichage détaillé de l'erreur
      let errorMessage = t.uploadError || "Erreur lors de l'upload.";

      if (error.response) {
        // Le serveur a répondu avec un statut hors 2xx
        const status = error.response.status;
        const data = error.response.data;
        console.error('Statut :', status);
        console.error('Données :', data);

        if (status === 401) {
          errorMessage = t.unauthorized || "Session expirée. Veuillez vous reconnecter.";
        } else if (status === 400) {
          // Souvent des erreurs de validation
          if (data.photo_profil) {
            errorMessage = data.photo_profil.join(' ');
          } else if (data.error) {
            errorMessage = data.error;
          } else if (data.message) {
            errorMessage = data.message;
          } else {
            errorMessage = t.invalidData || "Données invalides.";
          }
        } else if (status === 404) {
          errorMessage = t.endpointNotFound || "Endpoint introuvable. Vérifiez l'URL.";
        } else {
          errorMessage = data?.error || data?.message || `Erreur ${status}`;
        }
      } else if (error.request) {
        // Pas de réponse du serveur
        errorMessage = t.connectionError || "Erreur de connexion au serveur.";
      } else {
        // Autre erreur (ex: configuration)
        errorMessage = error.message || t.uploadError;
      }

      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Réinitialiser l'input
    }
  };

  const defaultUsername = t.user || "Profil";

  return (
    <div className="w-full md:w-[260px] bg-white dark:bg-gray-800 p-5 shadow-md flex-shrink-0 self-stretch min-h-screen transition-colors duration-300">
      <BackToHome />

      {/* PROFIL */}
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto cursor-pointer group" onClick={handleAvatarClick}>
          {user?.photo_profil ? (
            <img
              src={user.photo_profil}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="w-24 h-24 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl font-bold mx-auto">
              {user ? formateProfil(user.username) : 'P'}
            </div>
          )}
          {/* Overlay avec icône caméra */}
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaCamera className="text-white text-xl" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            ref={fileInputRef}
            className="hidden"
            disabled={isUploading}
          />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
          {user ? user.username : defaultUsername}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {user ? formaterTelephone(user.telephone) : t.phonePlaceholder || '+237 6XX XXX XXX'}
        </p>

        {user?.nom_boutique && (
          <p className="text-orange-500 text-xs mt-1 font-medium">
            {user.nom_boutique}
          </p>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">
          {t.clickToChangeAvatar || "Cliquez sur la photo pour changer"}
        </p>
      </div>

      {/* STATS */}
      <div className="flex justify-around bg-gray-100 dark:bg-gray-700 p-3 rounded-xl mb-6 transition-colors duration-300">
        <div className="text-center">
          <p className="text-orange-500 font-bold text-xl">{achats}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <T>purchases</T>
          </p>
        </div>
        <div className="text-center">
          <p className="text-green-600 font-bold text-xl">{ventes}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <T>sales</T>
          </p>
        </div>
        <div className="text-center">
          <p className="text-blue-600 font-bold text-xl">{articles}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <T>items</T>
          </p>
        </div>
      </div>

      {/* MENU */}
      <div className="space-y-2">
        {menuItems.map(({ key, label, icon: Icon, path }) => (
          <button
            key={key}
            onClick={() => navigate(path)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              isActive(path)
                ? "bg-orange-500 text-white shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <Icon className={`text-lg flex-shrink-0 ${isActive(path) ? "text-white" : "text-gray-500 dark:text-gray-400"}`} />
            <span className={`text-sm font-medium ${isActive(path) ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
              {label}
            </span>
            {isActive(path) && (
              <div className="ml-auto w-2 h-2 rounded-full bg-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}