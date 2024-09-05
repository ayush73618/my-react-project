import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../Store/cart-context";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const [btnBump, setBtnBump] = useState(false);
  const ctx = useContext(CartContext);
  const numberOfItem = ctx.items.reduce((curval, item) => {
    return curval + item.amount;
  }, 0);

  const { items } = ctx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnBump(true);

    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ""}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfItem}</span>
    </button>
  );
};

export default CartButton;
