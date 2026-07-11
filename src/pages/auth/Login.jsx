// src/pages/Login.jsx
import React, { useState } from "react";
import { AiOutlineLock, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../../components/BackToHome";
import api from '../../api';
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

function Login() {
  const { t } = useAppContext(); // ← Récupère les traductions
  const [loginMethod, setLoginMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginMethod === "email") {
      try {
        const response = await api.post('auth/login/', { email: email, password: password });
        localStorage.setItem('token', response.data.token);
        const userData = response.data.user;
        toast.success(t.welcomeMessage.replace('{username}', userData.username) || `Bienvenu M./Mme ${userData.username} !`);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error(t.invalidEmailPassword || 'Email ou mot de passe incorrect.');
        } else {
          console.log(`Erreur! ${error}.`);
        }
      }
    }
    if (loginMethod === "phone") {
      try {
        const response = await api.post('auth/login/tel', { telephone: phone, password: password });
        localStorage.setItem('token', response.data.token);
        const userData = response.data.user;
        toast.success(t.welcomeMessage.replace('{username}', userData.username) || `Bienvenu M./Mme ${userData.username} !`);
        setTimeout(() => {
          navigate('/', { state: { user: userData } });
        }, 1500);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error(t.invalidPhonePassword || 'Téléphone ou mot de passe incorrect.');
        } else {
          console.log(`Erreur! ${error.message}.`);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 w-[420px] relative transition-colors duration-300">
        
        <div className="absolute top-4 left-4">
          <BackToHome />
        </div>

        <div className="text-center mb-6 mt-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            <T>loginTitle</T>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <T>loginSubtitle</T>
          </p>
        </div>

        <div className="mb-6">
          <div className="flex bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                loginMethod === "phone"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300"
              }`}
            >
              <T>withPhone</T>
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                loginMethod === "email"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300"
              }`}
            >
              <T>withEmail</T>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === "phone" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <T>phone</T>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img src="https://flagcdn.com/w20/cm.png" alt="Drapeau du Cameroun" className="w-5 h-auto mr-1" />
                  <span className="text-gray-500 dark:text-gray-400">+237</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-20 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
                  placeholder={t.phonePlaceholder || "6XX XXX XXX"}
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <T>email</T>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineMail className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
                  placeholder={t.emailPlaceholder || "votre@email.com"}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <T>password</T>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineLock className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
                placeholder={t.passwordPlaceholder || "••••••••"}
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
                className="w-4 h-4 text-orange-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                <T>rememberMe</T>
              </span>
            </label>
            <a href="#" className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
              <T>forgotPassword</T>
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <T>signIn</T>
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">ou</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            <T>noAccount</T>{" "}
            <Link to={'/auth/register'} className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors">
              <T>createAccount</T>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;