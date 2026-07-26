<<<<<<< HEAD
// src/components/Userventes/MesVentes.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import T from '../../components/T';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
=======
// src/pages/MySell.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaReceipt } from "react-icons/fa";
import SideBar from "./SideBar";
import BackToHome from "../BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import T from "../T";
>>>>>>> 81b0fad12d62105a35d7265a807c75a2a90fc77d

const MySell = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

<<<<<<< HEAD
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get('mes-ventes/');
                // Vérifier que la réponse est bien un tableau
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (Array.isArray(response.data.results)) {
                    // Si l'API renvoie un objet avec une clé 'results'
                    setProducts(response.data.results);
                } else {
                    console.warn('La réponse API n\'est pas un tableau :', response.data);
                    setProducts([]);
                    setError('Format de données inattendu');
                }
            } catch (err) {
                console.error('Erreur lors du chargement des ventes :', err);
                setProducts([]);
                setError('Impossible de charger vos ventes');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const productsSafe = useMemo(() => {
        if (!Array.isArray(products)) {
            return [];
        }
        return products.map((p) => ({
            id: p.id,
            title: p.titre || p.title || 'Sans titre',
            price: p.prix || p.price || 0,
            status: p.statut || p.status || 'En attente',
            image: p.image || p.images?.[0] || null,
            createdAt: p.date_creation || p.created_at || null,
        }));
    }, [products]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* En-tête */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        <T>mySales</T>
                    </h1>
                    <Link
                        to="/publier-produit"
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <FaPlus />
                        <T>addProduct</T>
                    </Link>
                </div>
=======
// ── Carte produit en vente ───────────────────────────────────
const SellCard = ({ product, onViewSaleDetail }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      {product.lignes?.map((ligne) => (
        <div key={ligne.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

          <img
            src={`${ligne.annonce_image}`}
            alt={ligne.annonce_titre}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
          />
>>>>>>> 81b0fad12d62105a35d7265a807c75a2a90fc77d

                {/* Contenu */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-gray-500 dark:text-gray-400">
                            <T>loadingSales</T>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-center">
                        {error}
                    </div>
                ) : productsSafe.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            <T>noSalesYet</T>
                        </p>
                        <Link
                            to="/publier-produit"
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            <T>startSelling</T>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {productsSafe.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <T>noImage</T>
                                        </div>
                                    )}
                                    <span
                                        className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                            product.status === 'Publié' || product.status === 'Published'
                                                ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'
                                                : product.status === 'En attente' || product.status === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400'
                                                : 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
                                        }`}
                                    >
                                        {product.status}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                                        {product.title}
                                    </h3>
                                    <p className="text-orange-500 font-bold text-lg mt-1">
                                        {product.price.toLocaleString()} FCFA
                                    </p>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {product.createdAt
                                                ? new Date(product.createdAt).toLocaleDateString('fr-FR')
                                                : ''}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                                                title="Voir"
                                            >
                                                <FaEye size={14} />
                                            </button>
                                            <button
                                                className="p-1.5 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                                                title="Modifier"
                                            >
                                                <FaEdit size={14} />
                                            </button>
                                            <button
                                                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                                                title="Supprimer"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
<<<<<<< HEAD
=======
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => onViewSaleDetail(product.code)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
              >
                <FaReceipt /> <T>saleDetails</T>
              </button>
            </div>
          </div>
>>>>>>> 81b0fad12d62105a35d7265a807c75a2a90fc77d
        </div>
    );
};

<<<<<<< HEAD
export default MySell;
=======
// Page principale Mes ventes
export default function MySell() {
  const { t } = useAppContext();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Charger l'utilisateur et ses produits
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("auth/profile/");
        setUser(userRes.data);

        const productsRes = await api.get("ventes/vendeur/");
        
        // ✅ CORRECTION : On s'assure que products est toujours un tableau
        const productsData = Array.isArray(productsRes.data) ? productsRes.data : [];
        setProducts(productsData);
      } catch (error) {
        console.error("Erreur:", error);
        setProducts([]); // En cas d'erreur, on met un tableau vide
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleEdit = (code) => {
    navigate(`/produit/modifier/${code}`);
  };

  const handleView = (code) => {
    navigate(`/produit/${code}`);
  };

  const handleViewSaleDetail = (code) => {
    navigate(`/vente/${code}`);
  };

  const handleDelete = async (code, titre) => {
    if (!window.confirm(t.confirmDelete?.replace('{titre}', titre) || `Supprimer "${titre}" ?`)) return;
    try {
      await api.delete(`annonces/${code}/`);
      setProducts(prev =>
        prev
          .map(p => ({ ...p, lignes: p.lignes.filter(l => l.annonce !== code) }))
          .filter(p => p.lignes.length > 0)
      );
      toast.success(t.successDelete || "Produit supprimé");
    } catch {
      toast.error(t.errorDelete || "Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">

        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="ventes" />
        </div>

        <div className="flex-1 p-4 sm:p-6">

          <BackToHome />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              <T>myProductsOnSale</T>
            </h1>
            <button
              onClick={() => navigate("/publier")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              + <T>publishProduct</T>
            </button>
          </div>

          {products.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <p className="text-gray-400 dark:text-gray-400 text-lg">
                <T>noProducts</T>
              </p>
              <button
                onClick={() => navigate("/publier")}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <T>publishProduct</T>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <SellCard
                  key={product.code}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  onViewSaleDetail={handleViewSaleDetail}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
>>>>>>> 81b0fad12d62105a35d7265a807c75a2a90fc77d
