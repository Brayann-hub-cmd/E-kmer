import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
import Userventes from "./pages/Userventes"
import PageCategorie from './pages/CategoriePage/CategoriePage';
import PublishProduct from "./Components/PublishProduct";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
<<<<<<< HEAD
      path:'auth/login',
      element:<PublishProduct />
=======
      path:'/auth/login',
      element:<Login />
>>>>>>> f472e5408e7d3ac619efc452f22da918301e77eb
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