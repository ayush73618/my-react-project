import React, { useState } from "react";
import classes from "./RecipeItem.module.css";
import ViewItem from "./ViewItem";
const RecipeItem = (props) => {
  //Item getting from props items
  const item = props.data;

  //UseState for items setup
  const [items, setItems] = useState();

  //Clode the Open Modal
  const onClose = () => {
    setItems();
  };

  //To View Items
  const viewItem = () => {
    setItems(item);
  };

  return (
    <>
      <div className={classes.showItems}>
        <div className={classes.box}>
          <img src={item.image} alt="Img" />
        </div>
        <p style={{ textAlign: "center" }}>{item.label}</p>
        <button type="button" onClick={viewItem} className="btn btn-primary">
          Show Item
        </button>
      </div>
      {items && <ViewItem item={items} onClose={onClose} />}
    </>
  );
};

export default RecipeItem;
