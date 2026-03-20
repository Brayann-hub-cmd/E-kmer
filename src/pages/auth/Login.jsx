import React, { useState } from "react";
import { AiOutlineLock, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import api from '../../api'
import toast from "react-hot-toast";
function Login() {
  const [loginMethod, setLoginMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    if (loginMethod === "email") {
      try {
        const response = await api.post('auth/login/', { email: email, password: password })
        localStorage.setItem('token', response.data.token)
        const userData = response.data.user
        setUser(userData)
        navigate('/auth/register',{state:{user:userData}})
        toast.success(`Soyez la bienvenu M.${userData.username} !`)
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error('Email ou mot de passe incorrect.')
        } else {
          console.log(`Erreur! ${error}.`);
        }
      }
    }
    if (loginMethod === "phone") {
      try {
        const response = await api.post('auth/login/tel',{telephone:phone, password: password})
        localStorage.setItem('token', response.data.token)
        const userData = response.data.user
        setUser(userData)
        navigate('/auth/register',{state:{user:userData}})
        toast.success(`Soyez la bienvenu M.${userData.username} !`)
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error('Email ou mot de passe incorrect.')
        } else {
          console.log(`Erreur! ${error}.`);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-[420px]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Connexion à <span className="text-orange-500">E-kmer</span>
          </h1>
          <p className="text-gray-500 text-sm">Accédez à votre compte pour continuer</p>
        </div>

        <div className="mb-6">
          <div className="flex bg-white border border-gray-300 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${loginMethod === "phone"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-500"
                }`}
            >
              Avec votre téléphone
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${loginMethod === "email"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-500"
                }`}
            >
              Avec votre email
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === "phone" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img src="https://flagcdn.com/w20/cm.png" alt="Drapeau du Cameroun" className="w-5 h-auto mr-1" />
                  <span className="text-gray-500">+237</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-20 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="6XX XXX XXX"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineLock className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
            onClick={handleSubmit}
          >
            Connexion
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Vous n'avez pas de compte ?{" "}
            <Link to={'auth/register'} className="text-orange-600 hover:text-orange-700 font-medium">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;