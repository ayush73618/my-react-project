import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./componenets/Login/Login";
import Root from "./componenets/Root";
import SignUp from "./componenets/Login/SignUp";
import SellProduct from "./componenets/Login/SellProduct";
import WishList from "./componenets/utilities/WishList";
import WishListData from "./componenets/Product/WishListData";
import Product from "./componenets/Product/Product";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Product />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <SignUp />,
        },
        {
          path: "/sellProduct",
          element: <SellProduct />,
        },
        {
          path: "/wishlist",
          element: <WishListData />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
