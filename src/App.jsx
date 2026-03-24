import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/SignUp/SignUp";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

