export default function StatsCard({ stats }) {

  return (
    <div className="bg-green-500 text-white rounded-xl p-6 flex justify-between shadow">

      <div>
        <p className="text-sm">Revenus totaux</p>
        <h2 className="text-xl font-bold">
          {stats.revenus ?? "--"}
        </h2>
      </div>

      <div>
        <p className="text-sm">Produits actifs</p>
        <h2 className="text-xl font-bold">
          {stats.produits ?? "--"}
        </h2>
      </div>

      <div>
        <p className="text-sm">Ventes réalisées</p>
        <h2 className="text-xl font-bold">
          {stats.ventes ?? "--"}
        </h2>
      </div>

    </div>
  )
}