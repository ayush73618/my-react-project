import OrderItem from "./OrderItem";
import classes from "./OrderItems.module.css";
const OrderItems = (props) => {
  const item = (
    <li className={classes.orderList}>
      {props.orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </li>
  );
  return (
    <div>
      {item}
      <div className={classes.orderAmount}>
        <span>Order Amount :</span>
        <span>{`Rs. ${props.orderAmount}`}</span>
        <span>Order Date: </span> <span>{props.date}</span>
      </div>
    </div>
  );
};

export default OrderItems;
