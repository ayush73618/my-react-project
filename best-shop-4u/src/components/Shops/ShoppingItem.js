import classes from "./ShoppingItem.module.css";
const ShoppingItem = (props) => {
  const price = `Rs. ${props.item.price}`;

  const showHandler = () => {
    props.showDetail(props.item);
  };

  console.log(props.item.img);
  return (
    <div className={classes.details}>
      <img src={props.item.img} alt="Laptop Images" className={classes.image} />
      <div className={classes.detail}>
        <div className={classes.model}>{props.item.model}</div>

        <div className={classes.price}>{price}</div>
      </div>
      <button className={classes.button} onClick={showHandler}>
        View
      </button>
    </div>
  );
};

export default ShoppingItem;
