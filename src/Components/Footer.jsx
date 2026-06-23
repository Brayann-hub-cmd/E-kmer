import React, { useEffect, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { safeArray } from "../utils/safeData";

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

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await api.get("categories/");

                // ✅ sécurité totale API
                const categoriesData = safeArray(response.data);

                setData(categoriesData);

            } catch (error) {
                console.error("footer error:", error);
                setData([]);
            }
        };

        getCategories();
    }, []);

    const categories = useMemo(() => {
        if (!Array.isArray(data)) return [];

        return data.map((cat) => ({
            code: cat.code,
            name: cat.nom,
            path: `/categorie/${cat.nom
                .toLowerCase()
                .replace(/\s+/g, '-')
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, '')}?id=${cat.code}`,
        }));
    }, [data]);

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

                    {/* LOGO */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="relative w-64 right-9">
                            <Link to="/">
                                <h2 className="text-2xl font-bold text-white">E-Kmer</h2>
                            </Link>
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
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-[20px]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* CATÉGORIES */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-lg font-semibold text-[#F25012] pb-2">
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
                                <li className="text-gray-500 text-sm">
                                    Aucune catégorie
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* LIENS UTILES */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-lg font-semibold text-[#F25012]">
                            Liens utiles
                        </h3>

                        <ul className="space-y-2">
                            {liensUtiles.map((item, index) => (
                                <li key={index}>
                                    <a href={item.path} className="text-gray-300 hover:text-[#F25012] text-sm">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* VENDRE / ACHETER */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
                        <h3 className="text-lg font-semibold text-[#F25012]">
                            Vendre et acheter
                        </h3>

                        <ul className="space-y-2">
                            {vendreAcheter.map((item, index) => (
                                <li key={index}>
                                    <a href={item.path} className="text-gray-300 hover:text-[#F25012] text-sm">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div className="space-y-4" data-aos="fade-up" data-aos-delay="500">
                        <h3 className="text-lg font-semibold text-[#F25012]">
                            Contact
                        </h3>

                        <div className="space-y-3 text-gray-300 text-sm">

                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#F25012]" />
                                <span>Douala, Cameroun</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#F25012]" />
                                <a href="tel:+2376XXXXXXX">+237 6XX XXX XXX</a>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#F25012]" />
                                <a href="mailto:contact@e-kmer.com">
                                    contact@e-kmer.com
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="my-20"></div>

                <div className="text-center text-gray-400 text-sm">
                    <p>© 2026 E-kmer. Tous droits réservés.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;