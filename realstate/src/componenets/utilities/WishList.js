import React from "react";
import CartIcon from "./CartIcon";
import classes from "./WishList.module.css";
import { useSelector } from "react-redux";

const WishList = () => {
  const noOfItems = useSelector((state) => state.productReducer.wishlist);
  return (
    <button className={classes.btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
        <sup className={classes.totalCartItems}>{noOfItems.length}</sup>
      </span>
      <span>Whistlist</span>
    </button>
  );
};

export default WishList;
