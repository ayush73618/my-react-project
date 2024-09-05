import { useReducer } from "react";
import CartContext from "./cart-context";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.item.price;

    const isItemExistIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[isItemExistIndex];
    let updatedItems;
    if (existingItem) {
      const updateItem = {
        ...existingItem,
        amount: existingItem.amount + 1,
        quantityPrice: existingItem.quantityPrice + action.item.price,
      };

      updatedItems = [...state.items];
      updatedItems[isItemExistIndex] = updateItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const sessionItems = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };

    sessionStorage.setItem("items", JSON.stringify(sessionItems));
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);

    const itemdetail = state.items[itemIndex];

    let updatedItems;
    let updatedTotalAmounts = state.totalAmount - itemdetail.price;
    if (itemdetail.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...itemdetail,
        quantityPrice: itemdetail.quantityPrice - itemdetail.price,
        amount: itemdetail.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    }

    const sessionItems = {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };

    sessionStorage.setItem("items", JSON.stringify(sessionItems));
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };
  }

  if (action.type === "CLEAR") {
    const sessionItems = {
      items: [],
      totalAmount: 0,
    };

    sessionStorage.setItem("items", JSON.stringify(sessionItems));

    return defaultCartState;
  }

  return {
    defaultCartState,
  };
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
  const addItemToCart = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const removeItemFromCart = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const clearAll = () => {
    dispatchCart({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addToCart: addItemToCart,
    removefromCart: removeItemFromCart,
    clearCart: clearAll,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
