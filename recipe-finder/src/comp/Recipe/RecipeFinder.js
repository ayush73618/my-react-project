import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import classes from "./RecipeItem.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RecipeFinder = () => {
  const [data, setData] = useState();

  //apiKeys for fetchdata
  const apiKeys = "7f710d9ee9f4cd6d5ac7512f6d6f81d9";
  //same use as apikeys is apiId
  const apiId = "d437302b";

  //searchValue what we have searching
  const [searchValue, setSearchValue] = useState("");

  //Loading state when we are searching any data then it will show Loading spinner
  const [isLoading, setIsLoading] = useState(false);

  //searchedItem will record all item searched till time and show it if we refresh our page
  const [searchedItem, setSearchedItem] = useState([]);

  //If we have searched and we refresh our page then we will save those item to this searchedItem
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("searchedItem")));
    if (localStorage.getItem("searchedItem")) {
      setSearchedItem(JSON.parse(localStorage.getItem("searchedItem")));
    }
  }, []);

  //FetchApi will called when we click on serch button to fetch data and set it to data
  const fetchApi = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${searchValue}&app_id=${apiId}&app_key=${apiKeys}`
    );

    //getData from the link
    // if Something went Wrong
    if (!response.ok) {
      toast.error("Something Went Wrong");
      setIsLoading(false);
    }
    //otherwise set the data and show it to the display page
    else {
      const data = await response.json();
      setData(data.hits);
      console.log(data);
      setIsLoading(false);
    }
  };

  //searchHandler for each searching of out page
  const searchValueHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const onSearch = () => {
    //If value is null then it will show the warning
    if (searchValue.length === 0) {
      toast.warning("Search Field Can't be Empty");
      setData();
    }
    //fetch item and set the searched Item and also set the localStorage
    else {
      setSearchedItem((prevItem) => [...prevItem, searchValue]);
      localStorage.setItem("searchedItem", JSON.stringify(searchedItem));
      fetchApi();
    }
  };

  //We also have Refresh item so that we can refresh the last searched Item
  const refreshItem = () => {
    if (searchValue.length === 0) {
      toast.info("Please Enter Something to search");
      setData();
    } else {
      fetchApi();
    }
  };

  //If we Click on Listed Item of searched value then it will set it to search value
  const searchFromList = (event) => {
    setSearchValue(event.target.innerHTML);
  };
  return (
    <div className={classes.container}>
      <ToastContainer />
      <input
        type="text"
        onChange={searchValueHandler}
        placeholder="Search Here"
        value={searchValue}
      />
      <button type="Submit" onClick={onSearch} className="btn btn-primary">
        Search
      </button>
      <button type="button" onClick={refreshItem} className="btn btn-info">
        Refresh
      </button>
      <div style={{ marginTop: "2rem" }}>
        <h3>Your Searches</h3>
        <ul>
          {searchedItem.map((map) => (
            <>
              <li onClick={searchFromList}>{map}</li>
            </>
          ))}
        </ul>
      </div>
      {
        //Show Data here
      }
      {data && !isLoading && <RecipeList data={data} />}

      {
        //Loading Handler
      }
      {isLoading && (
        <section className={classes.loading}>
          <span className={classes.loadSpin}></span>
          <p> Please Wait while Loading......</p>
        </section>
      )}
    </div>
  );
};

export default RecipeFinder;
