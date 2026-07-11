// src/components/StatsCard.jsx
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

export default function StatsCard({ title, value }) {
  const { t } = useAppContext(); // ← Récupère les traductions (optionnel ici)
  
  return (
    <div>
      <p className="text-sm opacity-90 dark:text-gray-300">
        <T>{title}</T> {/* ← Le titre est maintenant traduit */}
      </p>
      <h3 className="text-xl font-bold dark:text-white">{value}</h3>
    </div>
  );
}