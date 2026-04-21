import { FaHeart, FaCog, FaShoppingCart, FaStore } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseClass = "w-full flex items-center gap-2 p-3 rounded-lg transition";




  const formaterTelephone = (valeur) => {
    // Supprimer tout sauf les chiffres et le +
    let numeros = valeur.replace(/[^\d+]/g, '');

    // Si ça commence par +237
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
  const formateProfil = (valeur)=>{
    let profil = "P"
    let tableau = (String(valeur)).split(' ')
    if(tableau.length>1){
      profil = (tableau[0])[0].toUpperCase()
      profil+=(tableau[1])[0].toUpperCase()
      return profil
    }
    else if(tableau.length===1){
      profil = (tableau[0])[0].toUpperCase()
      return profil
    }
    else{
      return profil
    }
  }

  return (
    <div className="w-[260px] bg-white p-5 shadow rounded-r-2xl">
      {/* PROFILE */}
      <div className="text-center">
        <div className="w-24 h-24 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl font-bold mx-auto">
          {user?formateProfil(user.username):'P'}
        </div>

        <h2 className="mt-4 text-lg font-semibold">{user?user.username:'Profil'}</h2>
        <p className="text-gray-500 text-sm">{user?formaterTelephone(user.telephone):'+237 6XX XXX XXX'}</p>
      </div>

       {/* MENU */}
      <div className="mt-6 space-y-3">

        <Link
          to="/vendre"
          className={`${baseClass} ${
            isActive("/vendre")
              ? "bg-orange-100 text-orange-600"
              : "hover:bg-gray-100"
          }`}
        >
          <FaStore /> Mes ventes
        </Link>

        <Link
          to="/achats"
          className={`${baseClass} ${
            isActive("/achats")
              ? "bg-orange-100 text-orange-600"
              : "hover:bg-gray-100"
          }`}
        >
          <FaShoppingCart /> Mes achats
        </Link>

        <Link
          to="/favoris"
          className={`${baseClass} ${
            isActive("/favoris")
              ? "bg-orange-100 text-orange-600"
              : "hover:bg-gray-100"
          }`}
        >
          <FaHeart /> Mes favoris
        </Link>

        <Link
          to="/settings"
          className={`${baseClass} ${
            isActive("/settings")
              ? "bg-orange-100 text-orange-600"
              : "hover:bg-gray-100"
          }`}
        >
          <FaCog /> Paramètres
        </Link>

      </div>
    </div>
  );
}