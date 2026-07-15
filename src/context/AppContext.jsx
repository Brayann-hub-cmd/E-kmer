// src/context/AppContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'FRA';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <AppContext.Provider value={{
      isDarkMode,
      toggleTheme,
      language,
      changeLanguage,
    }}>
      {children}
    </AppContext.Provider>
  );
};