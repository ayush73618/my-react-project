import React from "react";
import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Product from "./Product/Product";

const Root = () => {
  return (
    <>
      <NavBar />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
