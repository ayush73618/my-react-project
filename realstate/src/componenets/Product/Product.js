import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./Product.module.css";
import { productActions } from "../Store/product";
import ProductItem from "./ProductItem";
const Product = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/products`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const addToWishlistHandler = () => {
    dispatch(productActions.save({}));
  };

  return (
    <>
      {data.map((data) => (
        <ProductItem
          key={data.product_id}
          data={data}
          onClick={addToWishlistHandler}
        />
      ))}
    </>
  );
};

export default Product;
