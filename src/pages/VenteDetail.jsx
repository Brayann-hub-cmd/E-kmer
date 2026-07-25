import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../components/Userventes/SideBar";
import api from "../api";
import T from "../components/T";

export default function VenteDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [vente, setVente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("auth/profile/").then((res) => setUser(res.data)).catch(() => {});
    api.get(`ventes/${code}/`)
      .then((res) => setVente(res.data))
      .catch((e) => setError(e?.response?.data?.error || `Impossible de charger cette vente (code ${e?.response?.status || "réseau"})`))
      .finally(() => setLoading(false));
  }, [code]);

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
        <div className="w-full md:w-auto"><SideBar user={user} activeTab="ventes" /></div>
        <div className="flex-1 p-4 sm:p-6 max-w-2xl">
          <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-orange-500 mb-4">
            ← <T>back</T>
          </button>

          {error && !vente ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                <T>Numéro de vente</T> {vente.code}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(vente.created_at).toLocaleDateString('fr-FR')} — {vente.mode_paiement}
              </p>

              {vente.vue === "acheteur" && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><T>status</T>: {vente.statut}</p>
              )}
              {vente.vue === "vendeur" && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><T>buyer</T>: {vente.acheteur_nom}</p>
              )}

              <div className="mt-4 space-y-2">
                {vente.lignes.map((ligne) => (
                  <div key={ligne.id} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    {ligne.annonce_image && (
                      <img src={ligne.annonce_image} alt={ligne.annonce_titre} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{ligne.annonce_titre}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <T>quantityOrdered</T> {ligne.quantite} × {ligne.prix_unitaire?.toLocaleString()} FCFA
                      </p>
                    </div>
                    <p className="text-orange-500 font-semibold text-sm">
                      {(ligne.quantite * ligne.prix_unitaire).toLocaleString()} FCFA
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-right">
                <p className="text-orange-500 font-bold text-xl">{Number(vente.total).toLocaleString()} FCFA</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}