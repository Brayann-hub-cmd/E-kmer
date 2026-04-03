import { FaCheck } from "react-icons/fa";
export default function ProductCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow flex gap-4 items-center">
      {/* IMAGE */}
      <img
        src="assets/images/iphone.png"
        alt="Product"
        className="w-32 h-32 object-cover rounded-lg"
      />

      {/* INFOS */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">Iphone 14 Pro</h3>
        <p className="text-orange-500 font-bold text-lg">450000 FCFA</p>

        <div className="flex gap-10 mt-2 text-sm text-gray-600">
          <p>Stock: <strong>3 unités</strong></p>
          <p>Vendus: <strong>2</strong></p>
        </div>

        <div className="flex gap-3 mt-4">
          
          <button className="bg-orange-500 text-white px-4 py-1 rounded-lg">
            Consulter
          </button>
        </div>
      </div>

        {/* STATUT */}
      <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
        
        
        <div className="w-5 h-5 flex items-center justify-center bg-green-600 rounded-full">
          <FaCheck className="text-white text-xs" />
        </div>

        {/* Texte */}
        <span className="text-green-700 text-sm font-medium">
          Actif
        </span>
    </div></div>
  );
}