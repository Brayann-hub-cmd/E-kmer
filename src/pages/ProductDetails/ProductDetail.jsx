// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import Footer from '../../Components/Footer';
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // États - Initialisation avec des valeurs par défaut
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
      avatar: ""
    }
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement du produit depuis l'API
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Aucun identifiant de produit fourni");
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
        setError("Impossible de charger le produit. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  // Gestionnaires d'événements
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
      // Appel API pour ajouter au panier
      await api.post("panier/", {
        produit_id: product.code,
        quantite: quantity
      });
      console.log(`Ajouté au panier: ${product.titre}, Quantité: ${quantity}, Code: ${product.code}`);
    } catch (error) {
      console.error("Erreur ajout au panier:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      // Ajouter au panier puis rediriger vers paiement
      await api.post("panier/", {
        produit_id: product.code,
        quantite: quantity
      });
      navigate("/paiement");
    } catch (error) {
      console.error("Erreur achat immédiat:", error);
    }
  };

  // Découper la description en paragraphes
  const descriptionParagraphs = product.description ? product.description.split('\n\n').map(para => para.trim()) : [];

  // Récupérer la liste des URLs d'images
  const imageUrls = product.images ? product.images.map(img => img.image || img) : [];

  // Formatage de la date d'adhésion du vendeur
  const formatMemberSince = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  // Affichage du chargement
  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Chargement du produit...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Affichage de l'erreur
  if (error) {
    return (
      <>
        <main className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-600 mb-2">Une erreur est survenue</h2>
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Réessayer
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Si pas de produit
  if (!product.code && !loading) {
    return (
      <>
        <main className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Produit non trouvé</h2>
          <p className="text-gray-500 mt-2">Ce produit n'existe pas ou a été supprimé.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> - À décommenter quand le composant Navbar sera intégré */}
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
          
          {/* === COLONNE GAUCHE === */}
          <div>
            {/* Carrousel d'images */}
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
              <div className="relative">
                {imageUrls.length > 0 ? (
                  <img
                    src={imageUrls[currentImageIndex]}
                    alt={`${product.titre} - Image ${currentImageIndex + 1}`}
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Aucune image</span>
                  </div>
                )}
                
                {imageUrls.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200"
                      aria-label="Image précédente"
                    >
                      <FaChevronLeft className="text-gray-800 text-sm sm:text-base" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200"
                      aria-label="Image suivante"
                    >
                      <FaChevronRight className="text-gray-800 text-sm sm:text-base" />
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
                          ? 'bg-white w-4'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Aller à l'image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bloc Description */}
            <div className="mt-6 border border-gray-200 rounded-2xl p-6 bg-white">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
              {descriptionParagraphs.length > 0 ? (
                descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 text-sm leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Aucune description disponible.</p>
              )}
            </div>
          </div>

          {/* === COLONNE DROITE === */}
          <div>
            <div className="sticky top-4 border border-gray-200 rounded-2xl p-6 bg-white">
              
              {/* Prix */}
              <div className="text-3xl font-bold text-orange-500">
                {(product.prix || 0).toLocaleString('fr-FR')} FCFA
              </div>
              
              {/* Nom du produit */}
              <div className="text-xl font-bold text-gray-900 mt-1">
                {product.titre || "Produit"}
              </div>
              
              {/* Localisation */}
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>{product.localisation || "Localisation non spécifiée"}</span>
              </div>
              
              {/* Boutons d'action */}
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/panier"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3 px-4 transition-colors w-full"
                >
                  <FaShoppingCart className="text-base" />
                  Ajouter au panier
                </Link>
                
                <Link
                  to="/paiement"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3 px-4 transition-colors w-full"
                >
                  <FaPlusCircle className="text-base" />
                  Acheter maintenant
                </Link>
                
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center justify-center gap-2 border-2 ${isFavorite ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600'} hover:bg-gray-50 font-medium rounded-xl py-3 px-4 transition-colors w-full`}
                >
                  <FaHeart className={`text-base ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
                  Favoris
                </button>
              </div>
              
              {/* Sélecteur quantité */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrementQty}
                      disabled={quantity <= 1}
                      className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg w-9 h-9 text-lg font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQty}
                      disabled={quantity >= (product.qte || 0)}
                      className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg w-9 h-9 text-lg font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {(product.qte || 0)} en stock
                  </span>
                </div>
              </div>
              
              <hr className="mt-5 mb-4 border-gray-200" />
              
              {/* Section vendeur */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  À propos du vendeur
                </h3>
                <div className="flex items-center gap-3">
                  {product.vendeur?.avatar ? (
                    <img
                      src={product.vendeur.avatar}
                      alt={product.vendeur.username}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-14 h-14 text-gray-400" />
                  )}
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      {product.vendeur?.username || "Vendeur"}
                    </div>
                    <div className="text-sm text-orange-500">
                      Membre depuis {formatMemberSince(product.vendeur?.created_at)}
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