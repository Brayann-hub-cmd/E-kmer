// src/context/AppContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { fr } from '../locales/fr';
import { en } from '../locales/en';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('darkMode') === 'true';
  });

  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'FRA';
    return window.localStorage.getItem('language') || 'FRA';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('darkMode', String(isDarkMode));
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', language);
    }
  }, [language]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const changeLanguage = (lang) => setLanguage(lang);

  const translations = {
    FRA: fr,
    ENG: en,
  };

  const t = translations[language] || translations.FRA;

  return (
    <AppContext.Provider value={{ isDarkMode, toggleTheme, language, changeLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;