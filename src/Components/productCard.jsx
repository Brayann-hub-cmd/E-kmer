import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
function ProductCard({ product }) {
    const getCardWidthClass = () => {
        return "w-[200px] xs:w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px]";
    };

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
        <div
            key={product.code}
            className={`flex-none ${getCardWidthClass()} bg-[#F2F2F2] rounded-lg sm:rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden`}
        >
            {/* Image avec les mêmes bordures arrondies que la carte */}
            <Link to={`/produit/${product.code}`} className="block w-full">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[120px] xs:h-[130px] sm:h-[140px] md:h-[160px] lg:h-[160px] object-cover"
                />
            </Link>

            {/* Contenu avec padding */}
            <div className="p-2.5 sm:p-3 md:p-4">
                <Link to={`/produit/${product.code}`}>
                    <h3 className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg mb-1 line-clamp-1 hover:text-orange-500 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <p className="text-orange-500 font-bold text-sm xs:text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2">
                    {product.prix}
                </p>

                {/* Lieu avec icône */}
                <div className="flex items-center text-gray-600 text-[10px] xs:text-xs sm:text-sm mb-1">
                    <FaMapMarkerAlt className="text-orange-500 mr-1 flex-shrink-0 text-[10px] xs:text-xs sm:text-sm" />
                    <span className="truncate">{product.localisation}</span>
                </div>

                {/* Date avec icône */}
                <div className="flex items-center text-gray-500 text-[10px] xs:text-xs sm:text-sm mb-2 sm:mb-3">
                    <FaCalendarAlt className="text-orange-500 mr-1 flex-shrink-0 text-[10px] xs:text-xs sm:text-sm" />
                    <span className="truncate">{formatDate(product.created_at)}</span>
                </div>

                <Link
                    to={`/produit/${product.code}`}
                    className="inline-block mt-1 bg-orange-500 text-white text-[10px] xs:text-xs sm:text-sm md:text-base px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg hover:bg-orange-600 transition-colors w-full text-center font-medium"
                >
                    Voir les détails
                </Link>
            </div>
        </div>
    )
}
export default ProductCard;