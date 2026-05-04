import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
import Userventes from "./pages/Userventes"
import PageCategorie from './pages/CategoriePage/CategoriePage';
import PublishProduct from "./components/PublishProduct";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import MesAchats from "./Components/Userventes/MesAchats";
import MesFavoris from "./components/Userventes/MesFavoris";
import Parametres from "./components/Userventes/Parametres";
import MesVentes from "./components/Userventes/MesVentes"
import PanierCard from "./pages/Panier/Panier"
import Paiement from "./pages/Paiement/Paiement";
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

      path: 'auth/login',
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