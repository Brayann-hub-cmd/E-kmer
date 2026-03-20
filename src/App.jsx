
import React from 'react';
import Home from './pages/Home/Home';


import { Toaster } from "react-hot-toast";

import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp"
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

