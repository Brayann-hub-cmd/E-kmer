// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaEnvelope
} from 'react-icons/fa';
import {
  BsCheckCircle
} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import BackToHome from '../../components/BackToHome';
import api from '../../api';
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

const SignUp = () => {
  const { t } = useAppContext(); // ← Récupère les traductions
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    accepteConditions: false
  });

  const [erreurs, setErreurs] = useState({});
  const [afficherMdp, setAfficherMdp] = useState({
    motDePasse: false,
    confirmer: false
  });
  const [touched, setTouched] = useState({});

  const validerFormulaire = (donnees = formData) => {
    const nouvellesErreurs = {};

    if (!donnees.nomComplet.trim()) {
      nouvellesErreurs.nomComplet = t.requiredField || 'Le nom complet est requis';
    } else if (donnees.nomComplet.trim().length < 2) {
      nouvellesErreurs.nomComplet = t.nameMinChars || 'Le nom doit contenir au moins 2 caractères';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!donnees.email.trim()) {
      nouvellesErreurs.email = t.requiredField || "L'email est requis";
    } else if (!emailRegex.test(donnees.email)) {
      nouvellesErreurs.email = t.invalidEmailFormat || "Format d'email invalide (ex: nom@domaine.com)";
    }

    const telephoneRegex = /^\+237[6][0-9]{8}$|^\+237\s[6][0-9]{2}\s[0-9]{3}\s[0-9]{3}$/;
    if (!donnees.telephone.trim()) {
      nouvellesErreurs.telephone = t.requiredField || 'Le numéro de téléphone est requis';
    } else if (!telephoneRegex.test(donnees.telephone.replace(/\s/g, ''))) {
      nouvellesErreurs.telephone = t.invalidPhoneFormat || 'Format invalide (ex: +237 6XX XXX XXX)';
    }

    if (!donnees.motDePasse) {
      nouvellesErreurs.motDePasse = t.requiredField || 'Le mot de passe est requis';
    } else if (donnees.motDePasse.length < 6) {
      nouvellesErreurs.motDePasse = t.passwordMinLength || 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!donnees.confirmerMotDePasse) {
      nouvellesErreurs.confirmerMotDePasse = t.requiredField || 'Veuillez confirmer votre mot de passe';
    } else if (donnees.motDePasse !== donnees.confirmerMotDePasse) {
      nouvellesErreurs.confirmerMotDePasse = t.passwordsMismatch || 'Les mots de passe ne correspondent pas';
    }

    if (!donnees.accepteConditions) {
      nouvellesErreurs.accepteConditions = t.acceptTermsRequired || 'Vous devez accepter les conditions';
    }

    return nouvellesErreurs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nouvelleValeur = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: nouvelleValeur
    }));

    const validationPartielle = validerFormulaire({
      ...formData,
      [name]: nouvelleValeur
    });

    setErreurs(prev => ({
      ...prev,
      [name]: validationPartielle[name] || ''
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const formaterTelephone = (valeur) => {
    let numeros = valeur.replace(/[^\d+]/g, '');

    if (numeros.startsWith('+237')) {
      const sansPrefix = numeros.slice(4);
      if (sansPrefix.length > 0) {
        const partie1 = sansPrefix.slice(0, 3);
        const partie2 = sansPrefix.slice(3, 6);
        const partie3 = sansPrefix.slice(6, 9);

        let formate = '+237';
        if (partie1) formate += ' ' + partie1;
        if (partie2) formate += ' ' + partie2;
        if (partie3) formate += ' ' + partie3;

        return formate;
      }
    }
    return valeur;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const nouvellesErreurs = validerFormulaire();

  if (Object.keys(nouvellesErreurs).length === 0) {
    const telephone = formData.telephone.replace(/\s/g, '');

    try {
      const response = await api.post('auth/register/', {
        username: formData.nomComplet,
        telephone: telephone,
        email: formData.email,
        password: formData.motDePasse,
      });

      toast.success(
        <div className="flex items-center gap-2">
          <BsCheckCircle className="text-green-500 text-xl" />
          <span>{response.data.message || t.registrationSuccess}</span>
        </div>,
        {
          duration: 4000,
          position: 'top-center',
          style: { background: '#10b981', color: '#fff', padding: '16px' },
        }
      );

      setFormData({
        nomComplet: '',
        email: '',
        telephone: '',
        motDePasse: '',
        confirmerMotDePasse: '',
        accepteConditions: false
      });
      setTouched({});

      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);

    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.error || t.registrationError);
      } else if (error.response?.status === 500) {
        toast.error(t.serverError || "Un problème avec le serveur est survenue!");
      } else {
        toast.error(`${t.registrationError || "Erreur d'inscription"}`);
        console.error(error);
      }
      // formulaire conservé tel quel en cas d'échec — l'utilisateur ne retape pas tout
    }
  } else {
    setErreurs(nouvellesErreurs);
    setTouched({
      nomComplet: true,
      email: true,
      telephone: true,
      motDePasse: true,
      confirmerMotDePasse: true,
      accepteConditions: true
    });

    toast.error(t.formErrors || 'Veuillez corriger les erreurs dans le formulaire', {
      duration: 3000,
      position: 'top-center',
    });
  }
};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <Toaster
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#1f2937',
          },
        }}
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-[420px] p-8 relative transition-colors duration-300">

        <div className="absolute top-4 left-4">
          <BackToHome />
        </div>

        <h1 className="text-2xl font-bold text-center mb-1 text-gray-900 dark:text-white mt-4">
          <T>registerTitle</T>
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          <T>registerSubtitle</T>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <T>fullName</T>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                name="nomComplet"
                value={formData.nomComplet}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t.fullNamePlaceholder || "Votre nom complet"}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${touched.nomComplet && erreurs.nomComplet ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300`}
              />
            </div>
            {touched.nomComplet && erreurs.nomComplet && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">{erreurs.nomComplet}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <T>email</T>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t.emailPlaceholder || "votre@email.com"}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${touched.email && erreurs.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300`}
              />
            </div>
            {touched.email && erreurs.email && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">{erreurs.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <T>phone</T>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src="https://flagcdn.com/w20/cm.png" alt={t.flagAlt || "Drapeau du Cameroun"} className="w-5 h-auto mr-1" />
              </div>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={(e) => {
                  const formate = formaterTelephone(e.target.value);
                  handleChange({
                    target: {
                      name: 'telephone',
                      value: formate,
                      type: 'text'
                    }
                  });
                }}
                onBlur={handleBlur}
                placeholder={t.phonePlaceholder || "+237 6XX XXX XXX"}
                className={`w-full pl-24 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${touched.telephone && erreurs.telephone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300`}
              />
            </div>
            {touched.telephone && erreurs.telephone ? (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">{erreurs.telephone}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                <T>phoneFormatHint</T>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <T>password</T>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type={afficherMdp.motDePasse ? 'text' : 'password'}
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t.passwordPlaceholder || "**********"}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${touched.motDePasse && erreurs.motDePasse ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setAfficherMdp(prev => ({
                  ...prev,
                  motDePasse: !prev.motDePasse
                }))}
              >
                {afficherMdp.motDePasse ? (
                  <FaEyeSlash className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                ) : (
                  <FaEye className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                )}
              </button>
            </div>
            {touched.motDePasse && erreurs.motDePasse && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">{erreurs.motDePasse}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <T>confirmPassword</T>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type={afficherMdp.confirmer ? 'text' : 'password'}
                name="confirmerMotDePasse"
                value={formData.confirmerMotDePasse}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t.passwordPlaceholder || "**********"}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${touched.confirmerMotDePasse && erreurs.confirmerMotDePasse ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setAfficherMdp(prev => ({
                  ...prev,
                  confirmer: !prev.confirmer
                }))}
              >
                {afficherMdp.confirmer ? (
                  <FaEyeSlash className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                ) : (
                  <FaEye className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                )}
              </button>
            </div>
            {touched.confirmerMotDePasse && erreurs.confirmerMotDePasse && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">{erreurs.confirmerMotDePasse}</p>
            )}
          </div>

          <div className="flex items-start mt-2">
            <input
              type="checkbox"
              name="accepteConditions"
              checked={formData.accepteConditions}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 h-4 w-4 text-orange-500 border-gray-300 dark:border-gray-600 rounded focus:ring-orange-500 dark:bg-gray-700"
            />
            <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              <T>acceptConditions</T>{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                <T>terms</T>
              </a>{' '}
              <T>and</T>{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                <T>privacy</T>
              </a>
            </label>
          </div>
          {touched.accepteConditions && erreurs.accepteConditions && (
            <p className="text-xs mt-1 text-red-500 dark:text-red-400">{erreurs.accepteConditions}</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors font-medium mt-6"
          >
            <T>signUp</T>
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">ou</span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          <T>hasAccount</T>{' '}
          <Link to={'/auth/login'} className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-medium transition-colors">
            <T>signIn</T>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;