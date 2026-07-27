// src/context/AppContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { getTranslations } from '../i18n/i18n';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // 🌙 Thème
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // 🌍 Langue
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'FRA';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // 🔄 Fonction de traduction
  const t = (key, params = {}) => {
    const dict = getTranslations(language);
    let text = dict[key] || key;
    
    Object.keys(params).forEach((p) => {
      text = text.replace(`{${p}}`, params[p]);
    });
    
    return text;
  };

  // Sauvegarder la langue à chaque changement
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Appliquer le thème
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <AppContext.Provider value={{
      isDarkMode,
      toggleTheme,
      language,
      changeLanguage,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};