import React from "react";

function DiscoverSection() {
  return (
    <section className="bg-blue-900 text-white rounded-xl p-10 my-10 flex flex-col md:flex-row items-center justify-between">
      
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Découvrez des articles
        </h2>

        <p className="mb-4">
          Parcourez des milliers d’articles publiés par des vendeurs.
        </p>

        <button className="bg-orange-500 px-6 py-2 rounded hover:bg-orange-600">
          Retrouvez nos articles
        </button>
      </div>

      <div className="flex gap-4 mt-6 md:mt-0">
        <img src="https://via.placeholder.com/120" className="rounded-lg" />
        <img src="https://via.placeholder.com/120" className="rounded-lg" />
        <img src="https://via.placeholder.com/120" className="rounded-lg" />
      </div>
    </section>
  );
}

export default DiscoverSection;