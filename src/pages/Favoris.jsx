import SideBar from "../components/Userventes/SideBar";

export default function Favoris() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex bg-gray-100 min-h-screen">
        <SideBar />

        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-6">Mes favoris</h2>
          
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Aucun article en favoris pour le moment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
