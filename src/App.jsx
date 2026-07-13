import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp";
import Userventes from "./pages/Userventes";
import PageCategorie from "./pages/CategoriePage/CategoriePage";
import PublishProduct from "./Components/PublishProduct";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import AllProducts from "./pages/AllProduct/AllProduct";

import MesVentes from "./Components/Userventes/MesVentes";
import MesAchats from "./Components/Userventes/MesAchats";
import MesFavoris from "./Components/Userventes/MesFavoris";
import MesArticles from "./Components/Userventes/MesArticles";
import Parametres from "./Components/Userventes/Parametres";
import PurchaseDetail from "./Components/Userventes/PurchaseDetail";
import SaleDetail from "./Components/Userventes/SaleDetail";

import PanierCard from "./pages/Panier/Panier";
import Paiement from "./pages/Paiement/Paiement";

import Apropos from "./pages/FooterPages/APropos";
import CommentCaMarche from "./pages/FooterPages/CommentCaMarche";
import Securite from "./pages/FooterPages/Securite";
import CentreAide from "./pages/FooterPages/CentreAide";
import Conditions from "./pages/FooterPages/Conditions";
import Confidentialite from "./pages/FooterPages/Confidentialite";
import HowToBuy from "./pages/FooterPages/CommentAcheter";
import HowToSell from "./pages/FooterPages/CommentVendre";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/auth/register", element: <SignUp /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/categorie/:categorieSlug", element: <PageCategorie /> },
    { path: "/publier/", element: <PublishProduct /> },
    { path: "/vendre", element: <Userventes /> },
    { path: "/produit/:id", element: <ProductDetail /> },
    { path: "/produits", element: <AllProducts /> },

    { path: "/profile/", element: <MesVentes /> },
    { path: "/profile/achats", element: <MesAchats /> },
    { path: "/profile/favoris", element: <MesFavoris /> },
    { path: "/profile/articles/", element: <MesArticles /> },
    { path: "/profile/parametres", element: <Parametres /> },

    { path: "/achat/:id", element: <PurchaseDetail /> },
    { path: "/vente/:id", element: <SaleDetail /> },

    { path: "/panier", element: <PanierCard /> },
    { path: "/paiement", element: <Paiement /> },

    { path: "/a-propos", element: <Apropos /> },
    { path: "/comment-ca-marche", element: <CommentCaMarche /> },
    { path: "/securite", element: <Securite /> },
    { path: "/aide", element: <CentreAide /> },
    { path: "/conditions", element: <Conditions /> },
    { path: "/confidentialite", element: <Confidentialite /> },
    { path: "/comment-vendre", element: <HowToSell /> },
    { path: "/comment-acheter", element: <HowToBuy /> },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
