// src/pages/Userventes.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext"; // ← IMPORT
import T from "../components/T"; // ← IMPORT

export default function Userventes() {
  const { t } = useAppContext(); // ← Récupère les traductions
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const getUser = async () => {
    try {
      const response = await api.get("auth/profile/");
      setUser(response.data);
      navigate("/profile");
    } catch (error) {
      toast.error(t.loginRequired || "Connectez-vous !");
      localStorage.removeItem("token");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };
  getUser();
}, [navigate, t]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return null;
}