import React, { useState } from "react";
import Input from "./Input";
import classes from "./SignUp.module.css";
import Modal from "../utilities/Modal";
import { useDispatch } from "react-redux";

import { signup } from "../Store/login-signup-url";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredMobileNo, setEnteredMobileNo] = useState("");
  const [enteredPassword, setEnteredPassowrd] = useState("");

  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isMobileNoTouched, setIsMobileNoTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouced] = useState(false);

  const isFirstNameValid = enteredFirstName.length >= 3 && isFirstNameTouched;
  const isFirstNameHasError = enteredFirstName.length < 3 && isFirstNameTouched;

  const isLastNameValid = enteredLastName.length > 3 && isLastNameTouched;
  const isLastNameHasError = enteredLastName.length < 3 && isLastNameTouched;

  const isMobileNoValid = enteredMobileNo.length === 10 && isMobileNoTouched;
  const isMobileNoHasError =
    (enteredMobileNo.length < 10 || enteredMobileNo.length > 10) &&
    isMobileNoTouched;

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,})$/;

  const isEmailValid = emailRegex.test(enteredEmail) && isEmailTouched;
  const isEmailHasError = !emailRegex.test(enteredEmail) && isEmailTouched;

  const isPasswordValid = enteredPassword.length > 6 && isPasswordTouched;
  const isPasswordHasError = enteredPassword.length <= 6 && isPasswordTouched;
  const onFirstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const onLastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const onMobileNoChangeHandler = (event) => {
    setEnteredMobileNo(event.target.value);
  };

  const onEmailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setEnteredPassowrd(event.target.value);
  };

  const onFirstNameBlurHandler = () => {
    setIsFirstNameTouched(true);
  };
  const onLastNameBlurHandler = () => {
    setIsLastNameTouched(true);
  };

  const onMobileNoBlurHandler = () => {
    setIsMobileNoTouched(true);
  };
  const onEmailBlurHandler = () => {
    setIsEmailTouched(true);
  };

  const onPasswordBlurHandler = () => {
    setIsPasswordTouced(true);
  };

  //Show Images;

  let formIsValid =
    isFirstNameValid &&
    isLastNameValid &&
    isMobileNoValid &&
    isEmailValid &&
    isPasswordValid;
  const onSignup = (event) => {
    event.preventDefault();
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isMobileNoValid &&
      isEmailValid &&
      isPasswordValid
    ) {
      formIsValid = true;
      fetch(`http://localhost:8080/users/${enteredEmail}`)
        .then((res) => res.text())
        .then((data) => {
          console.log(data);
          if (data === "") {
            dispatch(
              signup({
                firstName: enteredFirstName,
                lastName: enteredLastName,
                email: enteredEmail,
                mobileNo: enteredMobileNo,
                password: enteredPassword,
              })
            );
            navigate("..");
          } else {
          }
        });
    }
  };

  const onClose = () => {
    navigate("/");
  };

  const showLoginModal = () => {
    navigate("/login");
  };
  return (
    <Modal onClose={onClose}>
      <button
        className={classes["close-button"]}
        onClick={onClose}
        title="close"
      >
        <i className="fa-solid fa-x"></i>
      </button>
      <div className={classes.signUp}>
        <h3>Join Us</h3>
        <form>
          <Input
            label="First Name"
            type="text"
            value={enteredFirstName}
            onChange={onFirstNameChangeHandler}
            onBlur={onFirstNameBlurHandler}
            hasError={isFirstNameHasError}
          />
          <Input
            label="Last Name"
            type="text"
            value={enteredLastName}
            onChange={onLastNameChangeHandler}
            onBlur={onLastNameBlurHandler}
            hasError={isLastNameHasError}
          />
          <Input
            label="Mobile Number"
            type="number"
            value={enteredMobileNo}
            onChange={onMobileNoChangeHandler}
            onBlur={onMobileNoBlurHandler}
            hasError={isMobileNoHasError}
          />
          <Input
            label="Enter Your Email"
            type="email"
            value={enteredEmail}
            onChange={onEmailChangeHandler}
            onBlur={onEmailBlurHandler}
            hasError={isEmailHasError}
          />
          <Input
            label="Enter Your Password"
            type="password"
            value={enteredPassword}
            onChange={onPasswordChangeHandler}
            onBlur={onPasswordBlurHandler}
            hasError={isPasswordHasError}
          />

          <div className={classes.button}>
            <button
              className={classes.signUpButton}
              disabled={!formIsValid ? "disabled" : ""}
              onClick={onSignup}
            >
              Sign Up
            </button>
          </div>

          <h4 className={classes.h4}>
            Already Have an Account{" "}
            <button
              className={classes["go-to-login-page"]}
              onClick={showLoginModal}
            >
              Login
            </button>{" "}
            Here
          </h4>
        </form>
      </div>
    </Modal>
  );
};

export default SignUp;
