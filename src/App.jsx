import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
import Userventes from "./pages/Userventes"
import PageCategorie from './pages/CategoriePage/CategoriePage';
import PublishProduct from "./Components/PublishProduct";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import MesArticles from "./Components/Userventes/MesArticles";
import PurchaseDetail from "./Components/Userventes/PurchaseDetail";
import MesAchats from "./Components/Userventes/MesAchats";
import SaleDetail from "./Components/Userventes/SaleDetail";
import Apropos from "./pages/FooterPages/APropos";
import CommentCaMarche from "./pages/FooterPages/CommentCaMarche";
import Securite from "./pages/FooterPages/Securite";
import CentreAide from "./pages/FooterPages/CentreAide";
import Conditions from "./pages/FooterPages/Conditions";
import Confidentialite from "./pages/FooterPages/Confidentialite";
import MesFavoris from "./Components/Userventes/MesFavoris";
import Parametres from "./Components/Userventes/Parametres";
import AllProducts from "./pages/AllProduct/AllProduct";
import MesVentes from "./Components/Userventes/MesVentes"
import PanierCard from "./pages/Panier/Panier"
import Paiement from "./pages/Paiement/Paiement";
// import ProductDetail from "./pages/ProductDetails/ProductDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/auth/register',
      element: <SignUp />
    },
    {
      path: '/auth/login',
      element: <Login />
    },
    {
      path: '/categorie/:categorieSlug',
      element: <PageCategorie />
    },
    {
      path: '/publier/',
      element: <PublishProduct />
    },
    {
      path: '/vendre',
      element: <Userventes />
    },
    {
      path: '/produit/:id',
      element: <ProductDetail />
    },
    {
      path: '/profile/achats',
      element: <MesAchats />
    },
    {
      path: '/profile/favoris',
      element: <MesFavoris  />
    },
    {
      path: '/profile/parametres',
      element: <Parametres />
    }, 
    {
      path: '/panier',
      element: <PanierCard />
    }, 
    {
      path: '/paiement',
      element: <Paiement />
    },
    {
      path: '/profile/',
      element: <MesVentes />
    },
    {
      path: '/profile/articles/',
      element: <MesArticles/>
    },
    {
      path: "/achat/:id",
      element: <PurchaseDetail/>
    },
    {
      path: "/vente/:id",
      element: <SaleDetail />
    },
    {
      path: '/produits', 
      element: <AllProducts />
    },
    {
  path: "/a-propos",
  element: <Apropos />
    },
    {
      path: "/comment-ca-marche",
      element: <CommentCaMarche />
    },
    {
       path: "/securite",
      element: <Securite />
    },
    {
      path: "/aide",
      element: <CentreAide />
    },
    {
      path: "/conditions",
      element: <Conditions />
    },
    {
      path: "/confidentialite",
      element: <Confidentialite />
    }
  ])
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App;