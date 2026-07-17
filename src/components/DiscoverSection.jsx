// src/components/DiscoverSection.jsx
import React from "react";
import { useAppContext } from "../context/AppContext"; // ← IMPORT
import T from "../components/T"; // ← IMPORT

function DiscoverSection() {
  const { t } = useAppContext(); // ← Récupère les traductions
  
  return (
    <section className="bg-blue-900 dark:bg-blue-950 text-white rounded-xl p-10 my-10 flex flex-col md:flex-row items-center justify-between transition-colors duration-300">
      
      <div>
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          <T>discover</T>
        </h2>

        <p className="mb-4 text-gray-200 dark:text-gray-300">
          <T>discoverDesc</T>
        </p>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition-colors">
          <T>findArticles</T>
        </button>
      </div>

      <div className="flex gap-4 mt-6 md:mt-0">
        <img src="https://via.placeholder.com/120" alt="Article" className="rounded-lg" />
        <img src="https://via.placeholder.com/120" alt="Article" className="rounded-lg" />
        <img src="https://via.placeholder.com/120" alt="Article" className="rounded-lg" />
      </div>
    </section>
  );
}

export default DiscoverSection;