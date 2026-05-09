// src/Components/Userventes/SideBar.jsx
import { useEffect, useState } from "react";
import { FaHeart, FaCog, FaShoppingCart, FaStore } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import BackToHome from "../BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
export default function SideBar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [ventes, setVentes] = useState(0)
  const [achats, setAchats] = useState(0)

  const formaterTelephone = (valeur) => {
    if (!valeur) return '+237 6XX XXX XXX';
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
    { key: "ventes", label: "Mes ventes", icon: FaStore, path: "/profile" },
    { key: "achats", label: "Mes achats", icon: FaShoppingCart, path: "/profile/achats" },
    { key: "favoris", label: "Mes favoris", icon: FaHeart, path: "/profile/favoris" },
    { key: "parametres", label: "Paramètres", icon: FaCog, path: "/profile/parametres" },
  ];

  const isActive = (path) => {
    if (path === "/profile") {
      return location.pathname === "/profile" || location.pathname === "/profile/";
    }
    return location.pathname === path;
  };

  useEffect(
    () => {
      const getAchats = async() => {
        try {
          const achatsResponse = await api.get('achats/')
          setAchats(achatsResponse.data.length)
        } catch (error) {
          toast.error(error?.response?.data?.error)
        }
      }

      const getVentes = async() => {
        try {
          const ventesResponse = await api.get('ventes/vendeur/')
          setVentes(ventesResponse.data.length)
        } catch (error) {
          toast.error(error?.response?.data?.error)
        }
      }
      getAchats();
      getVentes()
    }, []
  )

  return (
    <div className="w-full md:w-[260px] bg-white p-5 shadow-md flex-shrink-0 self-stretch min-h-screen">
      <BackToHome />
      {/* PROFIL */}
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar"
              className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="w-24 h-24 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl font-bold mx-auto">
              {user ? formateProfil(user.username) : 'P'}
            </div>
          )}
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          {user ? user.username : 'Profil'}
        </h2>
        <p className="text-gray-500 text-sm">
          {user ? formaterTelephone(user.telephone) : '+237 6XX XXX XXX'}
        </p>

        {user?.nom_boutique && (
          <p className="text-orange-500 text-xs mt-1 font-medium">
            {user.nom_boutique}
          </p>
        )}
      </div>

      {/* STATS */}
      <div className="flex justify-around bg-gray-100 p-3 rounded-xl mb-6">
        <div className="text-center">
          <p className="text-orange-500 font-bold text-xl">{achats}</p>
          <p className="text-xs text-gray-600">Achats</p>
        </div>
        <div className="text-center">
          <p className="text-green-600 font-bold text-xl">{ventes}</p>
          <p className="text-xs text-gray-600">Ventes</p>
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
                : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            <Icon className={`text-lg flex-shrink-0 ${isActive(path) ? "text-white" : "text-gray-500"}`} />
            <span className={`text-sm font-medium ${isActive(path) ? "text-white" : "text-gray-700"}`}>
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
