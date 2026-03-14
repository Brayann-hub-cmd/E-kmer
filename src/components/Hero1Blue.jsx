import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="bg-[#253E59] w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Padding responsive */}
        <div className="py-5 md:py-16 lg:py-24 xl:py-28">
          
          {/* Layout : column mobile, row desktop */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            
            {/* ========== COLONNE GAUCHE - TEXTE ========== */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              
              {/* Titre principal - taille responsive */}
              <h1 
                className="text-white font-bold mb-4 md:mb-5"
                style={{ 
                  fontSize: "40px",
                  lineHeight: '1.2'
                }}
                data-aos="fade-right"
              >
                Decouvrez des articles
              </h1>
              
              {/* Texte descriptif - taille responsive */}
              <p 
                className="text-[#D1D5DB] mb-6 md:mb-8 mx-auto lg:mx-0"
                style={{ 
                  fontSize: 'clamp(1rem, 4vw, 1.125rem)',
                  maxWidth: 'min(500px, 90%)'
                }}
                data-aos="fade-right"
                data-aos-delay="100"
              >
                Retrouvez de nombreux articles proposés par d'autres utilisateur de la plateforme
              </p>
              
              {/* Bouton principal */}
              <div data-aos="fade-up" data-aos-delay="200">
                <a 
                  to="/articles"
                  className="inline-block bg-white text-[#253E59] font-semibold shadow-md hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ 
                    padding: 'clamp(12px, 3vw, 14px) clamp(24px, 5vw, 32px)', 
                    borderRadius: '999px',
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                  }}
                >
                  Retrouvez nos articles
                </a>
              </div>
            </div>
            
            {/* ========== COLONNE DROITE - IMAGES EN DIAGONALE ========== */}
            <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0" style={{ height: 'min(50vw, 300px)' }}>
              
              {/* Conteneur centré pour les images */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Image 1 - Montre (en haut à gauche) */}
                <div 
                  className="absolute group"
                  style={{ 
                    width: 'clamp(100px, 20vw, 150px)',
                    top: '0%',
                    left: 'max(0%, calc(50% - 200px))',
                    transform: 'translateX(-20%) rotate(-5deg)'
                  }}
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-xl hover:rotate-0 hover:scale-110 transition-all duration-500">
                    <img 
                      src="/Montre.png"
                      alt="Montre"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Image 2 - Produit cosmétique (milieu) */}
                <div 
                  className="absolute group"
                  style={{ 
                    width: 'clamp(110px, 22vw, 160px)',
                    top: '30%',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(2deg)'
                  }}
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-xl hover:rotate-0 hover:scale-110 transition-all duration-500">
                    <img 
                      src="/Cosmetique.png"
                      alt="Produit cosmétique"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Image 3 - Ordinateur portable (en bas à droite) */}
                <div 
                  className="absolute group"
                  style={{ 
                    width: 'clamp(120px, 24vw, 160px)',
                    top: '50%',
                    right: "15%",
                    transform: 'translateX(20%) rotate(8deg)'
                  }}
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-xl hover:scale-110 transition-all duration-500">
                    <img 
                      src="/Pc.png"
                      alt="Ordinateur portable"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
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