import React, { useReducer } from "react";
import OrderContext from "./order-context";

const intialOrder = {
  orders: [],
};
const orderReducerFn = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = [...state.orders];
    updatedItems.push(action.order);

    return {
      orders: updatedItems,
    };
  } else {
    return intialOrder;
  }
};

const OrderProvider = (props) => {
  const [orderState, dispatchOrder] = useReducer(orderReducerFn, intialOrder);

  const orderHistory = (order, orderDetail) => {
    dispatchOrder({
      type: "ADD",
      order: {
        order,
        orderAmount: orderDetail.orderAmount,
        date: orderDetail.date,
      },
    });
  };

  const orderContext = {
    orders: orderState.orders,
    orderDetail: orderState.orderDetail,
    addOrder: orderHistory,
  };
  return (
    <OrderContext.Provider value={orderContext}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
