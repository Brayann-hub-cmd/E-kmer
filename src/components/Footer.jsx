// src/components/Footer.jsx
import React, { useEffect, useState, useMemo } from 'react';
import logo from '../../public/logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Icônes
import {
    FaFacebookF,
    FaWhatsapp,
    FaTwitter,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAppContext } from '../context/AppContext';
import T from '../components/T';

const Footer = () => {
    const { t } = useAppContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            try {
                const response = await api.get('categories/');
                // Vérifier que la réponse est bien un tableau
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.warn('La réponse API n\'est pas un tableau :', response.data);
                    setData([]);
                }
            } catch (error) {
                console.error('Erreur footer (catégories) :', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    const categories = useMemo(() => {
        // Vérifier que data est un tableau avant d'appeler map
        if (!Array.isArray(data)) {
            return [];
        }
        return data.map((cat) => ({
            code: `${cat.code}`,
            name: `${cat.nom}`,
            path: `/categorie/${cat.nom
                .toLowerCase()
                .replace(/\s+/g, '-')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')}?id=${cat.code}`,
        }));
    }, [data]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }, []);

    const liensUtiles = [
        { key: 'about', path: '/a-propos' },
        { key: 'register', path: '/auth/register' },
        { key: 'howItWorks', path: '/comment-ca-marche' },
        { key: 'security', path: '/securite' },
        { key: 'help', path: '/aide' },
        { key: 'terms', path: '/conditions' },
        { key: 'privacy', path: '/confidentialite' },
    ];

    const vendreAcheter = [
        { key: 'howToSell', path: '/comment-vendre' },
        { key: 'howToBuy', path: '/comment-acheter' },
        { key: 'startSelling', path: '/vendre' },
        { key: 'orders', path: '/commandes' },
    ];

    const socialIcons = [
        { icon: FaFacebookF, path: 'https://facebook.com', label: 'Facebook' },
        { icon: FaWhatsapp, path: 'https://whatsapp.com', label: 'WhatsApp' },
        { icon: FaTwitter, path: 'https://twitter.com', label: 'Twitter' },
        { icon: FaYoutube, path: 'https://youtube.com', label: 'YouTube' },
    ];

    return (
        <footer className="bg-[#0B1120] dark:bg-gray-950 text-white pt-16 pb-6 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">

                    {/* Colonne 1 - Logo et réseaux sociaux */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="relative w-64 right-9">
                            <a href="/" className="cursor-pointer">
                                <img src={logo} alt="Logo" />
                            </a>
                        </div>
                        <p className="text-gray-300 dark:text-gray-400 text-sm">
                            <T>sellAndBuyTagline</T>
                        </p>
                        <div className="flex gap-5 pt-2">
                            {socialIcons.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-circle btn-sm border-none text-white dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-[20px]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Colonne 2 - Catégories */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-lg font-semibold text-[#F25012] dark:text-orange-500 pb-2">
                            <T>category</T>
                        </h3>
                        <ul className="space-y-2">
                            {loading ? (
                                <li className="text-gray-400 text-sm">Chargement des catégories...</li>
                            ) : categories.length === 0 ? (
                                <li className="text-gray-400 text-sm">Aucune catégorie disponible</li>
                            ) : (
                                categories.map((item) => (
                                    <li key={item.code}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-300 dark:text-gray-400 hover:text-[#F25012] dark:hover:text-orange-400 transition-colors duration-300 text-sm cursor-pointer"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* Colonne 3 - Liens utiles */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-lg font-semibold text-[#F25012] dark:text-orange-500 pb-2">
                            <T>usefulLinks</T>
                        </h3>
                        <ul className="space-y-2">
                            {liensUtiles.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.path}
                                        className="text-gray-300 dark:text-gray-400 hover:text-[#F25012] dark:hover:text-orange-400 transition-colors duration-300 text-sm cursor-pointer"
                                    >
                                        <T>{item.key}</T>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 4 - Vendre et acheter */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
                        <h3 className="text-lg font-semibold text-[#F25012] dark:text-orange-500 pb-2">
                            <T>sellAndBuy</T>
                        </h3>
                        <ul className="space-y-2">
                            {vendreAcheter.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.path}
                                        className="text-gray-300 dark:text-gray-400 hover:text-[#F25012] dark:hover:text-orange-400 transition-colors duration-300 text-sm cursor-pointer"
                                    >
                                        <T>{item.key}</T>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 5 - Contact */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="500">
                        <h3 className="text-lg font-semibold text-[#F25012] dark:text-orange-500 pb-2">
                            <T>contact</T>
                        </h3>
                        <div className="space-y-3 text-gray-300 dark:text-gray-400 text-sm">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#F25012] dark:text-orange-500 mt-1 flex-shrink-0" />
                                <span>Douala, Cameroun</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#F25012] dark:text-orange-500 flex-shrink-0" />
                                <a
                                    href="tel:+2376XXXXXXX"
                                    className="hover:text-[#F25012] dark:hover:text-orange-400 transition-colors duration-300"
                                >
                                    +237 6XX XXX XXX
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#F25012] dark:text-orange-500 flex-shrink-0" />
                                <a
                                    href="mailto:contact@e-kmer.com"
                                    className="hover:text-[#F25012] dark:hover:text-orange-400 transition-colors duration-300"
                                >
                                    contact@e-kmer.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-20"></div>

                <div className="text-center text-gray-400 dark:text-gray-500 text-sm">
                    <p>© 2026 E-kmer. <T>allRightsReserved</T></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;