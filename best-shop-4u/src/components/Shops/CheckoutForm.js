import React, { useState } from "react";
import { useRef } from "react";
import Modal from "../UI/Modal";
import classes from "./CheckoutForm.module.css";
const isEmpty = (value) => value.trim() === "" && value.length <= 2;
const isSixCharacter = (value) => value.trim().length === 6;
const CheckoutForm = (props) => {
  const name = useRef();
  const address = useRef();
  const city = useRef();
  const state = useRef();
  const pin = useRef();

  const [formValueValid, setFormValueValid] = useState({
    name: true,
    address: true,
    city: true,
    state: true,
    pin: true,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const nameValue = name.current.value;
    const addressValue = address.current.value;
    const cityValue = city.current.value;
    const stateValue = state.current.value;
    const pinValue = pin.current.value;

    const nameIsValid = !isEmpty(nameValue);
    const addressIsValid = !isEmpty(addressValue);
    const cityIsValid = !isEmpty(cityValue);
    const stateIsValid = !isEmpty(stateValue);
    const pinIsValid = isSixCharacter(pinValue);

    setFormValueValid({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
      state: stateIsValid,
      pin: pinIsValid,
    });

    const formIsValid =
      nameIsValid &&
      addressIsValid &&
      cityIsValid &&
      stateIsValid &&
      pinIsValid;
    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: nameValue,
      address: addressValue,
      city: cityValue,
      state: stateValue,
      pin: pinValue,
    });

    props.onSubmit({
      name: nameValue,
      address: addressValue,
      city: cityValue,
      state: stateValue,
      pin: pinValue,
    });
  };
  return (
    <Modal onClose={props.onClose}>
      <form action="" className={classes.form} onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formValueValid.name ? "" : classes.error
          }`}
        >
          <label htmlFor="name">Name</label>
          <input ref={name} type="text" id="name" />
        </div>

        <div
          className={`${classes.control} ${
            formValueValid.address ? "" : classes.error
          }`}
        >
          <label htmlFor="address">Address</label>
          <input ref={address} type="text" id="address" />
        </div>
        <div
          className={`${classes.control} ${
            formValueValid.city ? "" : classes.error
          }`}
        >
          <label htmlFor="city">City</label>
          <input ref={city} type="text" id="city" />
        </div>
        <div
          className={`${classes.control} ${
            formValueValid.state ? "" : classes.error
          }`}
        >
          <label htmlFor="state">State</label>
          <input ref={state} type="text" id="state" />
        </div>
        <div
          className={`${classes.control} ${
            formValueValid.pin ? "" : classes.error
          }`}
        >
          <label htmlFor="pin">Pin</label>
          <input ref={pin} type="number" id="pin" pattern="[0-9]{6}" />
        </div>

        <div className={classes.actions}>
          <button onClick={props.onClose}>Close</button>
          <button>Proceed to Payment</button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
