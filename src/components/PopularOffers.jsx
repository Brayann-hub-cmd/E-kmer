import React from "react";

const products = [
  {
    id: 1,
    name: "Casque Sony",
    price: "15000 FCFA",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Jacket en cuir",
    price: "80000 FCFA",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Pixel 8 Pro",
    price: "250000 FCFA",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    name: "Friteuse Philips",
    price: "120000 FCFA",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 5,
    name: "Air Jordan",
    price: "20000 FCFA",
    image: "https://via.placeholder.com/200",
  },
];

function PopularOffers() {
  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Offres Populaires</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg mb-3"
            />

            <h3 className="font-semibold">{product.name}</h3>

            <p className="text-orange-500 font-bold">{product.price}</p>

            <button className="mt-3 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600">
              Voir les détails
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularOffers;