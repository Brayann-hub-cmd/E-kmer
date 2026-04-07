export default function SideBar({ user }) {

    const SideBar = () => {
  return <div>SideBar</div>;
};

  return (
    <div className="w-64 bg-white shadow-md p-4 flex flex-col items-center">

      {/* Avatar */}
      <div className="w-24 h-24 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
        {user.name ?.[0]}
      </div>

      {/* Infos */}
      <h2 className="mt-4 font-semibold">{user.name || "Nom utilisateur"}</h2>
      <p className="text-sm text-gray-500">{user.phone || "Téléphone"}</p>

      {/* Stats */}
      <div className="flex gap-4 mt-4">
        <div className="text-center">
          <p className="text-orange-500 font-bold">--</p>
          <span className="text-xs">Achats</span>
        </div>
        <div className="text-center">
          <p className="text-green-500 font-bold">--</p>
          <span className="text-xs">Ventes</span>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-6 w-full space-y-2">

        <button className="w-full bg-orange-100 text-orange-500 py-2 rounded">
          Mes ventes
        </button>

        <button className="w-full py-2 hover:bg-gray-100 rounded">
          Mes achats
        </button>

        <button className="w-full py-2 hover:bg-gray-100 rounded">
          Mes favoris
        </button>

        <button className="w-full py-2 hover:bg-gray-100 rounded">
          Paramètres
        </button>

      </div>
    </div>
  )
}