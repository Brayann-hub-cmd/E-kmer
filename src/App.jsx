import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
import Userventes from "./pages/Userventes"
import PageCategorie from './pages/CategoriePage/CategoriePage';
import PublishProduct from "./components/PublishProduct";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  UserSettings from "./pages/UserSettings";
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/auth/register',
      element:<SignUp />
    },
    {

      path:'auth/login',
      element:<PublishProduct />
    },
    {
      path:'/categorie/:categorieSlug',
      element:<PageCategorie/>
    },
    {

      path:'/publier/',
      element:<PublishProduct />
    },
    {
      path:'/vendre/',
      element:<Userventes />

    },
    {
      path:'/publish_annonce/',
      element:<PublishProduct/>

    },
    {
      path:'/settings/',
      element:<UserSettings/>

    }
  ])
  return (
    <>
      <Toaster />
      <RouterProvider router={router}/>
    </>
  )
}

export default App;