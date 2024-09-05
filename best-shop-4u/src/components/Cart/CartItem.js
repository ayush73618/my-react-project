import { useContext } from "react";
import CartContext from "../Store/cart-context";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const ctx = useContext(CartContext);
  const price = `Rs. ${props.item.price.toFixed(2)}`;
  const qprice = `Rs. ${props.item.quantityPrice.toFixed(2)}`;

  const onAddItem = () => {
    ctx.addToCart({
      id: props.item.id,
      company: props.item.company,
      model: props.item.model,
      amount: 1,
      price: props.item.price,
      quantityPrice: qprice,
    });
  };

  const removeHandler = () => {
    ctx.removefromCart(props.item.id);
  };
  return (
    <li className={classes.cartItem}>
      <div>
        <h4>
          {props.item.company} {props.item.model}
        </h4>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeHandler}>
          <i className="fas fa-trash"></i>
        </button>
        <button onClick={onAddItem} className={classes.button}>
          +
        </button>
      </div>

      <div className={classes.finalPrice}>{qprice}</div>
    </li>
  );
};
export default CartItem;
