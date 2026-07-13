import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ========== PAGES PRINCIPALES ==========
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp";
import Userventes from "./pages/Userventes";
import PageCategorie from "./pages/CategoriePage/CategoriePage";
import PublishProduct from "./Components/PublishProduct";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import AllProducts from "./pages/AllProduct/AllProduct";

// ========== PAGES PROFIL UTILISATEUR ==========
import MesVentes from "./components/Userventes/MesVentes";
import MesAchats from "./Components/Userventes/MesAchats";
import MesFavoris from "./components/Userventes/MesFavoris";
import MesArticles from "./components/Userventes/MesArticles";
import Parametres from "./components/Userventes/Parametres";

// ========== PAGES DÉTAILS COMMANDES ==========
import PurchaseDetail from "./components/Userventes/PurchaseDetail";
import SaleDetail from "./components/Userventes/SaleDetail";

// ========== PAGES PANIER & PAIEMENT ==========
import PanierCard from "./pages/Panier/Panier";
import Paiement from "./pages/Paiement/Paiement";

// ========== PAGES FOOTER ==========
import Apropos from "./pages/FooterPages/APropos";
import CommentCaMarche from "./pages/FooterPages/CommentCaMarche";
import Securite from "./pages/FooterPages/Securite";
import CentreAide from "./pages/FooterPages/CentreAide";
import Conditions from "./pages/FooterPages/Conditions";
import Confidentialite from "./pages/FooterPages/Confidentialite";

function App() {
  const router = createBrowserRouter([
    // ===== ROUTES PRINCIPALES =====
    { path: "/", element: <Home /> },
    { path: "/auth/register", element: <SignUp /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/categorie/:categorieSlug", element: <PageCategorie /> },
    { path: "/publier/", element: <PublishProduct /> },
    { path: "/vendre", element: <Userventes /> },
    { path: "/produit/:id", element: <ProductDetail /> },
    { path: "/produits", element: <AllProducts /> },

    // ===== PROFIL UTILISATEUR =====
    { path: "/profile/", element: <MesVentes /> },
    { path: "/profile/achats", element: <MesAchats /> },
    { path: "/profile/favoris", element: <MesFavoris /> },
    { path: "/profile/articles/", element: <MesArticles /> },
    { path: "/profile/parametres", element: <Parametres /> },

    // ===== COMMANDES =====
    { path: "/achat/:id", element: <PurchaseDetail /> },
    { path: "/vente/:id", element: <SaleDetail /> },

    // ===== PANIER & PAIEMENT =====
    { path: "/panier", element: <PanierCard /> },
    { path: "/paiement", element: <Paiement /> },

    // ===== PAGES FOOTER =====
    { path: "/a-propos", element: <Apropos /> },
    { path: "/comment-ca-marche", element: <CommentCaMarche /> },
    { path: "/securite", element: <Securite /> },
    { path: "/aide", element: <CentreAide /> },
    { path: "/conditions", element: <Conditions /> },
    { path: "/confidentialite", element: <Confidentialite /> },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;