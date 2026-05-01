// src/Components/Userventes/SideBar.jsx
import { FaHeart, FaCog, FaShoppingCart, FaStore, FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideBar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const formaterTelephone = (valeur) => {
    if (!valeur) return '+237 6XX XXX XXX';
    let numeros = valeur.replace(/[^\d+]/g, '');
    if (numeros.startsWith('+237')) {
      const sansPrefix = numeros.slice(4);
      if (sansPrefix.length > 0) {
        const partie1 = sansPrefix.slice(0, 3);
        const partie2 = sansPrefix.slice(3, 6);
        const partie3 = sansPrefix.slice(6, 9);
        let formate = '+237';
        if (partie1) formate += ' ' + partie1;
        if (partie2) formate += ' ' + partie2;
        if (partie3) formate += ' ' + partie3;
        return formate;
      }
    }
    return valeur;
  };

  const formateProfil = (valeur) => {
    if (!valeur) return "P";
    let profil = "P";
    let tableau = String(valeur).split(' ');
    if (tableau.length > 1) {
      profil = (tableau[0])[0].toUpperCase();
      profil += (tableau[1])[0].toUpperCase();
      return profil;
    } else if (tableau.length === 1 && tableau[0].length > 0) {
      profil = (tableau[0])[0].toUpperCase();
      return profil;
    }
    return profil;
  };

  // Menu items avec leurs chemins
  const menuItems = [
    { key: "ventes",     label: "Mes ventes",  icon: FaStore,        path: "/profile/"            },
    { key: "achats",     label: "Mes achats",  icon: FaShoppingCart, path: "/profile/achats"      },
    { key: "favoris",    label: "Mes favoris", icon: FaHeart,        path: "/profile/favoris"     },
    { key: "parametres", label: "Paramètres",  icon: FaCog,          path: "/profile/parametres"  },
  ];

  // Vérifier si un chemin est actif
  const isActive = (path) => {
    if (path === "/profile/") {
      return location.pathname === "/profile/" || location.pathname === "/profile";
    }
    return location.pathname === path;
  };

  return (
    <div className="w-full md:w-[280px] bg-white p-5 shadow rounded-2xl md:rounded-r-2xl md:rounded-l-none mb-6 md:mb-0">
      {/* PROFILE */}
      <div className="text-center">
        {/* Avatar avec image ou initiales */}
        <div className="relative w-24 h-24 mx-auto">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
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
            🏪 {user.nom_boutique}
          </p>
        )}
      </div>

      {/* STATS */}
      <div className="flex justify-around mt-6 bg-gray-100 p-3 rounded-lg">
        <div className="text-center">
          <p className="text-orange-500 font-bold text-xl">12</p>
          <p className="text-xs text-gray-600">Achats</p>
        </div>
        <div className="text-center">
          <p className="text-green-600 font-bold text-xl">8</p>
          <p className="text-xs text-gray-600">Ventes</p>
        </div>
      </div>

      {/* MENU */}
      <div className="mt-6 space-y-2">
        {menuItems.map(({ key, label, icon: Icon, path }) => (
          <button
            key={key}
            onClick={() => navigate(path)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              isActive(path)
                ? "bg-orange-500 text-white shadow-md"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Icon className={`text-lg ${isActive(path) ? "text-white" : "text-gray-500"}`} />
            <span className={`text-sm font-medium ${isActive(path) ? "text-white" : "text-gray-700"}`}>
              {label}
            </span>
            {isActive(path) && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}