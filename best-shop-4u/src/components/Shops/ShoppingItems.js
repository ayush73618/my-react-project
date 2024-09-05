import React, { useMemo, useState } from "react";
import Card from "../UI/Card";
import ItemDetail from "./ItemDetail";
import ShoppingItem from "./ShoppingItem";
import classes from "./ShoppingItems.module.css";

// const dummy_list = [
//   {
//     id: "i1",
//     type: "laptop",
//     company: "Hp",
//     model: "Pavalion 15",
//     ram: "8GB",
//     isTouchScreen: "No",
//     storage: "512GB SSD",
//     img: "./Asset/img/laptop/1.jpg",
//     price: 139000,
//   },
//   {
//     id: "i2",
//     type: "laptop",
//     company: "Asus",
//     model: "Zenbook Pro",
//     ram: "8GB",
//     isTouchScreen: "No",
//     storage: "1TB SSD",
//     img: "./Asset/img/laptop/2.jpg",
//     price: 139000,
//   },
//   {
//     id: "i3",
//     type: "laptop",
//     company: "Apple",
//     model: "macbook Pro",
//     ram: "8GB",
//     isTouchScreen: "No",
//     storage: "256GB SSD",
//     img: "./Asset/img/laptop/4.jpg",
//     price: 139000,
//   },
//   {
//     id: "i4",
//     type: "laptop",
//     company: "Dell",
//     model: "Inspiron",
//     ram: "16GB",
//     isTouchScreen: "Yes",
//     storage: "512gb SSD",
//     img: "./Asset/img/laptop/5.png",
//     price: 139000,
//   },
//   {
//     id: "i5",
//     type: "laptop",
//     company: "Hp",
//     model: "Spectre x360",
//     ram: "16GB",
//     isTouchScreen: "Yes",
//     storage: "512gb SSD",
//     img: "./Asset/img/laptop/1.jpg",
//     price: 139000,
//   },
//   {
//     id: "i6",
//     type: "mobiles",
//     company: "Hp",
//     model: "Pavalion 15",
//     ram: "8GB",
//     isTouchScreen: "No",
//     storage: "512GB SSD",
//     img: "./Asset/img/laptop/1.jpg",
//     price: 139000,
//   },
// ];

const ShoppingItems = () => {
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState("laptop");
  const [sortBy, setSortBy] = useState("");
  const [showItemDetail, setShowItemDetail] = useState();
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const onClose = () => {
    setShowItemDetail();
  };
  const showDetail = (item) => {
    setShowItemDetail(item);
  };

  const typeChangeHandler = (event) => {
    setTypes(event.target.value);
  };

  const sortByHandler = (event) => {
    setSortBy(event.target.value);
  };
  useState(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://dummyapp-hunter456-default-rtdb.firebaseio.com/items.json"
      );

      if (!response.ok) {
        throw new Error("Site Not Working Properly.... Something Went Wrong");
      }

      const responseData = await response.json();

      if (responseData === null) {
        throw new Error(
          "Something not working properly Please comeback after some time"
        );
      }
      const loadedItems = [];

      for (const key in responseData) {
        loadedItems.push({
          id: key,
          ...responseData[key],
        });
      }

      setItems(loadedItems);
      setIsLoading(false);
    };

    fetchItems().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  let shopfilter = useMemo(
    () => items.filter((item) => item.type === types),
    [items, types]
  );

  if (sortBy === "High to Low") {
    shopfilter = shopfilter.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "Low to High") {
    shopfilter = shopfilter.sort((a, b) => a.price - b.price);
  }

  if (loading) {
    return (
      <Card>
        <section className={classes.loading}>
          <span className={classes.loadSpin}></span>
          <p> Please Wait while Loading......</p>
        </section>
      </Card>
    );
  }

  if (error) {
    return (
      <section className={classes.error}>
        <Card>{error}</Card>
      </section>
    );
  }

  const shopList = shopfilter.map((item) => (
    <ShoppingItem key={item.id} item={item} showDetail={showDetail} />
  ));
  return (
    <>
      <Card>
        <section className={classes.select}>
          <h4>Choose Any One For your Use</h4>
          <div>
            <select
              name="types"
              id="types"
              onChange={typeChangeHandler}
              value={types}
            >
              <option value="laptop">Laptops</option>
              <option value="mobile">Mobiles</option>
            </select>

            <select
              name="sort"
              id="sort"
              onChange={sortByHandler}
              value={sortBy}
            >
              <option value="">Sort by</option>
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
          </div>
        </section>
        {shopList}
      </Card>
      {showItemDetail && <ItemDetail item={showItemDetail} onClose={onClose} />}
    </>
  );
};

export default ShoppingItems;
