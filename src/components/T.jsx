// src/components/T.jsx
import { useAppContext } from '../context/AppContext';

export default function T({ children, params }) {
  const { t } = useAppContext();
  
  // Si la clé n'existe pas, on affiche le texte brut (fallback)
  let text = t[children] ?? children;
  
  // Gère les paramètres dynamiques comme {stock}
  if (params) {
    Object.keys(params).forEach(key => {
      text = text.replace(`{${key}}`, params[key]);
    });
  }
  
  return <>{text}</>;
}