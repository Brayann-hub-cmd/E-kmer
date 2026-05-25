
import { useState } from "react";
import { FaLock, FaEnvelope, FaShieldAlt } from "react-icons/fa";

export default function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ email, password });
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-300 flex items-center justify-center px-4">

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-full max-w-md">

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">

          {/* Logo */}
          <div className="flex justify-center mb-6">

            <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
              <FaShieldAlt className="text-white text-3xl" />
            </div>

          </div>

          {/* Titre */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-extrabold text-gray-900">
              Back Office Admin
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Connectez-vous pour gérer la plateforme
            </p>

          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>

              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Adresse email
              </label>

              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-orange-500 transition-all">

                <FaEnvelope className="text-gray-400 mr-3" />

                <input
                  type="email"
                  placeholder="admin@ekmer.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none w-full text-gray-800"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Mot de passe
              </label>

              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-orange-500 transition-all">

                <FaLock className="text-gray-400 mr-3" />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none w-full text-gray-800"
                />

              </div>

            </div>

            {/* Bouton */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-300"
            >
              Se connecter
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            © 2026 E-kmer Admin Panel
          </div>

        </div>

      </div>

    </div>

  );

}

