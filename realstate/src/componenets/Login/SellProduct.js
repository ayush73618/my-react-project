import React, { useEffect, useState } from "react";
import Input from "./Input";
import classes from "./SellProduct.module.css";
import { useNavigate } from "react-router-dom";

const SellProduct = () => {
  const [societyName, setSocietyName] = useState("");
  const [isSocietyNameTouched, setIsSocietyNameTouched] = useState(false);
  const [place, setPlace] = useState("");
  const [isPlaceTouched, setIsPlaceTouched] = useState(false);
  const [area, setArea] = useState("");

  const [isAreaTouched, setIsAreaTouched] = useState(false);
  const [noOfBedroom, setNoOfBedroom] = useState("");
  const [isNoOfBedroomTouched, setIsNoOfBedroomTouched] = useState(false);
  const [noOfBathroom, setNoOfBathroom] = useState("");

  const [isNoOfBathroomTouched, setIsNoOfBathroomTouched] = useState(false);
  const [locality, setLocality] = useState("");

  const [isLocalityTouched, setIsLocalityTouched] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const isSocietyHasError = societyName.length <= 5 && isSocietyNameTouched;
  const isAreaHasError = area.length <= 2 && isAreaTouched;
  const isPlaceHasError = place.length <= 2 && isPlaceTouched;
  const isNoOfBedroomHasError = noOfBedroom === 0 && isNoOfBedroomTouched;
  const isNoOfBathroomHasError = noOfBathroom === 0 && isNoOfBathroomTouched;
  const isLocalityHasError = locality.length < 15 && isLocalityTouched;

  const societyNameHandler = (event) => {
    setSocietyName(event.target.value);
  };

  const placeHandler = (event) => {
    setPlace(event.target.value);
  };

  const areaHandler = (event) => {
    setArea(event.target.value);
  };

  const noOfBedroomHandler = (event) => {
    setNoOfBedroom(event.target.value);
    console.log(noOfBedroom);
  };

  const noOfBathroomHandler = (event) => {
    setNoOfBathroom(event.target.value);
    console.log(noOfBathroom);
  };

  const localityHandler = (event) => {
    setLocality(event.target.value);
    console.log(locality);
  };

  const societyNameBlurHandler = () => {
    setIsSocietyNameTouched(true);
  };

  const areaNameBlurHandler = () => {
    setIsAreaTouched(true);
  };

  const placeNameHandler = () => {
    setIsPlaceTouched(true);
  };

  const noOfBedroomBlurHandler = () => {
    setIsNoOfBedroomTouched(true);
  };

  const noOfBathroomBlurHandler = () => {
    setIsNoOfBathroomTouched(true);
  };

  const localityBlurHandler = () => {
    setIsLocalityTouched(true);
  };

  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:8080/products", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json, text/plain",
  //         "Content-Type": "application/json;charset=UTF-8",
  //       },
  //       body: JSON.stringify({
  //         societyName: societyName,
  //         place: place,
  //         area: area,
  //         noOfBedroom: noOfBedroom,
  //         noOfBathroom: noOfBathroom,
  //         locality: locality,
  //         sellerId: user.id,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("User Not Found");
  //     } else {
  //       navigate("..");
  //     }

  //     // const userData = response.json();
  //     // return userData;
  //   };

  const postthisflat = (event) => {
    event.preventDefault();
    console.log(
      JSON.parse(
        JSON.stringify({
          societyName: societyName,
          area: area,
          place: place,
          noOfBedroom: +noOfBedroom,
          noOfBathroom: +noOfBathroom,
          locality: locality,
          sellerId: user.user_id,
          buyerId: 0,
        })
      )
    );
    const product = JSON.stringify({
      societyName: societyName,
      area: area,
      place: place,
      noOfBedroom: +noOfBedroom,
      noOfBathroom: +noOfBathroom,
      locality: locality,
      sellerId: user.user_id,
      buyerId: 0,
    });
    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: product,
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("Something Went Wrong");
        } else {
          navigate("..");
        }
      })
      .then((data) => {});
  };

  return (
    <div className={classes["centered-container"]}>
      <form className={classes["form-container"]}>
        <Input
          label="Enter Society Name"
          value={societyName}
          type="text"
          onChange={societyNameHandler}
          onBlur={societyNameBlurHandler}
          hasError={isSocietyHasError}
        />
        <Input
          label="Enter Area"
          value={area}
          type="text"
          onChange={areaHandler}
          onBlur={areaNameBlurHandler}
          hasError={isAreaHasError}
        />
        <Input
          label="Enter Place"
          value={place}
          type="text"
          onChange={placeHandler}
          onBlur={placeNameHandler}
          hasError={isPlaceHasError}
        />
        <Input
          label="Enter No Of Bedroom"
          value={noOfBedroom}
          type="number"
          onChange={noOfBedroomHandler}
          onBlur={noOfBedroomBlurHandler}
          hasError={isNoOfBedroomHasError}
        />
        <Input
          label="Enter No Of BathRoom"
          value={noOfBathroom}
          type="number"
          onChange={noOfBathroomHandler}
          onBlur={noOfBathroomBlurHandler}
          hasError={isNoOfBathroomHasError}
        />
        <Input
          label="Enter Locality"
          value={locality}
          type="text"
          onChange={localityHandler}
          onBlur={localityBlurHandler}
          hasError={isLocalityHasError}
        />

        <button className={classes.sellButton} onClick={postthisflat}>
          Post This One
        </button>
      </form>
    </div>
  );
};

export default SellProduct;
