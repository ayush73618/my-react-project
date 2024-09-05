import React from "react";

const OrderContext = React.createContext({
  orders: [],
  addOrder: (order) => {},
});

export default OrderContext;
