// src/components/BackToHome.jsx
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-4 transition-colors duration-200 group"
    >
      <FaArrowLeft className="text-orange-500 text-sm group-hover:-translate-x-1 transition-transform duration-200" />
      <span className="text-sm font-medium">Accueil</span>
    </button>
  );
}