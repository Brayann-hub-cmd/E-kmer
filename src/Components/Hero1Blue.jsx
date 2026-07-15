import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-[#253E59] w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">

          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">

            {/* TEXTE */}
            <div className="w-full lg:w-1/2 text-center lg:text-left px-4 sm:px-0">

              <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4">
                Découvrez des articles
              </h1>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 mb-5 sm:mb-6 md:mb-8">
                Retrouvez de nombreux articles proposés par d'autres utilisateurs de la plateforme.
              </p>

              <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                <Link
                  to="/produits"
                  className="inline-block bg-white text-[#253E59] font-semibold px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full text-sm sm:text-base md:text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Retrouvez nos articles
                </Link>
              </div>

            </div>

            {/* IMAGES */}
            <div className="w-full lg:w-1/2 mt-6 sm:mt-8 lg:mt-0">

              {/* MOBILE */}
              <div className="flex lg:hidden justify-center items-center gap-3 sm:gap-4 md:gap-5">

                <Link
                  to="/categorie/mode?id=mode"
                  className="w-[80px] sm:w-[100px] md:w-[120px] transition-transform duration-300 hover:scale-105"
                >
                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <img
                      src="/Montre.png"
                      alt="Mode"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </Link>

                <Link
                  to="/categorie/electronique?id=Electro"
                  className="w-[80px] sm:w-[100px] md:w-[120px] transition-transform duration-300 hover:scale-105"
                >
                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <img
                      src="/Cosmetique.png"
                      alt="Electronique"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </Link>

                <Link
                  to="/categorie/jeux?id=JEU"
                  className="w-[80px] sm:w-[100px] md:w-[120px] transition-transform duration-300 hover:scale-105"
                >
                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <img
                      src="/Pc.png"
                      alt="Jeux"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </Link>

              </div>

              {/* DESKTOP */}
              <div className="hidden lg:block relative w-full h-[250px] md:h-[280px] lg:h-[300px] xl:h-[320px]">

                <Link
                  to="/categorie/mode?id=mode"
                  className="absolute transition-transform duration-300 hover:scale-105"
                  style={{
                    width: "clamp(100px,15vw,140px)",
                    left: "0%",
                    top: "0%",
                    zIndex: 10,
                  }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="/Montre.png"
                      alt="Mode"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </Link>

                <Link
                  to="/categorie/electronique?id=Electro"
                  className="absolute transition-transform duration-300 hover:scale-105"
                  style={{
                    width: "clamp(110px,16vw,150px)",
                    left: "20%",
                    top: "15%",
                    zIndex: 15,
                  }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="/Cosmetique.png"
                      alt="Electronique"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </Link>

                <Link
                  to="/categorie/jeux?id=JEU"
                  className="absolute transition-transform duration-300 hover:scale-105"
                  style={{
                    width: "clamp(120px,18vw,160px)",
                    left: "40%",
                    top: "30%",
                    zIndex: 20,
                  }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="/Pc.png"
                      alt="Jeux"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </Link>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;