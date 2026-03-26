import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-[#253E59] w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Padding vertical important */}
        <div className="py-15 md:py-16 lg:py-20 xl:py-24">

          {/* Flex layout : column mobile, row desktop */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-16">

            {/* ========== COLONNE GAUCHE - TEXTE ========== */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">

              {/* Titre principal - très grande taille */}
              <h1 className="text-white font-bold text-3xl sm:text-5xl md:text-3xl lg:text-5xl leading-tight mb-4">
                Decouvrez des articles
              </h1>

              {/* Description - gris clair avec largeur limitée */}
              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-md mx-auto lg:mx-0 mb-8">
                Retrouvez de nombreux articles proposés par d'autres utilisateur de la plateforme
              </p>

              {/* Bouton - blanc avec texte foncé, margin-top important */}
              <div className="mt-6 md:mt-8 lg:mt-10">
                <a
                  href="/articles"
                  className="inline-block bg-white text-[#253E59] font-semibold px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Retrouvez nos articles
                </a>
              </div>
            </div>

            {/* ========== COLONNE DROITE - IMAGES ========== */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">

              {/* Mobile : Images alignées horizontalement (caché sur desktop) */}
              <div className="flex lg:hidden flex-row justify-center items-center gap-3 sm:gap-4">
                {/* Image 1 - Montre */}
                <div className="w-[100px] sm:w-[120px] md:w-[140px]">
                  <div className="relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img
                      src="/Montre.png"
                      alt="Montre de luxe"
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>

                {/* Image 2 - Produit cosmétique */}
                <div className="w-[100px] sm:w-[120px] md:w-[140px]">
                  <div className="relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img
                      src="/Cosmetique.png"
                      alt="Produit cosmétique"
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>

                {/* Image 3 - Ordinateur portable */}
                <div className="w-[100px] sm:w-[120px] md:w-[140px]">
                  <div className="relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img
                      src="/Pc.png"
                      alt="Ordinateur portable"
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop : Images en diagonale (caché sur mobile) */}
              <div className="hidden lg:block relative w-full h-[300px] xl:h-[320px]">
                
                {/* Image 1 - Montre */}
                <div 
                  className="absolute"
                  style={{ 
                    width: '140px',
                    left: '0%',
                    top: '0%',
                    zIndex: 10
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/Montre.png" 
                      alt="Montre de luxe"
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>
                
                {/* Image 2 - Produit cosmétique */}
                <div 
                  className="absolute"
                  style={{ 
                    width: '150px',
                    left: '25%',
                    top: '15%',
                    zIndex: 15
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/Cosmetique.png" 
                      alt="Produit cosmétique"
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>
                
                {/* Image 3 - Ordinateur portable */}
                <div 
                  className="absolute"
                  style={{ 
                    width: '160px',
                    left: '50%',
                    top: '30%',
                    zIndex: 20
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/Pc.png" 
                      alt="Ordinateur portable"
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