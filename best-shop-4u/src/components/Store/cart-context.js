import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addToCart: (items) => {},
  removefromCart: (id) => {},
  clearCart: () => {},
});

export default CartContext;
