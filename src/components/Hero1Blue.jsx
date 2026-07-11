// src/components/HeroSection.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext'; // ← IMPORT
import T from '../components/T'; // ← IMPORT

const HeroSection = () => {
  const { t } = useAppContext(); // ← Récupère les traductions
  
  return (
    <section className="bg-[#253E59] dark:bg-gray-800 w-full transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Padding vertical responsive */}
        <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">

          {/* Flex layout : column mobile, row desktop */}
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">

            {/* ========== COLONNE GAUCHE - TEXTE ========== */}
            <div className="w-full lg:w-1/2 text-center lg:text-left px-4 sm:px-0">
              
              {/* Titre principal */}
              <h1 className="text-white dark:text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl leading-tight mb-3 sm:mb-4">
                <T>discover</T>
              </h1>

              {/* Description */}
              <p className="text-gray-300 dark:text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 mb-5 sm:mb-6 md:mb-8">
                <T>discoverDesc</T>
              </p>

              {/* Bouton */}
              <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                <a
                  href="/articles"
                  className="inline-block bg-white dark:bg-gray-700 text-[#253E59] dark:text-white font-semibold px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full text-sm sm:text-base md:text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <T>findArticles</T>
                </a>
              </div>
            </div>

            {/* ========== COLONNE DROITE - IMAGES ========== */}
            <div className="w-full lg:w-1/2 mt-6 sm:mt-8 lg:mt-0">
              
              {/* Mobile & Tablet : Images alignées horizontalement */}
              <div className="flex lg:hidden flex-row justify-center items-center gap-3 sm:gap-4 md:gap-5">
                {/* Image 1 - Montre */}
                <div className="w-[80px] sm:w-[100px] md:w-[120px] transition-all duration-300">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <img
                      src="/Montre.png"
                      alt={t.luxuryWatch || "Montre de luxe"}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>

                {/* Image 2 - Produit cosmétique */}
                <div className="w-[80px] sm:w-[100px] md:w-[120px] transition-all duration-300">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <img
                      src="/Cosmetique.png"
                      alt={t.cosmeticProduct || "Produit cosmétique"}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>

                {/* Image 3 - Ordinateur portable */}
                <div className="w-[80px] sm:w-[100px] md:w-[120px] transition-all duration-300">
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <img
                      src="/Pc.png"
                      alt={t.laptop || "Ordinateur portable"}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop : Images en diagonale */}
              <div className="hidden lg:block relative w-full h-[250px] md:h-[280px] lg:h-[300px] xl:h-[320px]">
                
                {/* Image 1 - Montre */}
                <div 
                  className="absolute transition-all duration-300 hover:scale-105"
                  style={{ 
                    width: 'clamp(100px, 15vw, 140px)',
                    left: '0%',
                    top: '0%',
                    zIndex: 10
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src="/Montre.png" 
                      alt={t.luxuryWatch || "Montre de luxe"}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>
                
                {/* Image 2 - Produit cosmétique */}
                <div 
                  className="absolute transition-all duration-300 hover:scale-105"
                  style={{ 
                    width: 'clamp(110px, 16vw, 150px)',
                    left: '20%',
                    top: '15%',
                    zIndex: 15
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src="/Cosmetique.png" 
                      alt={t.cosmeticProduct || "Produit cosmétique"}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>
                
                {/* Image 3 - Ordinateur portable */}
                <div 
                  className="absolute transition-all duration-300 hover:scale-105"
                  style={{ 
                    width: 'clamp(120px, 18vw, 160px)',
                    left: '40%',
                    top: '30%',
                    zIndex: 20
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src="/Pc.png" 
                      alt={t.laptop || "Ordinateur portable"}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;