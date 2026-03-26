import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
const ProductCard = ({ product }) => {
  const MEDIA_URL = import.meta.env.VITE_API_URL;
  // Formatage du prix avec espaces
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <Link to={`/produit/${product.code}`} className="block overflow-hidden">
        <img
          src={product.image ? `${MEDIA_URL}${product.image}`: "/placeholder-image.jpg"}
          alt={product.title}
          className="w-full h-40 object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Contenu */}
      <div className="p-3">
        {/* Titre */}
        <Link to={`/produit/${product.code}`} className="block hover:text-orange-500 transition-colors">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
            {product.title}
          </h3>
        </Link>

        {/* Prix */}
        <p className="text-orange-500 font-bold text-base mb-2">
          {formatPrice(product.prix)}
        </p>

        {/* Localisation */}
        <div className="flex items-center gap-1 mb-1">
          <FaMapMarkerAlt className="text-orange-500 text-[10px]" />
          <span className="text-gray-500 text-xs truncate">{product.localisation}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1 mb-3">
          <FaClock className="text-orange-500 text-[10px]" />
          <span className="text-gray-400 text-xs">{formatDate(product.created_at)}</span>
        </div>

        {/* Bouton */}
        <Link
          to={`/produit/${product.code}`}
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 rounded-lg transition-colors"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;