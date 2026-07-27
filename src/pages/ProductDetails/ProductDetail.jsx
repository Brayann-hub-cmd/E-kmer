// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaPlusCircle, 
  FaHeart, 
  FaChevronLeft, 
  FaChevronRight,
  FaMapMarkerAlt,
  FaUserCircle
} from 'react-icons/fa';
import api from '../../api';
import BackToHome from '../../components/BackToHome';
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

const ProductDetail = () => {
  const { t } = useAppContext(); // ← Récupère les traductions
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    code: "",
    titre: "",
    prix: 0,
    qte: 0,
    localisation: "",
    description: "",
    images: [],
    vendeur: {
      username: "",
      created_at: "",
      photo_profil: ""
    }
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError(t.noProductId || "Aucun identifiant de produit fourni");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get(`annonces/${id}/`);
        setProduct(response.data);
        setCurrentImageIndex(0);
        setQuantity(1);
      } catch (error) {
        console.error("Erreur chargement produit:", error);
        setError(t.productLoadError || "Impossible de charger le produit. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, t]);

  const nextImage = () => {
    if (!product.images || product.images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product.images || product.images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const incrementQty = () => {
    const stock = product.qte || 0;
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => {
    
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
    try {
      await api.post("panier/items/", {
        annonce: product.code,
        quantite: quantity
      });
      console.log(`Ajouté au panier: ${product.titre}, Quantité: ${quantity}, Code: ${product.code}`);
    } catch (error) {
      console.error("Erreur ajout au panier:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await api.post("panier/items/", {
        annonce: product.code,
        quantite: quantity
      });
      navigate("/paiement");
    } catch (error) {
      console.error("Erreur achat immédiat:", error);
    }
  };

  const descriptionParagraphs = product.description ? product.description.split('\n\n').map(para => para.trim()) : [];
  const imageUrls = product.images ? product.images.map(img => img.image || img) : [];

  const formatMemberSince = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t.today || "Aujourd'hui";
    if (diffDays === 1) return t.yesterday || "Hier";
    if (diffDays < 7) return (t.daysAgo || "Il y a {days} jours").replace('{days}', diffDays);
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400"><T>loading</T></p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <main className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 transition-colors duration-300">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
              <T>errorTitle</T>
            </h2>
            <p className="text-red-500 dark:text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <T>tryAgain</T>
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product.code && !loading) {
    return (
      <>
        <main className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            <T>productNotFound</T>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            <T>productNotFoundDesc</T>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        <BackToHome />

        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
          
          {/* === COLONNE GAUCHE === */}
          <div>
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden transition-colors duration-300">
              <div className="relative">
                {imageUrls.length > 0 ? (
                  <img
                    src={imageUrls[currentImageIndex]}
                    alt={`${product.titre} - Image ${currentImageIndex + 1}`}
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500"><T>noImage</T></span>
                  </div>
                )}
                
                {imageUrls.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
                      aria-label={t.prevImage || "Image précédente"}
                    >
                      <FaChevronLeft className="text-gray-800 dark:text-white text-sm sm:text-base" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
                      aria-label={t.nextImage || "Image suivante"}
                    >
                      <FaChevronRight className="text-gray-800 dark:text-white text-sm sm:text-base" />
                    </button>
                  </>
                )}
              </div>
              
              {imageUrls.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {imageUrls.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentImageIndex === idx
                          ? 'bg-white dark:bg-gray-200 w-4'
                          : 'bg-white/50 dark:bg-gray-500/50 hover:bg-white/80 dark:hover:bg-gray-400/80'
                      }`}
                      aria-label={`Aller à l'image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                <T>description</T>
              </h2>
              {descriptionParagraphs.length > 0 ? (
                descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  <T>noDescription</T>
                </p>
              )}
            </div>
          </div>

          {/* === COLONNE DROITE === */}
          <div>
            <div className="sticky top-4 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
              
              <div className="text-3xl font-bold text-orange-500">
                {(product.prix || 0).toLocaleString('fr-FR')} FCFA
              </div>
              
              <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {product.titre || "Produit"}
              </div>
              
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-2">
                <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500" />
                <span>{product.localisation || t.unknownLocation || "Localisation non spécifiée"}</span>
              </div>
              
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/panier"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3 px-4 transition-colors w-full"
                >
                  <FaShoppingCart className="text-base" />
                  <T>addToCart</T>
                </Link>
                
                <Link
                  to="/paiement"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3 px-4 transition-colors w-full"
                >
                  <FaPlusCircle className="text-base" />
                  <T>buyNow</T>
                </Link>
                
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center justify-center gap-2 border-2 ${
                    isFavorite ? 'border-red-500 text-red-500' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                  } hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-xl py-3 px-4 transition-colors w-full`}
                >
                  <FaHeart className={`text-base ${isFavorite ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`} />
                  <T>favorites</T>
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrementQty}
                      disabled={quantity <= 1}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg w-9 h-9 text-lg font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQty}
                      disabled={quantity >= (product.qte || 0)}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg w-9 h-9 text-lg font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {(product.qte || 0)} <T>inStock</T>
                  </span>
                </div>
              </div>
              
              <hr className="mt-5 mb-4 border-gray-200 dark:border-gray-700" />
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  <T>aboutSeller</T>
                </h3>
                <div className="flex items-center gap-3">
                  {product.vendeur?.photo_profil ? (
                    <img
                      src={product.vendeur.photo_profil}
                      alt={product.vendeur.username}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-14 h-14 text-gray-400 dark:text-gray-500" />
                  )}
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      {product.vendeur?.username || t.seller || "Vendeur"}
                    </div>
                    <div className="text-sm text-orange-500">
                      <T>memberSince</T> {formatMemberSince(product.vendeur?.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;