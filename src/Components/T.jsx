// src/components/T.jsx
import React from 'react';
import { t, getCurrentLanguage } from '../i18n/i18n';

const T = ({ children, params = {} }) => {
  const key = typeof children === 'string' ? children : '';
  const language = getCurrentLanguage();
  return <>{t(key, language, params)}</>;
};

export default T;