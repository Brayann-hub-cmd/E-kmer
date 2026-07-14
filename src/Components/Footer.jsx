import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { safeArray } from "../utils/safeData";

import {
    FaFacebookF,
    FaWhatsapp,
    FaTwitter,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope
} from "react-icons/fa";

import { Link } from "react-router-dom";
import api from "../api";


const Footer = () => {

    const [data, setData] = useState([]);


    // Récupération des catégories depuis l'API
    useEffect(() => {

        const getCategories = async () => {

            try {

                const response = await api.get("categories/");

                const categoriesData = safeArray(response.data);

                setData(categoriesData);

            } catch (error) {

                console.error("Erreur récupération catégories footer :", error);

                setData([]);

            }

        };


        getCategories();

    }, []);



    // Transformation des catégories pour l'affichage
    const categories = useMemo(() => {

        return data.map((cat) => ({

            code: cat.code,

            name: cat.nom,

            path:
                `/categorie/${cat.nom
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                }?id=${cat.code}`

        }));

    }, [data]);



    // Animation
    useEffect(() => {

        AOS.init({

            duration: 1000,

            once: true,

            offset: 100

        });

    }, []);




    const liensUtiles = [

        {
            name: "À propos",
            path: "/a-propos"
        },

        {
            name: "S'inscrire",
            path: "/auth/register"
        },

        {
            name: "Comment ça marche",
            path: "/comment-ca-marche"
        },

        {
            name: "Sécurité",
            path: "/securite"
        },

        {
            name: "Centre d'aide",
            path: "/aide"
        },

        {
            name: "Conditions d'utilisation",
            path: "/conditions"
        },

        {
            name: "Politique de confidentialité",
            path: "/confidentialite"
        }

    ];



    const vendreAcheter = [

        {
            name: "Comment vendre",
            path: "/comment-vendre"
        },

        {
            name: "Comment acheter",
            path: "/comment-acheter"
        },

        {
            name: "Commencer à vendre",
            path: "/vendre"
        },

        {
            name: "Commandes",
            path: "/commandes"
        }

    ];



    const socialIcons = [

        {
            icon: FaFacebookF,
            path: "https://facebook.com",
            label: "Facebook"
        },

        {
            icon: FaWhatsapp,
            path: "https://whatsapp.com",
            label: "WhatsApp"
        },

        {
            icon: FaTwitter,
            path: "https://twitter.com",
            label: "Twitter"
        },

        {
            icon: FaYoutube,
            path: "https://youtube.com",
            label: "Youtube"
        }

    ];



    return (

        <footer className="bg-[#0B1120] text-white pt-16 pb-6">

            <div className="container mx-auto px-4 md:px-6">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">


                    {/* Logo */}

                    <div data-aos="fade-up">

                        <Link to="/">

                            <h2 className="text-3xl font-bold">
                                E-Kmer
                            </h2>

                        </Link>


                        <p className="text-gray-300 text-sm mt-4">

                            Achetez et vendez vos articles

                        </p>



                        <div className="flex gap-5 mt-4">

                            {
                                socialIcons.map((social, index) => {

                                    const Icon = social.icon;


                                    return (

                                        <a

                                            key={index}

                                            href={social.path}

                                            target="_blank"

                                            rel="noopener noreferrer"

                                            aria-label={social.label}

                                            className="hover:text-[#F25012]"

                                        >

                                            <Icon className="text-xl"/>

                                        </a>

                                    );

                                })

                            }

                        </div>


                    </div>





                    {/* Catégories */}

                    <div data-aos="fade-up">


                        <h3 className="text-lg font-semibold text-[#F25012] mb-4">

                            Catégorie

                        </h3>



                        <ul className="space-y-2">


                            {

                                categories.length ?

                                categories.map((item)=>(

                                    <li key={item.code}>

                                        <Link

                                            to={item.path}

                                            className="text-gray-300 hover:text-[#F25012] text-sm"

                                        >

                                            {item.name}

                                        </Link>

                                    </li>

                                ))

                                :

                                <li className="text-gray-500 text-sm">

                                    Aucune catégorie

                                </li>

                            }


                        </ul>


                    </div>





                    {/* Liens utiles */}

                    <div data-aos="fade-up">


                        <h3 className="text-lg font-semibold text-[#F25012] mb-4">

                            Liens utiles

                        </h3>



                        <ul className="space-y-2">


                            {
                                liensUtiles.map((item,index)=>(

                                    <li key={index}>

                                        <Link

                                            to={item.path}

                                            className="text-gray-300 hover:text-[#F25012] text-sm"

                                        >

                                            {item.name}

                                        </Link>


                                    </li>

                                ))

                            }


                        </ul>


                    </div>





                    {/* Vendre acheter */}

                    <div data-aos="fade-up">


                        <h3 className="text-lg font-semibold text-[#F25012] mb-4">

                            Vendre et acheter

                        </h3>



                        <ul className="space-y-2">


                            {

                                vendreAcheter.map((item,index)=>(

                                    <li key={index}>


                                        <Link

                                            to={item.path}

                                            className="text-gray-300 hover:text-[#F25012] text-sm"

                                        >

                                            {item.name}

                                        </Link>


                                    </li>


                                ))

                            }


                        </ul>


                    </div>





                    {/* Contact */}

                    <div data-aos="fade-up">


                        <h3 className="text-lg font-semibold text-[#F25012] mb-4">

                            Contact

                        </h3>



                        <div className="space-y-3 text-gray-300 text-sm">


                            <div className="flex gap-3">

                                <FaMapMarkerAlt className="text-[#F25012]" />

                                <span>
                                    Douala, Cameroun
                                </span>

                            </div>



                            <div className="flex gap-3">

                                <FaPhoneAlt className="text-[#F25012]" />

                                <span>
                                    +237 6XX XXX XXX
                                </span>

                            </div>



                            <div className="flex gap-3">

                                <FaEnvelope className="text-[#F25012]" />

                                <span>
                                    contact@e-kmer.com
                                </span>

                            </div>


                        </div>


                    </div>



                </div>





                <div className="border-t border-gray-700 mt-16 pt-6 text-center text-gray-400 text-sm">

                    © 2026 E-kmer. Tous droits réservés.

                </div>


            </div>


        </footer>

    );

};


export default Footer;