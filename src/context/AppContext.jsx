// src/context/AppContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { fr } from '../locales/fr';
import { en } from '../locales/en';
import { safeReadStorage, safeWriteStorage } from '../utils/storage';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = safeReadStorage('darkMode');
    return stored === 'true';
  });

  const [language, setLanguage] = useState(() => {
    const stored = safeReadStorage('language');
    return stored || 'FRA';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
    }
    safeWriteStorage('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    safeWriteStorage('language', language);
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