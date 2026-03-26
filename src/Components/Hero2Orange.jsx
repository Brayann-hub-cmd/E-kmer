import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../pages/SignUp/SignUp";

export default function HeroSection() {
    return (
        <div className="max-w-8xl mx-1 px-4 sm:px-15 lg:px-5 py-8 ">
            {/* Conteneur principal orange avec grands coins arrondis */}
            <div className="bg-[#F29F05] rounded-[1rem] p-6 md:p-8 lg:p-25">

                {/* Layout flex: column sur mobile, row sur desktop */}
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-60">

                    {/* ===== SECTION GAUCHE - TEXTE ===== */}
                    <div className="flex-1 text-center lg:text-left">

                        {/* Titre principal - taille réduite */}
                        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-[#3A2819] mb-3">
                            Vendez vos articles
                        </h1>

                        {/* Sous-titre - taille réduite */}
                        <p className="text-[#5C3E24] text-base md:text-lg mb-6 max-w-md mx-auto lg:mx-0">
                            Des objets qui ne servent plus ? Faites vous de l'argent.
                        </p>

                        {/* Bouton d'appel à l'action - plus large horizontalement */}
                        <a href="auth/register" className="bg-[#3A2819] text-[#F97316] font-semibold px-10 py-3.5 rounded-full text-base md:text-lg hover:bg-[#4A3829] transition-colors duration-300 shadow-md">
                            Vendez maintenant
                        </a>
                    </div>

                    {/* ===== SECTION DROITE - IMAGES ===== */}
                    <div className="flex-1">

                        {/* Conteneur des 3 images alignées horizontalement - espacement réduit */}
                        <div className="flex flex-row justify-center items-center gap-3 md:gap-4">

                            {/* Image 1 : Montre - tailles réduites */}
                            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40 rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src="public/Montre.png"
                                    alt="Montre de luxe"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Image 2 : Produit cosmétique - tailles réduites */}
                            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40 rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src="public\Cosmetique.png"
                                    alt="Produit cosmétique"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Image 3 : Ordinateur portable - tailles réduites */}
                            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40 rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src="public\Pc.png"
                                    alt="Ordinateur portable"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}