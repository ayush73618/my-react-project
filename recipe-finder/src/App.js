import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./comp/Utility/Login";
import RecipeFinder from "./comp/Recipe/RecipeFinder";
import Root from "./comp/Recipe/Root";
import HomePage from "./comp/Recipe/HomePage";
import Register from "./comp/Utility/Register";

function App() {
  //Router used for Routing
  const router = createBrowserRouter([
    {
      //Basic Routing for Out Website
      path: "/",
      element: <Root />,

      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          // /Router for Recipe
          path: "/recipe",
          element: <RecipeFinder />,
        },
        {
          //Router For Register
          path: "/register",
          element: <Register />,
        },
        {
          //Router for Login
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  //All Router Element Present Here
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
