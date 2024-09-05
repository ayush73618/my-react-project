import { useContext } from "react";
import OrderContext from "../Store/order-context";
import Modal from "./Modal";
import OrderItems from "./OrderItems";
import classes from "./MyOrder.module.css";
import { useId } from "react";

const MyOrder = (props) => {
  const orderctx = useContext(OrderContext);
  const id = useId();

  const item = (
    <ul className={classes.orderItems}>
      {orderctx.orders.map((order) => (
        <OrderItems
          key={Math.random()}
          orders={order.order}
          date={order.date}
          orderAmount={order.orderAmount}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      <div>
        {orderctx.orders.length > 0 ? (
          <div>
            <h4>Order History</h4>
            {item}
          </div>
        ) : (
          <h2>No Order to Show</h2>
        )}
      </div>
    </Modal>
  );
};

export default MyOrder;
