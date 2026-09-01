// src/i18n/i18n.js
import FR from './FR.json';
import EN from './EN.json';

// Dictionnaire des traductions
const translations = {
  FRA: FR,
  ENG: EN,
};

// Fonction de traduction
export const t = (key, language = 'FRA', params = {}) => {
  const dict = translations[language] || translations.FRA;
  let translation = dict[key] || key;

  // Remplacer les paramètres (ex: {username})
  Object.keys(params).forEach((param) => {
    translation = translation.replace(`{${param}}`, params[param]);
  });

  return translation;
};

// Récupérer la langue depuis le localStorage
export const getCurrentLanguage = () => {
  return localStorage.getItem('language') || 'FRA';
};

// Récupérer les traductions pour une langue donnée
export const getTranslations = (language) => {
  return translations[language] || translations.FRA;
};