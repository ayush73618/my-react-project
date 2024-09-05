import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../Store/cart-context";
import classes from "./ItemDetail.module.css";
const ItemDetail = (props) => {
  const ctx = useContext(CartContext);

  const addItem = () => {
    ctx.addToCart({
      id: props.item.id,
      company: props.item.company,
      model: props.item.model,
      price: props.item.price,
      amount: 1,
      quantityPrice: props.item.price,
    });

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.show}>
        <img src={props.item.img} alt="laptop" className={classes.image} />
        <hr />
        <div>
          <p style={{ color: "#000" }}>{props.item.description}</p>
        </div>

        <div className={classes.details}>
          <h3
            style={{
              color: "#000",
              fontWeight: "bold",
              textAlign: "center",
              margin: "1rem",
            }}
          >
            Other Details
          </h3>
          <table>
            <tbody>
              <tr>
                <td>Company Name</td>
                <td>{props.item.company}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{props.item.model}</td>
              </tr>
              <tr>
                <td>TouchScreen</td>
                <td>{props.item.isTouchScreen}</td>
              </tr>
              <tr>
                <td>RAM</td>
                <td>{props.item.ram}</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>{props.item.storage}</td>
              </tr>
              <tr>
                <td>Price:- Rs.{props.item.price}</td>
                <td>
                  <button className={classes.button} onClick={addItem}>
                    Add To Cart
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};
export default ItemDetail;
