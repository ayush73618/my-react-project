import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router";
const Root = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
