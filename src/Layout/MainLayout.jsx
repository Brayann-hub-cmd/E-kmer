import React from "react";
import Navbar from "../Components/Navbar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;