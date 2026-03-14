import React from "react";

function RecentProducts() {
  return (
    <section className="bg-gray-100 rounded-xl p-10 my-10 text-center">
      
      <h2 className="text-2xl font-bold mb-4">
        Consultations récentes
      </h2>

      <p className="mb-4 text-gray-600">
        Vous n’avez pas encore consulté d’articles.
      </p>

      <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
        Explorer les articles
      </button>
    </section>
  );
}

export default RecentProducts;