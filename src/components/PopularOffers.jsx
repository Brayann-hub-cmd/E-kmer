import React, { useState } from "react";

import casque from "../assets/images/casque.jpg";
import jacket from "../assets/images/jacket.jpg";
import pixel from "../assets/images/pixel.jpg";
import friteuse from "../assets/images/friteuse.jpg";
import etagere from "../assets/images/etagere.jpg";
import jordan from "../assets/images/jordan.jpg";
import laptop from "../assets/images/laptop.jpg";

const products = [
  {
    id: 1,
    name: "Casque Sony",
    price: "15000 FCFA",
    location: "Douala",
    time: "il y a 7 jours",
    image: casque,
  },
  {
    id: 2,
    name: "Jacket en cuir",
    price: "80000 FCFA",
    location: "Yaoundé",
    time: "il y a 3 jours",
    image: jacket,
  },
  {
    id: 3,
    name: "Pixel 8 Pro",
    price: "250000 FCFA",
    location: "Douala",
    time: "Aujourd’hui",
    image: pixel,
  },
  {
    id: 4,
    name: "Friteuse Philips",
    price: "120000 FCFA",
    location: "Bamenda",
    time: "Hier",
    image: friteuse,
  },
  {
    id: 5,
    name: "Étagère",
    price: "60000 FCFA",
    location: "Douala",
    time: "Aujourd’hui",
    image: etagere,
  },
  {
    id: 6,
    name: "Air Jordan",
    price: "20000 FCFA",
    location: "Yaoundé",
    time: "il y a 2 jours",
    image: jordan,
  },
  {
    id: 7,
    name: "Laptop Lenovo",
    price: "200000 FCFA",
    location: "Douala",
    time: "il y a 5 jours",
    image: laptop,
  },
];

function PopularOffers() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Offres Populaires</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[220px] bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />

              {/* COEUR FAVORI */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 text-xl"
              >
                {favorites.includes(product.id) ? "❤️" : "🤍"}
              </button>
            </div>

            {/* CONTENU */}
            <div className="p-3">
              <p className="text-orange-500 font-bold">{product.price}</p>

              <p className="font-semibold text-sm">{product.name}</p>

              <p className="text-gray-400 text-xs">
                📍 {product.location} • {product.time}
              </p>

              <button className="mt-3 w-full bg-orange-500 text-white text-sm py-2 rounded-full hover:bg-orange-600">
                Voir les détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularOffers;