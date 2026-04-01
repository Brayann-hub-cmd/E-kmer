export default function ProductCard({ product }) {

  return (
    <div className="bg-white p-4 rounded-xl shadow flex gap-4">

      {/* IMAGE */}
      <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Image
          </div>
        )}
        
      </div>

      {/* INFOS */}
      <div className="flex-1">

        <div className="flex justify-between">

          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-orange-500 font-bold">{product.price}</p>
          </div>

          <span className="text-green-600 bg-green-100 px-3 py-1 rounded text-sm">
            {product.status}
          </span>
          </div>

    <div className="flex gap-6 mt-2 text-sm text-gray-600">
          <p>Stock: {product.stock}</p>
          <p>Vendus: {product.sold}</p>
        </div>
    

        {/* ACTIONS */}
        <div className="flex gap-2 mt-3">
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
            Modifier
          </button>

          <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
            Supprimer
          </button>
        </div>

      </div>

    </div>
  )
}