import React from "react";
import { useSelector } from "react-redux";
import classes from "./Product.module.css";

const WishListData = () => {
  const data = useSelector((state) => state.productReducer.wishlist);

  if (data == null) {
    return <p>Nothing to Show</p>;
  }
  return (
    <>
      {data.map((data) => (
        <div key={data.product_id} className={classes.container}>
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
          </div>
        </div>
      ))}
    </>
  );
};

export default WishListData;
