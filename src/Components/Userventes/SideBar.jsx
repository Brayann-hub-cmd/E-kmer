import { FaHeart, FaCog, FaShoppingCart, FaStore } from "react-icons/fa";

export default function Sidebar({user}) {
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

      {/* STATS */}
      <div className="flex justify-around mt-6 bg-gray-100 p-3 rounded-lg">
        <div className="text-center">
          <p className="text-orange-500 font-bold text-lg">12</p>
          <p className="text-sm">Achats</p>
        </div>
        <div className="text-center">
          <p className="text-green-600 font-bold text-lg">8</p>
          <p className="text-sm">Ventes</p>
        </div>
      </div>

      {/* MENU */}
      <div className="mt-6 space-y-3">
        <button className="w-full flex items-center gap-2 bg-orange-100 text-orange-600 p-3 rounded-lg">
          <FaStore /> Mes ventes
        </button>

        <button className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100">
          <FaShoppingCart /> Mes achats
        </button>

        <button className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100">
          <FaHeart /> Mes favoris
        </button>

        <button className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100">
          <FaCog /> Paramètres
        </button>
      </div>
    </div>
  );
}