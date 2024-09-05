import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  //Root Page for Display All Item on Web Page where Navbar will be seen on All Pages and
  // Outlet will let Router Do their work
  return (
    <section>
      <Navbar />
      <Outlet />
    </section>
  );
};

//Exporting to use it on App.js
export default Root;
