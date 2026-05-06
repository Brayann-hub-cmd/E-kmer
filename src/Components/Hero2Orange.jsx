import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-6 sm:py-8 md:py-10 lg:py-12">
            {/* Conteneur principal orange avec coins arrondis */}
            <div className="bg-[#F29F05] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 xl:p-16">
                
                {/* Layout flex: column sur mobile, row sur desktop */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
                    
                    {/* ===== SECTION GAUCHE - TEXTE ===== */}
                    <div className="flex-1 text-center lg:text-left px-2 sm:px-4 lg:px-0">
                        
                        {/* Titre principal - responsive progressif */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-[#3A2819] mb-2 sm:mb-3 md:mb-4 leading-tight">
                            Vendez vos articles
                        </h1>
                        
                        {/* Sous-titre - responsive progressif */}
                        <p className="text-[#5C3E24] text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 max-w-md mx-auto lg:mx-0">
                            Des objets qui ne servent plus ? Faites-vous de l'argent.
                        </p>
                        
                        {/* Bouton d'appel à l'action */}
                        <Link
                            to="/auth/register"
                            className="inline-block bg-[#3A2819] text-[#F97316] font-semibold px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full text-sm sm:text-base md:text-lg hover:bg-[#4A3829] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                        >
                            Vendez maintenant
                        </Link>
                    </div>
                    
                    {/* ===== SECTION DROITE - IMAGES ===== */}
                    <div className="flex-1 w-full">
                        
                        {/* Conteneur des 3 images alignées horizontalement */}
                        <div className="flex flex-row justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                            
                            {/* Image 1 : Montre - tailles progressives */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                <img
                                    src="/Montre.png"
                                    alt="Montre de luxe"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Image 2 : Produit cosmétique */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                <img
                                    src="/Cosmetique.png"
                                    alt="Produit cosmétique"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Image 3 : Ordinateur portable */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                <img
                                    src="/Pc.png"
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