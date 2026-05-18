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

  useEffect(() => {

    const fetchProduct = async () => {

      if (!id) {
        setError("Aucun identifiant fourni");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`annonces/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError("Erreur chargement produit");
      } finally {
        setLoading(false);
      }

    };

    fetchProduct();

  }, [id]);

  const imageUrls = product.images
    ? product.images.map(img => img.image || img)
    : [];

  const nextImage = () => {
    if (imageUrls.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    if (imageUrls.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const incrementQty = () => {
    if (quantity < product.qte) setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
    try {
      await api.post("panier/", {
        produit_id: product.code,
        quantite: quantity
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await api.post("panier/", {
        produit_id: product.code,
        quantite: quantity
      });
      navigate("/paiement");
    } catch (error) {
      console.error(error);
    }
  };

  const descriptionParagraphs = product.description
    ? product.description.split('\n\n')
    : [];

  const formatMemberSince = (dateString) => {
    if (!dateString) return "Date inconnue";
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">{error}</div>;

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">

          {/* ================= GAUCHE ================= */}
          <div>

            {/* IMAGE */}
            <div className="relative w-full h-[500px] overflow-hidden bg-gray-100 rounded-2xl">

              {/* fond flou */}
              {imageUrls.length > 0 && (
                <img
                  src={imageUrls[currentImageIndex]}
                  className="absolute w-full h-full object-cover scale-110 blur-2xl"
                  alt=""
                />
              )}

              {/* image nette */}
              {imageUrls.length > 0 ? (
                <img
                  src={imageUrls[currentImageIndex]}
                  className="relative w-full h-full object-contain"
                  alt={product.titre}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Aucune image
                </div>
              )}

              {/* boutons */}
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

            </div>

            {/* DESCRIPTION */}
            <div className="mt-6 border rounded-2xl p-6 bg-white">
              <h2 className="font-bold mb-4">Description</h2>

              {descriptionParagraphs.map((p, i) => (
                <p key={i} className="mb-3 text-gray-700">
                  {p}
                </p>
              ))}
            </div>

          </div>

          {/* ================= DROITE ================= */}
          <div className="sticky top-4">

            <div className="border rounded-2xl p-6 bg-white">

              <div className="text-3xl font-bold text-orange-500">
                {(product.prix || 0).toLocaleString('fr-FR')} FCFA
              </div>

              <div className="text-xl font-bold mt-2">
                {product.titre}
              </div>

              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <FaMapMarkerAlt />
                {product.localisation}
              </div>

              <div className="flex flex-col gap-3 mt-5">

                <Link
                  to="/panier"
                  onClick={handleAddToCart}
                  className="bg-orange-500 text-white py-3 rounded-xl text-center"
                >
                  <FaShoppingCart className="inline mr-2" />
                  Ajouter au panier
                </Link>

                <Link
                  to="/paiement"
                  onClick={handleBuyNow}
                  className="bg-orange-500 text-white py-3 rounded-xl text-center"
                >
                  <FaPlusCircle className="inline mr-2" />
                  Acheter maintenant
                </Link>

                <button
                  onClick={toggleFavorite}
                  className="border py-3 rounded-xl"
                >
                  <FaHeart className="inline mr-2" />
                  Favoris
                </button>

              </div>

              <div className="flex items-center gap-4 mt-5">

                <button onClick={decrementQty} className="bg-gray-200 w-8 h-8 rounded">-</button>
                <span>{quantity}</span>
                <button onClick={incrementQty} className="bg-gray-200 w-8 h-8 rounded">+</button>

              </div>

              <hr className="my-5" />

              <div>
                <h3 className="font-bold mb-3">Vendeur</h3>

                <div className="flex items-center gap-3">

                  {product.vendeur?.avatar ? (
                    <img
                      src={product.vendeur.avatar}
                      className="w-14 h-14 rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <FaUserCircle className="w-14 h-14 text-gray-400" />
                  )}

                  <div>
                    <div className="font-bold">
                      {product.vendeur?.username}
                    </div>
                    <div className="text-sm text-orange-500">
                      {formatMemberSince(product.vendeur?.created_at)}
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