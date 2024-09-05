import React from "react";
import RecipeItem from "./RecipeItem";
import classes from "./RecipeItem.module.css";

//List Down all Recipe Item
const RecipeList = (props) => {
  //Use Map for Multiple Data so that we can use it for larger data
  return (
    <>
      <div className={classes.show}>
        {props.data.map((map) => (
          <div key={map.recipe.label}>
            <RecipeItem data={map.recipe} />
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeList;
