import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../components/Userventes/SideBar";
import api from "../api";
import T from "../components/T";

export default function CommandeDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [livraison, setLivraison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const userRes = await api.get("auth/profile/");
      setUser(userRes.data);
    } catch (e) {
      console.error("Erreur profil:", e);
    }
    try {
      const orderRes = await api.get(`commandes/${orderId}/`);
      setOrder(orderRes.data);
    } catch (e) {
      console.error("Erreur commande:", e?.response?.status, e?.response?.data);
      setError(e?.response?.data?.error || `Impossible de charger cette commande (code ${e?.response?.status || "réseau"})`);
      setLoading(false);
      return;
    }
    try {
      const livraisonRes = await api.get(`commandes/${orderId}/livraison/`);
      setLivraison(livraisonRes.data);
    } catch {
      setLivraison(null);
    }
    setLoading(false);
  }, [orderId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleConfirmerReception = async () => {
    setConfirming(true);
    try {
      await api.patch(`livraisons/${livraison.id}/confirmer/`, {});
      fetchAll();
    } catch (err) {
      setError(err?.response?.data?.error || "Erreur lors de la confirmation");
    } finally {
      setConfirming(false);
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
        <div className="w-full md:w-auto"><SideBar user={user} activeTab="commandes" /></div>
        <div className="flex-1 p-4 sm:p-6 max-w-2xl">
          <button onClick={() => navigate('/commandes')} className="text-sm text-gray-500 hover:text-orange-500 mb-4">
            ← <T>backToOrders</T>
          </button>

          {error && !order ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className={`text-4xl mb-3 ${order.statut === 'confirmee' ? 'text-green-500' : 'text-orange-500'}`}>
                  {order.statut === 'confirmee' ? '✓' : '…'}
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {order.statut === 'confirmee' ? <T>orderConfirmed</T> : <T>orderPending</T>}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4"><T>orderNumber</T> #{order.id}</p>
                <p className="text-2xl font-bold text-orange-500">{Number(order.total).toLocaleString()} FCFA</p>
                <ul className="text-left mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {order.items.map((item) => <li key={item.id}>{item.titre} x{item.quantite}</li>)}
                </ul>
              </div>

              {order.statut === 'confirmee' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <h2 className="font-bold text-gray-900 dark:text-white mb-2"><T>deliveryStatus</T></h2>
                  {!livraison && <p className="text-sm text-gray-500 dark:text-gray-400"><T>deliveryNotYetAssigned</T></p>}
                  {livraison && (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{livraison.statut_display}</p>
                      {livraison.statut === 'confirmee' && (
                        <p className="text-green-600 dark:text-green-400 font-semibold"><T>deliveryConfirmedThanks</T></p>
                      )}
                      {livraison.statut === 'livree_attente_confirmation' && (
                        <>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4"><T>confirmReceiptPrompt</T></p>
                          <button
                            onClick={handleConfirmerReception}
                            disabled={confirming}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                          >
                            {confirming ? <T>processing</T> : <T>confirmReceipt</T>}
                          </button>
                        </>
                      )}
                      {!['confirmee', 'livree_attente_confirmation'].includes(livraison.statut) && (
                        <p className="text-sm text-gray-500 dark:text-gray-400"><T>deliveryNotYetArrived</T></p>
                      )}
                    </>
                  )}
                </div>
              )}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}