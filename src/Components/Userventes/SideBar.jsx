import { FaHeart, FaCog, FaShoppingCart, FaStore } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseClass = "w-full flex items-center gap-2 p-3 rounded-lg transition";

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