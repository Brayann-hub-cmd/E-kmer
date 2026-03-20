import React, { useEffect } from 'react';
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

const Footer = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }, []);

    // Données pour les colonnes
    const categories = [
        { name: 'Électronique', path: '/categorie/electronique' },
        { name: 'Véhicule', path: '/categorie/vehicule' },
        { name: 'Mode', path: '/categorie/mode' },
        { name: 'Immobilier', path: '/categorie/immobilier' },
        { name: 'Services', path: '/categorie/services' },
        { name: 'Produits agricoles', path: '/categorie/agricole' }
    ];

    const liensUtiles = [
        { name: 'À propos', path: '/a-propos' },
        { name: "S'inscrire", path: '/inscription' },
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
                {/* 5 colonnes principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">

                    {/* Colonne 1 - Logo et réseaux sociaux */}
                    <div
                        className="space-y-4"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <div class="relative w-64 right-9">
                            <a href='/' className='cursor-pointer'><img src="public\logo2 1.png" alt="Logo"/></a>
                        </div>
                        <p className="text-gray-300 text-sm">
                            Achetez et vendez vos articles
                        </p>

                        {/* Icônes réseaux sociaux */}
                        <div className="flex gap-3 pt-2">
                            {socialIcons.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-circle btn-sm bg-gray-800 hover:bg-orange-500 border-none text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Colonne 2 - Catégorie */}
                    <div
                        className="space-y-4"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3 className="text-lg font-semibold text-[#F25012] pb-2">
                            Catégorie
                        </h3>
                        <ul className="space-y-2">
                            {categories.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.path}
                                        className="text-gray-300 hover:text-[#F25012] transition-colors duration-300 text-sm cursor-pointer"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 3 - Liens utiles */}
                    <div
                        className="space-y-4"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h3 className="text-lg font-semibold text-[#F25012] pb-2">
                            Liens utiles
                        </h3>
                        <ul className="space-y-2">
                            {liensUtiles.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.path}
                                        className="text-gray-300 hover:text-[#F25012] transition-colors duration-300 text-sm cursor-pointer"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 4 - Vendre et acheter */}
                    <div
                        className="space-y-4"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <h3 className="text-lg font-semibold text-[#F25012] pb-2">
                            Vendre et acheter
                        </h3>
                        <ul className="space-y-2">
                            {vendreAcheter.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.path}
                                        className="text-gray-300 hover:text-[#F25012] transition-colors duration-300 text-sm cursor-pointer"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 5 - Contact */}
                    <div
                        className="space-y-4"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <h3 className="text-lg font-semibold text-[#F25012] pb-2">
                            Contact
                        </h3>
                        <div className="space-y-3 text-gray-300 text-sm">
                            {/* Adresse */}
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#F25012] mt-1 flex-shrink-0" />
                                <span>Douala, Cameroun</span>
                            </div>

                            {/* Téléphone */}
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#F25012] flex-shrink-0" />
                                <a
                                    href="tel:+2376XXXXXXX"
                                    className="hover:text-[#F25012] transition-colors duration-300"
                                >
                                    +237 6XX XXX XXX
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#F25012] flex-shrink-0" />
                                <a
                                    href="mailto:contact@e-kmer.com"
                                    className="hover:text-[#F25012] transition-colors duration-300"
                                >
                                    contact@e-kmer.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Séparateur */}
                <div className=" my-20"></div>

                {/* Footer bottom */}
                <div
                    className="text-center text-gray-400 text-sm"
                    data-aos="fade-up"
                    data-aos-delay="600"
                >
                    <p>© 2026 E-kmer. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;