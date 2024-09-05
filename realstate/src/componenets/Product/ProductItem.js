import React from "react";
import classes from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../Store/product";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const data = props.data;
  const addToWishlistHandler = () => {
    dispatch(
      productActions.save({
        societyName: data.societyName,
        area: data.area,
        place: data.place,
        noOfBedroom: data.noOfBedroom,
        noOfBathroom: data.noOfBathroom,
        locality: data.locality,
        sellerId: data.sellerId,
        buyerId: data.buyerId,
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes["list-item"]}>
        <h2>{data.societyName}</h2>
        <p>
          <strong>Area:</strong> {data.area}
        </p>
        <p>
          <strong>Place:</strong> {data.place}
        </p>
        <p>
          <strong>No Of Bedrooms:</strong> {data.noOfBedroom}
        </p>
        <p>
          <strong>No Of Bathrooms:</strong> {data.noOfBathroom}
        </p>
        <p>
          <strong>Locality:</strong> {data.locality}
        </p>
        <p>
          <strong>Seller ID:</strong> {data.sellerId}
        </p>
        <p>
          <strong>Buyer ID:</strong> {data.buyerId}
        </p>
        {isLoggedIn && (
          <button className={classes.button} onClick={addToWishlistHandler}>
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
