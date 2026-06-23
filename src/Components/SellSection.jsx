import React from "react";

import montre from "../assets/images/montre.png";
import produit from "../assets/images/gloss.png";
import laptop from "../assets/images/laptop.jpg";

const SellSection = () => {
  return (
    <div className="px-6 py-10 bg-gray-100 flex justify-center">

      {/* CONTAINER PRINCIPAL */}
      <div className="w-full max-w-30xl bg-[#F29F05] rounded-2xl px-15 py-20 flex flex-col md:flex-row items-center justify-between">

        {/* TEXTE */}
        <div className="max-w-lg text-[#8C3402]">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Vendez vos articles
          </h2>

          <p className="text-sm md:text-base mb-6">
            Des objets qui ne servent plus ? Faites-vous de l'argent.
          </p>

          <button className="bg-[#8C3402] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
            Vendez maintenant
          </button>
        </div>

        {/* IMAGES */}
        <div className="flex gap-4 mt-8 md:mt-0 items-end">

          <img
            src={montre}
            alt="montre"
            className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition"
          />

          <img
            src={produit}
            alt="produit"
            className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition"
          />

          <img
            src={laptop}
            alt="laptop"
            className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition"
          />

        </div>

      </div>
    </div>
  );
};

export default SellSection;