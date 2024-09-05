import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";

import ShopMaterial from "./components/Shops/ShopMaterial";
import CartProvider from "./components/Store/cart-provider";
import OrderProvider from "./components/Store/order-provider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const cartShownHandler = () => {
    setCartIsShown(true);
  };
  const cartRemoveHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      <OrderProvider>
        <Header onCart={cartShownHandler} />

        {cartIsShown && <Cart onClose={cartRemoveHandler} />}
        <ShopMaterial />

        <Footer />
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
