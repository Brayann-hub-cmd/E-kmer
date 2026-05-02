// src/components/RecapCommande.jsx
export default function RecapCommande({ commande, livraison, onConfirm, onBack }) {
  const sousTotal = commande.reduce((acc, p) => acc + p.prix * p.quantite, 0);
  const total = sousTotal + livraison.fraisTotal;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Récapitulatif de votre commande</h2>
      <div className="space-y-4">
        {commande.map(p => (
          <div key={p.id} className="flex gap-3 items-center border-b pb-3">
            <img src={p.image || "/placeholder.webp"} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1"><p className="font-semibold">{p.titre}</p><p className="text-xs text-gray-500">Qté: {p.quantite}</p><p className="text-orange-500 font-bold">{(p.prix * p.quantite).toLocaleString()} FCFA</p></div>
          </div>
        ))}
        <div className="border-t pt-3 space-y-1 text-sm">
          <div className="flex justify-between"><span>Sous-total</span><span>{sousTotal.toLocaleString()} FCFA</span></div>
          <div className="flex justify-between"><span>Livraison</span><span>{livraison.fraisTotal.toLocaleString()} FCFA</span></div>
          <div className="flex justify-between font-bold text-base pt-2"><span>Total</span><span className="text-orange-500">{total.toLocaleString()} FCFA}</span></div>
        </div>
        {livraison.modeLivraison === "domicile" && (
          <div className="bg-gray-50 p-3 rounded-xl text-sm"><p className="font-semibold">Adresse de livraison</p><p>{livraison.adresse.nomComplet}, {livraison.adresse.telephone}<br/>{livraison.adresse.quartier}, {livraison.adresse.ville}<br/>{livraison.adresse.adresseComplete}<br/>Service: {livraison.service.nom}</p></div>
        )}
        {livraison.modeLivraison === "retrait" && <div className="bg-gray-50 p-3 rounded-xl text-sm"><p className="font-semibold">Retrait en magasin</p><p>E-kmer Store, Douala Bonamoussadi</p></div>}
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex-1 border py-3 rounded-xl">Retour</button>
        <button onClick={onConfirm} className="flex-1 bg-orange-500 text-white py-3 rounded-xl">Valider et payer</button>
      </div>
    </div>
  );
}