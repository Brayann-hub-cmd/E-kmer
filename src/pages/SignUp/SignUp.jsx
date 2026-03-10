import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaMoon,
  FaSun,
  FaEnvelope
} from 'react-icons/fa';
import { 
  BsCheckCircle 
} from 'react-icons/bs';


import { Link } from 'react-router-dom';
const SignUp = () => {

  // État pour gérer les valeurs du formulaire
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    accepteConditions: false
  });

  // État pour gérer les erreurs de validation
  const [erreurs, setErreurs] = useState({});
  
  // État pour gérer l'affichage des mots de passe
  const [afficherMdp, setAfficherMdp] = useState({
    motDePasse: false,
    confirmer: false
  });

  // État pour le champ touché (validation en temps réel)
  const [touched, setTouched] = useState({});

  // État pour le mode (jour/nuit)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fonction pour basculer le mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Fonction de validation du formulaire
  const validerFormulaire = (donnees = formData) => {
    const nouvellesErreurs = {};

    // Validation du nom complet
    if (!donnees.nomComplet.trim()) {
      nouvellesErreurs.nomComplet = 'Le nom complet est requis';
    } else if (donnees.nomComplet.trim().length < 2) {
      nouvellesErreurs.nomComplet = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!donnees.email.trim()) {
      nouvellesErreurs.email = 'L\'email est requis';
    } else if (!emailRegex.test(donnees.email)) {
      nouvellesErreurs.email = 'Format d\'email invalide (ex: nom@domaine.com)';
    }

    // Validation du téléphone (format Cameroun)
    const telephoneRegex = /^\+237[6][0-9]{8}$|^\+237\s[6][0-9]{2}\s[0-9]{3}\s[0-9]{3}$/;
    if (!donnees.telephone.trim()) {
      nouvellesErreurs.telephone = 'Le numéro de téléphone est requis';
    } else if (!telephoneRegex.test(donnees.telephone.replace(/\s/g, ''))) {
      nouvellesErreurs.telephone = 'Format invalide (ex: +237 6XX XXX XXX)';
    }

    // Validation du mot de passe
    if (!donnees.motDePasse) {
      nouvellesErreurs.motDePasse = 'Le mot de passe est requis';
    } else if (donnees.motDePasse.length < 6) {
      nouvellesErreurs.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Validation de la confirmation
    if (!donnees.confirmerMotDePasse) {
      nouvellesErreurs.confirmerMotDePasse = 'Veuillez confirmer votre mot de passe';
    } else if (donnees.motDePasse !== donnees.confirmerMotDePasse) {
      nouvellesErreurs.confirmerMotDePasse = 'Les mots de passe ne correspondent pas';
    }

    // Validation des conditions
    if (!donnees.accepteConditions) {
      nouvellesErreurs.accepteConditions = 'Vous devez accepter les conditions';
    }

    return nouvellesErreurs;
  };

  // Gestionnaire de changement pour les champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nouvelleValeur = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: nouvelleValeur
    }));

    // Validation en temps réel pour le champ modifié
    const validationPartielle = validerFormulaire({
      ...formData,
      [name]: nouvelleValeur
    });

    setErreurs(prev => ({
      ...prev,
      [name]: validationPartielle[name] || ''
    }));
  };

  // Gestionnaire de perte de focus
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Formatage automatique du téléphone
  const formaterTelephone = (valeur) => {
    // Supprimer tout sauf les chiffres et le +
    let numeros = valeur.replace(/[^\d+]/g, '');
    
    // Si ça commence par +237
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

  // Gestionnaire de soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nouvellesErreurs = validerFormulaire();
    
    if (Object.keys(nouvellesErreurs).length === 0) {
      // Succès - Afficher la notification
      toast.success(
        <div className="flex items-center gap-2">
          <BsCheckCircle className="text-green-500 text-xl" />
          <span>Inscription réussie ! Bienvenue sur E-kmer</span>
        </div>,
        {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#10b981',
            color: '#fff',
            padding: '16px',
          },
        }
      );
      
      // Réinitialiser le formulaire
      setFormData({
        nomComplet: '',
        email: '',
        telephone: '',
        motDePasse: '',
        confirmerMotDePasse: '',
        accepteConditions: false
      });
      setTouched({});
    } else {
      // Erreurs - Afficher les messages
      setErreurs(nouvellesErreurs);
      setTouched({
        nomComplet: true,
        email: true,
        telephone: true,
        motDePasse: true,
        confirmerMotDePasse: true,
        accepteConditions: true
      });
      
      toast.error('Veuillez corriger les erreurs dans le formulaire', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  // Composant d'icône pour le drapeau du Cameroun
  const DrapeauCameroun = () => (
    <div className="flex items-center gap-1">
      <span className="text-xl text-gray-600">🇨🇲 </span>
      <span className={isDarkMode ? "text-gray-600" : "text-gray-300"}>|</span>
    </div>
  );

  // Styles conditionnels basés sur le mode
  const pageStyle = isDarkMode 
    ? "min-h-screen bg-gray-900 flex items-center justify-center p-4" 
    : "min-h-screen bg-gray-50 flex items-center justify-center p-4";

  const cardStyle = isDarkMode 
    ? "bg-gray-800 rounded-xl shadow-lg w-full max-w-[420px] p-8 border border-gray-700" 
    : "bg-white rounded-xl shadow-lg w-full max-w-[420px] p-8";

  const titleStyle = isDarkMode 
    ? "text-2xl font-bold text-center mb-1 text-white" 
    : "text-2xl font-bold text-center mb-1 text-gray-900";

  const subtitleStyle = isDarkMode 
    ? "text-center text-gray-400 text-sm mb-6" 
    : "text-center text-gray-500 text-sm mb-6";

  const labelStyle = isDarkMode 
    ? "block text-sm font-medium text-gray-300 mb-1" 
    : "block text-sm font-medium text-gray-700 mb-1";

  const inputStyle = (hasError) => {
    const baseStyle = "w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent";
    const borderStyle = hasError 
      ? "border-red-500" 
      : isDarkMode ? "border-gray-600" : "border-gray-300";
    const bgStyle = isDarkMode ? "bg-gray-800 text-white placeholder-gray-500" : "bg-white text-gray-900 placeholder-gray-400";
    
    return `${baseStyle} ${borderStyle} ${bgStyle}`;
  };

  const inputPasswordStyle = (hasError) => {
    const baseStyle = "w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent";
    const borderStyle = hasError 
      ? "border-red-500" 
      : isDarkMode ? "border-gray-600" : "border-gray-300";
    const bgStyle = isDarkMode ? "bg-gray-800 text-white placeholder-gray-500" : "bg-white text-gray-900 placeholder-gray-400";
    
    return `${baseStyle} ${borderStyle} ${bgStyle}`;
  };

  const iconStyle = isDarkMode ? "text-gray-500" : "text-gray-400";
  const iconHoverStyle = isDarkMode ? "hover:text-gray-300" : "hover:text-gray-600";
  const errorTextStyle = isDarkMode ? "mt-1 text-xs text-red-400" : "mt-1 text-xs text-red-500";
  const helperTextStyle = isDarkMode ? "mt-1 text-xs text-gray-500" : "mt-1 text-xs text-gray-400";
  const linkStyle = isDarkMode 
    ? "text-orange-400 hover:text-orange-300 font-medium" 
    : "text-orange-500 hover:text-orange-600 font-medium";
  const textStyle = isDarkMode ? "text-gray-400" : "text-gray-600";
  const separatorStyle = isDarkMode ? "px-2 bg-gray-800 text-gray-500" : "px-2 bg-white text-gray-500";
  const borderStyle = isDarkMode ? "w-full border-t border-gray-700" : "w-full border-t border-gray-300";
  const checkboxStyle = isDarkMode 
    ? "mt-1 h-4 w-4 text-orange-500 border-gray-600 rounded focus:ring-orange-500 bg-gray-800" 
    : "mt-1 h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500";

  return (
    <div className={pageStyle}>
      {/* Toast Container */}
      <Toaster 
        toastOptions={{
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#f3f4f6' : '#1f2937',
          },
        }}
      />
      
      {/* Bouton de bascule de mode */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-700 text-yellow-400' 
            : 'bg-white text-gray-700'
        }`}
      >
        {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>
      
      {/* Card d'inscription */}
      <div className={cardStyle}>
        
        {/* Titre */}
        <h1 className={titleStyle}>
          Inscription à{' '}
          <span className="text-orange-500">E-kmer</span>
        </h1>
        
        {/* Sous-titre */}
        <p className={subtitleStyle}>
          Créez votre compte pour commencer à acheter et vendre
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Champ Nom complet */}
          <div>
            <label className={labelStyle}>
              Nom complet
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className={iconStyle} />
              </div>
              <input
                type="text"
                name="nomComplet"
                value={formData.nomComplet}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Votre nom complet"
                className={inputStyle(touched.nomComplet && erreurs.nomComplet)}
              />
            </div>
            {touched.nomComplet && erreurs.nomComplet && (
              <p className={errorTextStyle}>{erreurs.nomComplet}</p>
            )}
          </div>

          {/* Champ Email */}
          <div>
            <label className={labelStyle}>
              Adresse email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className={iconStyle} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="votre@email.com"
                className={inputStyle(touched.email && erreurs.email)}
              />
            </div>
            {touched.email && erreurs.email && (
              <p className={errorTextStyle}>{erreurs.email}</p>
            )}
          </div>

          {/* Champ Téléphone */}
          <div>
            <label className={labelStyle}>
              Numéro de téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DrapeauCameroun />
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
                placeholder="+237 6XX XXX XXX"
                className={inputStyle(touched.telephone && erreurs.telephone)}
              />
            </div>
            {touched.telephone && erreurs.telephone ? (
              <p className={errorTextStyle}>{erreurs.telephone}</p>
            ) : (
              <p className={helperTextStyle}>
                Format: +237 6XX XXX XXX
              </p>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className={labelStyle}>
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className={iconStyle} />
              </div>
              <input
                type={afficherMdp.motDePasse ? 'text' : 'password'}
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="**********"
                className={inputPasswordStyle(touched.motDePasse && erreurs.motDePasse)}
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
                  <FaEyeSlash className={`${iconStyle} ${iconHoverStyle}`} />
                ) : (
                  <FaEye className={`${iconStyle} ${iconHoverStyle}`} />
                )}
              </button>
            </div>
            {touched.motDePasse && erreurs.motDePasse && (
              <p className={errorTextStyle}>{erreurs.motDePasse}</p>
            )}
          </div>

          {/* Champ Confirmer mot de passe */}
          <div>
            <label className={labelStyle}>
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className={iconStyle} />
              </div>
              <input
                type={afficherMdp.confirmer ? 'text' : 'password'}
                name="confirmerMotDePasse"
                value={formData.confirmerMotDePasse}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="**********"
                className={inputPasswordStyle(touched.confirmerMotDePasse && erreurs.confirmerMotDePasse)}
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
                  <FaEyeSlash className={`${iconStyle} ${iconHoverStyle}`} />
                ) : (
                  <FaEye className={`${iconStyle} ${iconHoverStyle}`} />
                )}
              </button>
            </div>
            {touched.confirmerMotDePasse && erreurs.confirmerMotDePasse && (
              <p className={errorTextStyle}>{erreurs.confirmerMotDePasse}</p>
            )}
          </div>

          {/* Checkbox Conditions */}
          <div className="flex items-start mt-2">
            <input
              type="checkbox"
              name="accepteConditions"
              checked={formData.accepteConditions}
              onChange={handleChange}
              onBlur={handleBlur}
              className={checkboxStyle}
            />
            <label className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              J'accepte les{' '}
              <a href="#" className={linkStyle}>
                conditions d'utilisation
              </a>{' '}
              et la{' '}
              <a href="#" className={linkStyle}>
                politique de confidentialité
              </a>
            </label>
          </div>
          {touched.accepteConditions && erreurs.accepteConditions && (
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{erreurs.accepteConditions}</p>
          )}

          {/* Bouton principal */}
          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
              isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
            } transition-colors font-medium mt-6`}
          >
            Créer mon compte
          </button>
        </form>

        {/* Séparateur */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className={borderStyle}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={separatorStyle}>ou</span>
          </div>
        </div>

        {/* Lien de connexion */}
        <p className={`text-center text-sm ${textStyle}`}>
          Vous avez déjà un compte ?{' '}
          <Link to={'/'} className={linkStyle}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;