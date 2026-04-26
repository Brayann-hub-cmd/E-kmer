import { FaCheck } from "react-icons/fa";

export default function PurchaseCard({ product }) {
  // Mock data if not provided
  const defaultProduct = {
    name: "Iphone 14 Pro",
    date: "15 Avril 2024",
    price: "450000",
    image: "assets/images/iphone.png"
  };

  const { name, date, price, image } = product || defaultProduct;

  return (
    <div className="bg-white rounded-2xl p-4 shadow flex gap-4 items-center relative">
      {/* BADGE LIVRÉ en haut à droite */}
      <div className="absolute top-4 right-4 bg-green-100 px-3 py-1 rounded-full flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center bg-green-600 rounded-full">
          <FaCheck className="text-white text-xs" />
        </div>
        <span className="text-green-700 text-sm font-medium">Livré</span>
      </div>

      {/* IMAGE */}
      <img
        src={image}
        alt={name}
        className="w-32 h-32 object-cover rounded-lg"
      />

      {/* INFOS */}
      <div className="flex-1">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600">Commande le {date}</p>
        <p className="text-orange-500 font-bold text-xl">{price} FCFA</p>
      </div>

      {/* BOUTON en bas à droite */}
      <button className="absolute bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
        Voir les détails
      </button>
    </div>
  );
}