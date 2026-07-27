// src/components/T.jsx
import { useAppContext } from '../context/AppContext';

export default function T({ children, params }) {
  const { t } = useAppContext();
  return <>{t(children, params)}</>;
}