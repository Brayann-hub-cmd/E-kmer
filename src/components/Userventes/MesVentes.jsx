// src/components/Userventes/MesVentes.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import T from '../../components/T';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const MySell = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        </div>
    );
};

export default MySell;