import React, { useState } from "react";
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlinePhone } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      alert("Connexion réussie!");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 animate-fade-in">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full animate-slide-in">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl text-center text-white mb-8 animate-slide-in-down animate-gradient">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl mx-auto animate-float animate-pulse-glow animate-spin-slow">
            <span className="text-4xl font-black text-orange-600">E</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">E-KMER</h1>
          <p className="opacity-90">Bienvenue sur votre plateforme</p>
        </div>

        <div className="mb-6 animate-slide-in delay-100">
          <p className="text-xs font-semibold text-orange-600 uppercase text-center mb-3">Choisir votre méthode</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-all border-2 ${
                loginMethod === "email"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "text-gray-700 border-gray-300 hover:border-orange-500"
              } hover:animate-wiggle`}
            >
              <MdAlternateEmail className="text-lg hover:animate-spin-slow" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-all border-2 ${
                loginMethod === "phone"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "text-gray-700 border-gray-300 hover:border-orange-500"
              } hover:animate-wiggle`}
            >
              <AiOutlinePhone className="text-lg hover:animate-spin-slow" />
              <span>Tél.</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {loginMethod === "email" ? (
            <div className="animate-slide-in delay-200">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Adresse Email</label>
              <div className="relative group">
                <AiOutlineMail className="absolute right-3 top-3 text-orange-500 text-xl group-hover:animate-spin-slow" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="animate-slide-in delay-200">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Numéro de Téléphone</label>
              <div className="relative group">
                <AiOutlinePhone className="absolute right-3 top-3 text-orange-500 text-xl group-hover:animate-spin-slow" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="+237 6 12 34 56 78"
                  required
                />
              </div>
            </div>
          )}

          <div className="animate-slide-in delay-300">
            <label className="block text-sm font-semibold text-gray-800 mb-2">Mot de passe</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-orange-500"
              >
                {showPassword ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye className="text-xl" />}
              </button>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm animate-slide-in delay-300">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded accent-orange-600" />
              <span className="ml-2 text-gray-600 hover:text-gray-800 transition">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold transition hover:animate-wiggle">
              Mot de passe oublié?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 animate-slide-in delay-400 hover:animate-pulse hover:scale-105 focus:animate-pulse-glow"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connexion...</span>
              </>
            ) : (
              "Se connecter →"
            )}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-200 pt-6 animate-slide-in delay-500">
          <p className="text-gray-600">
            Pas de compte?{" "}
            <a href="/register" className="font-semibold text-orange-600 hover:text-orange-700 hover:animate-bounce">
              S'inscrire gratuitement
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;