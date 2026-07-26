// src/components/Userventes/StatsCard.jsx
import T from "../../components/T";

export default function StatsCard({ title, value }) {
  return (
    <div>
      <p className="text-sm opacity-90 dark:text-gray-300">
        <T>{title}</T> {/* ← Le titre est maintenant traduit */}
      </p>
      <h3 className="text-xl font-bold dark:text-white">{value}</h3>
    </div>
  );
}