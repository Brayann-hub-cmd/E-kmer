
import { useEffect, useState } from "react";
import { FaHeart, FaCog, FaShoppingCart, FaStore, FaBoxes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import BackToHome from "../BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../T"; // ← IMPORT
const LINK = import.meta.env.VITE_API_URL;

export default function SideBar({ user }) {
  const { t } = useAppContext(); // ← Récupère les traductions
  const navigate = useNavigate();
  const location = useLocation();
  const [ventes, setVentes] = useState(0);
  const [achats, setAchats] = useState(0);
  const [articles, setArticles] = useState(0);

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
    { key: "commandes", label: t.myOrders || "Mes commandes", icon: FaBoxes, path: "/commandes" },
    { key: "parametres", label: t.settings || "Paramètres", icon: FaCog, path: "/profile/parametres" },
  ];

  const isActive = (path) => {
    if (path === "/profile") {
      return location.pathname === "/profile" || location.pathname === "/profile/";
    }
    return location.pathname === path;
  };

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

  // Le nom d'utilisateur par défaut
  const defaultUsername = t.user || "Profil";

  return (
    <div className="w-full md:w-[260px] bg-white dark:bg-gray-800 p-5 shadow-md flex-shrink-0 self-stretch min-h-screen transition-colors duration-300">
      <BackToHome />

      {/* PROFIL */}
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto">
          {user?.photo_profil ? (
            <img
              src={`${user.photo_profil}`}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-24 h-24 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl font-bold mx-auto">
              {user ? formateProfil(user.username) : 'P'}
            </div>
          )}
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
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive(path)
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