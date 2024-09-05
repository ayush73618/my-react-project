import React from "react";
import classes from "./Style.module.css";

const ViewrecipeItem = (props) => {
  //Fetch All recipeItems Through Props
  const recipeItem = props.item;

  console.log(recipeItem.totalNutrients);

  return (
    <>
      {
        // Backdrop Element for Blur BackGround
      }
      <div className={classes.backDrop} onClick={props.onClose}></div>
      {
        //Modal Pop- Up for Viewing Items
      }
      <div className={classes.modal}>
        <div className="img">
          <img src={recipeItem.image} alt="" width="200px" height="200px" />
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <td>Name</td>
              <td>{recipeItem.label}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calorie's</td>
              <td>{recipeItem.calories}</td>
            </tr>
            <tr>
              <td>Cuisine Type</td>
              <td>
                {recipeItem.cuisineType.map((res) => (
                  <li>{res}</li>
                ))}
              </td>
            </tr>
            <tr>
              <td>Diet's Lables</td>
              <td>
                {recipeItem.dietLabels.map((res) => (
                  <li>{res}</li>
                ))}
              </td>
            </tr>
            <tr>
              <td>Type Of Dish</td>
              <td>{recipeItem.dishType.map((res) => res)}</td>
            </tr>
            <tr>
              <td>Ingredients</td>
              <td>
                {recipeItem.ingredientLines.map((res) => (
                  <li>{res}</li>
                ))}
              </td>
            </tr>
            <tr>
              <td>TotalNutrients</td>
              <td>
                <li>
                  {`${recipeItem.totalNutrients.ENERC_KCAL.label} = 
                  ${recipeItem.totalNutrients.ENERC_KCAL.quantity}
                  ${recipeItem.totalNutrients.ENERC_KCAL.unit}`}
                </li>
                <li>
                  {`${recipeItem.totalNutrients.FAT.label} = 
                  ${recipeItem.totalNutrients.FAT.quantity}
                  ${recipeItem.totalNutrients.FAT.unit}`}
                </li>
                <li>
                  {`${recipeItem.totalNutrients.FASAT.label} = 
                  ${recipeItem.totalNutrients.FASAT.quantity}
                  ${recipeItem.totalNutrients.FASAT.unit}`}
                </li>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewrecipeItem;
