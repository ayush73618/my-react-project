import { useContext } from "react";
import CartContext from "../Store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import OrderContext from "../Store/order-context";
import CheckoutForm from "../Shops/CheckoutForm";
import { useState } from "react";
import Payment from "../Layouts/Payment";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCardPayment, setIsCardPayment] = useState(false);
  const [userDetail, setUserDetail] = useState();

  const ctx = useContext(CartContext);
  const order = useContext(OrderContext);
  const totalAmount = `Rs. ${ctx.totalAmount.toFixed(2)}`;

  const checkOut = () => {
    setIsCheckOut(true);
  };

  const orderItem = (userData) => {
    setUserDetail(userData);

    setIsCardPayment(true);
  };
  const paymentConfirm = async (isConfirm) => {
    if (isConfirm) {
      setIsCardPayment(false);
      setIsCheckOut(false);
      const date = new Date();

      order.addOrder(ctx.items, {
        orderAmount: ctx.totalAmount,
        date: date.toLocaleDateString(),
      });

      setIsSubmitting(true);

      await fetch(
        "https://dummyapp-hunter456-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userDetail,
            orderedItems: ctx.items,
          }),
        }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      setUserDetail({});
      ctx.clearCart();
    } else {
      return <p>Payment Unsucessfull</p>;
    }
  };
  const paymentModalClose = () => {
    setIsCardPayment((prevState) => {
      return !prevState;
    });
  };

  const cartItem = (
    <ul className={classes.cartItems}>
      {ctx.items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );

  const cartModel = (
    <Modal onClose={props.onClose}>
      {ctx.items.length > 0 ? (
        cartItem
      ) : (
        <h3 style={{ margin: "1rem", color: "#000" }}>
          You Haven't Place any Order Yet
        </h3>
      )}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && !isCardPayment && (
        <CheckoutForm onClose={props.onClose} onSubmit={orderItem} />
      )}

      {isCardPayment && (
        <Payment
          close={paymentModalClose}
          onClose={props.onClose}
          onSubmit={paymentConfirm}
        />
      )}
      {!isCheckOut && (
        <div className={classes.actions}>
          <button onClick={props.onClose}>Close</button>
          {ctx.items.length > 0 && <button onClick={checkOut}>Order</button>}
        </div>
      )}
    </Modal>
  );

  const orderingItems = <p>Ordering Item</p>;
  const ordered = (
    <Modal>
      <section className={classes.ordered}>
        <p>Item Ordered</p>
        <button onClick={props.onClose}>Close</button>
      </section>
    </Modal>
  );

  return (
    <>
      {!didSubmit && !isSubmitting && cartModel}
      {isSubmitting && orderingItems}
      {!isSubmitting && didSubmit && ordered}
    </>
  );
};

export default Cart;
