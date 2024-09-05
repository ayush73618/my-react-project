import classes from "./OrderItem.module.css";
const OrderItem = (props) => {
  const price = `Rs. ${props.order.price}`;
  return (
    <section className={classes.display}>
      <div>
        <span>{props.order.company} </span>
        <span>{props.order.model}</span>
      </div>
      <span> {props.order.amount}</span>
      <span> {price}</span>
    </section>
  );
};
export default OrderItem;
