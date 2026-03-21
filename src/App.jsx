<<<<<<< HEAD
import React from 'react'
import Home from './pages/Home/Home';
=======

import React from 'react';
import Home from './pages/Home/Home';


import { Toaster } from "react-hot-toast";

>>>>>>> 6e9b9ca9fc211ec7e74c838cc82d257f5dca333f
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
import PageCategorie from './pages/CategoriePage/CategoriePage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home />
    },
    {
      path:'auth/register',
      element:<SignUp />
    },
    {
      path:'auth/login',
      element:<Login />
    },
    {
      path:'/categorie/:categorieSlug',
      element:<PageCategorie/>
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

