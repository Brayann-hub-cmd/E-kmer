import React from "react";

function SellSection() {
  return (
    <section className="bg-orange-500 text-white rounded-xl p-10 my-10 flex flex-col md:flex-row items-center justify-between">
      
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Vendez vos articles
        </h2>

        <p className="mb-4">
          Des objets qui ne servent plus ? Faites-vous de l'argent.
        </p>

        <button className="bg-white text-orange-500 px-6 py-2 rounded font-semibold">
          Vendez maintenant
        </button>
      </div>

      <div className="flex gap-4 mt-6 md:mt-0">
        <img src="https://via.placeholder.com/120" className="rounded-lg"/>
        <img src="https://via.placeholder.com/120" className="rounded-lg"/>
        <img src="https://via.placeholder.com/120" className="rounded-lg"/>
      </div>

    </section>
  );
}

export default SellSection;