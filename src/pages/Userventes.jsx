// src/pages/Userventes.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

export default function Userventes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("auth/profile/");
        setUser(response.data);
        
        // Redirection selon si boutique existe
        if (response.data.username) {
          navigate("/profile");  // Mes ventes
        } else {
          navigate("/auth/login"); //login page
        }
      } catch (error) {
        toast.error("Connectez-vous !");
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return null;
}