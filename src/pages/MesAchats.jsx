import SideBar from "../components/Userventes/SideBar";
import PurchaseCard from "../components/Userventes/PurchaseCard";
import iphoneImg from "../assets/images/iphone.png";
import pixelImg from "../assets/images/pixel.jpg";
import jacketImg from "../assets/images/jacket.jpg";
import etagereImg from "../assets/images/etagere.jpg";

export default function MesAchats() {
  // Mock data for purchases
  const purchases = [
    {
      name: "Iphone 14 Pro",
      date: "15 Avril 2024",
      price: "450000",
      image: iphoneImg
    },
    {
      name: "Jacket en cuire",
      date: "26 Avril 2025",
      price: "15000",
      image: jacketImg

    },
    {
      name: "Etagère en bois",
      date: "5 mai 2026",
      price: "7800",
      image: etagereImg
    },
    {
      name: "Samsung Galaxy S23",
      date: "10 Mars 2024",
      price: "350000",
      image: pixelImg
    },
    // Add more mock purchases as needed
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex bg-gray-100 min-h-screen">
        <SideBar />

        <div className="flex-1 p-6">
          {/* TITRE */}
          <h2 className="text-xl font-semibold mb-6">Mes achats</h2>

          {/* LISTE DES ACHATS */}
          <div className="space-y-4">
            {purchases.map((purchase, index) => (
              <PurchaseCard key={index} product={purchase} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}