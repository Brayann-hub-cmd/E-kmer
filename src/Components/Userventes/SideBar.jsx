import { FaHeart, FaCog, FaShoppingCart, FaStore } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-[260px] bg-white p-5 shadow rounded-r-2xl">
      {/* PROFILE */}
      <div className="text-center">
        <div className="w-24 h-24 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl font-bold mx-auto">
          JD
        </div>

        <h2 className="mt-4 text-lg font-semibold">Jean Dupont</h2>
        <p className="text-gray-500 text-sm">+237 6XX XXX XXX</p>
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