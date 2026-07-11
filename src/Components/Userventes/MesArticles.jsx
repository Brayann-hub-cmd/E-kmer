// src/pages/Seller/MyArticles.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import SideBar from "../../components/Userventes/SideBar";
import BackToHome from "../../components/BackToHome";
import api from "../../api";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext"; // ← IMPORT
import T from "../../components/T"; // ← IMPORT

const LINK = import.meta.env.VITE_API_URL;

const ArticleCard = ({ article, onEdit, onDelete, onView }) => {
  const { t } = useAppContext(); // ← Récupère les traductions pour les statuts
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        <img
          src={article.image || "/placeholder.webp"}
          alt={article.titre}
          className="w-full sm:w-32 h-32 object-cover"
        />
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{article.titre}</h3>
          <p className="text-orange-500 font-bold text-lg">{article.prix.toLocaleString()} FCFA</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p><T>stock</T>: <strong className="dark:text-gray-300">{article.qte}</strong></p>
            <p><T>views</T>: <strong className="dark:text-gray-300">{article.vues || 0}</strong></p>
            <p><T>sold</T>: <strong className="dark:text-gray-300">{article.vendus || 0}</strong></p>
            <p className={`font-medium ${article.statut === "actif" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {article.statut === "actif" ? t.active : t.inactive}
            </p>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => onEdit(article.code)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors">
              <FaEdit /> <T>edit</T>
            </button>
            <button onClick={() => onView(article.code)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors">
              <FaEye /> <T>view</T>
            </button>
            <button onClick={() => onDelete(article.code, article.titre)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors">
              <FaTrash /> <T>delete</T>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MyArticles() {
  const { t } = useAppContext(); // ← Récupère les traductions
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("auth/profile/");
        setUser(userRes.data);

        const response = await api.get("annonces-user/");
        setArticles(response.data);
    
      } catch (error) {
        toast.error(t.errorLoading || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (code) => navigate(`/produit/modifier/${code}`);
  const handleView = (code) => navigate(`/produit/${code}`);
  const handleDelete = (code, titre) => {
    if (window.confirm(t.confirmDelete?.replace('{titre}', titre) || `Supprimer "${titre}" ?`)) {
      setArticles(prev => prev.filter(a => a.code !== code));
      toast.success(t.successDelete || "Article supprimé");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-auto">
          <SideBar user={user} activeTab="ventes" />
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <BackToHome />
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              <T>myArticles</T>
            </h1>
            <button onClick={() => navigate("/publier")} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
              <FaPlus /> <T>publish</T>
            </button>
          </div>

          {articles.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <p className="text-gray-400 dark:text-gray-400 text-lg">
                <T>noArticlesPublished</T>
              </p>
              <button onClick={() => navigate("/publier")} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
                <T>publishAnArticle</T>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <ArticleCard key={article.code} article={article} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}