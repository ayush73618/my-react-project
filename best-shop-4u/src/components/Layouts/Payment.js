import Modal from "../UI/Modal";
import classes from "./Payment.module.css";
const Payment = (props) => {
  const paymentConfirmation = (event) => {
    event.preventDefault();
    props.onSubmit(true);
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.back}></div>
      <form onSubmit={paymentConfirmation}>
        <div className={classes.paymentControl}>
          <label htmlFor="name">Card Holder's Name</label>
          <input type="text" id="name" />
        </div>
        <div className={classes.paymentControl}>
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" />
        </div>
        <div className={classes.paymentControl}>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input type="date" id="expiryDate" />
        </div>
        <div className={classes.paymentControl}>
          <label htmlFor="cvv">CVV</label>
          <input type="number" pattern="[0-9]{3}" />
        </div>

        <div className={classes.actions}>
          <button onClick={props.onClose}>Close</button>
          <button>Proceed to Payment</button>
        </div>
      </form>
    </Modal>
  );
};

export default Payment;
