import React, { useEffect, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const Footer = () => {
    const [data, setData] = useState([]);

    //  Fetch categories
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await api.get("categories/");
                console.log("API RESPONSE:", response.data);

                //  Gestion DRF pagination OU réponse simple
                const categoriesData =
                    response.data?.results || response.data;

                setData(Array.isArray(categoriesData) ? categoriesData : []);
            } catch (error) {
                console.error("footer error:", error);
                setData([]); // sécurité
            }
        };

        getCategories();
    }, []);

    //  Transformation sécurisée
    const categories = useMemo(() => {
        if (!Array.isArray(data)) return [];

        return data.map((cat) => ({
            code: cat.code,
            name: cat.nom,
            path: `/categorie/${cat.nom
                ?.toLowerCase()
                .replace(/\s+/g, '-')
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, '')}?id=${cat.code}`,
        }));
    }, [data]);

    //  AOS init
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }, []);

    const liensUtiles = [
        { name: 'À propos', path: '/a-propos' },
        { name: "S'inscrire", path: '/auth/register' },
        { name: 'Comment ça marche', path: '/comment-ca-marche' },
        { name: 'Sécurité', path: '/securite' },
        { name: "Centre d'aide", path: '/aide' },
        { name: "Conditions d'utilisation", path: '/conditions' },
        { name: 'Politique de confidentialité', path: '/confidentialite' }
    ];

    const vendreAcheter = [
        { name: 'Comment vendre', path: '/comment-vendre' },
        { name: 'Comment acheter', path: '/comment-acheter' },
        { name: 'Commencer à vendre', path: '/vendre' },
        { name: 'Commandes', path: '/commandes' }
    ];

    const socialIcons = [
        { icon: FaFacebookF, path: 'https://facebook.com', label: 'Facebook' },
        { icon: FaWhatsapp, path: 'https://whatsapp.com', label: 'WhatsApp' },
        { icon: FaTwitter, path: 'https://twitter.com', label: 'Twitter' },
        { icon: FaYoutube, path: 'https://youtube.com', label: 'YouTube' }
    ];

    return (
        <footer className="bg-[#0B1120] text-white pt-16 pb-6">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">

                    {/* Logo */}
                    <div className="space-y-4" data-aos="fade-up">
                        <div className="relative w-64 right-9">

                            

                            <a href='/' className='cursor-pointer'><img src="/logo.png" alt="Logo" /></a>

                        </div>
                        <p className="text-gray-300 text-sm">
                            Achetez et vendez vos articles
                        </p>

                        <div className="flex gap-5 pt-2">
                            {socialIcons.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white"
                                >
                                    <social.icon className="text-[20px]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Catégories */}
                    <div className="space-y-4" data-aos="fade-up">
                        <h3 className="text-lg font-semibold text-[#F25012]">
                            Catégorie
                        </h3>
                        <ul className="space-y-2">
                            {categories.length > 0 ? (
                                categories.map((item) => (
                                    <li key={item.code}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-300 hover:text-[#F25012] text-sm"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400 text-sm">
                                    Chargement...
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Liens utiles */}
                    <div className="space-y-4" data-aos="fade-up">
                        <h3 className="text-lg font-semibold text-[#F25012]">
                            Liens utiles
                        </h3>
                        <ul className="space-y-2">
                            {liensUtiles.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className="text-gray-300 hover:text-[#F25012] text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Vendre/Acheter */}
                    <div className="space-y-4" data-aos="fade-up">
                        <h3 className="text-lg font-semibold text-[#F25012]">
                            Vendre et acheter
                        </h3>
                        <ul className="space-y-2">
                            {vendreAcheter.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className="text-gray-300 hover:text-[#F25012] text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4" data-aos="fade-up">
                        <h3 className="text-lg font-semibold text-[#F25012]">
                            Contact
                        </h3>
                        <div className="space-y-3 text-gray-300 text-sm">
                            <div className="flex gap-3">
                                <FaMapMarkerAlt className="text-[#F25012]" />
                                <span>Douala, Cameroun</span>
                            </div>

                            <div className="flex gap-3">
                                <FaPhoneAlt className="text-[#F25012]" />
                                <span>+237 6XX XXX XXX</span>
                            </div>

                            <div className="flex gap-3">
                                <FaEnvelope className="text-[#F25012]" />
                                <span>contact@e-kmer.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-16"></div>

                {/* Footer bottom */}
                <div className="text-center text-gray-400 text-sm">
                    <p>© 2026 E-kmer. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;