import SideBar from "../Components/Userventes/SideBar"
import InputField from "../Components/Userventes/InputField";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";


export default function Settings() {
  return (
    <div className="flex bg-gray-100 min-h-screen p-4 gap-6">

      {/* SIDEBAR */}
      <SideBar />

      {/* CONTENT */}
      <div className="flex-1">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-4">
          Parametres du compte
        </h1>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow p-6">

          {/* SECTION 1 */}
          <h2 className="text-lg font-semibold mb-4">
            Informations personnelles
          </h2>

          <InputField
            label="Nom complet"
            placeholder="Votre nom complet"
            icon={FaUser}
          />

          <InputField
            label="Email"
            placeholder="email@exemple.com"
            icon={FaEnvelope}
          />

          <InputField
            label="Numéro de téléphone"
            placeholder="+237 6XX XXX XXX"
            icon={FaPhone}
          />

          {/* SECTION 2 */}
          <h2 className="text-lg font-semibold mt-6 mb-4  inline-block">
            Mode vendeur
          </h2>

          <InputField
            label="Nom complet de la boutique"
            placeholder="Votre nom complet"
            icon={FaUser}
          />

        </div>
      </div>
    </div>
  );
}