import SideBar from "../components/Userventes/SideBar";
import InputField from "../components/Userventes/InputField";

export default function UserSettings() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex bg-gray-100 min-h-screen">
        <SideBar />

        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-6">Paramètres du compte</h2>
          
          <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
            <div className="space-y-4">
              <InputField label="Nom complet" placeholder="Jean Dupont" />
              <InputField label="Email" placeholder="jean@example.com" type="email" />
              <InputField label="Téléphone" placeholder="+237 6XX XXX XXX" />
              <InputField label="Localisation" placeholder="Douala" />
              
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition w-full">
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
