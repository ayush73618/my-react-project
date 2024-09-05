import React from "react";
import classes from "./Login.module.css";
import Input from "../UI/Input";
import { useState } from "react";
import LoginModal from "./LoginModal";
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const emailIsValid = enteredEmail.includes("@") && isEmailTouched;
  const passwordIsValid = enteredPassword.length >= 6 && isPasswordTouched;

  const emailHasError = !enteredEmail.includes("@") && isEmailTouched;
  const passwordHasError = enteredPassword.length < 6 && isPasswordTouched;

  let formIsValid = emailIsValid && passwordIsValid;
  if (enteredEmail.includes("@") && enteredPassword.length >= 6) {
    formIsValid = true;
  }

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailBlurHandler = () => {
    setIsEmailTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passwordBlurHandler = () => {
    setIsPasswordTouched(true);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      setEnteredEmail("");
      setEnteredPassword("");
      setIsEmailTouched(false);
      setIsPasswordTouched(false);

      sessionStorage.setItem("isLoggedIn", "true");

      props.isActiveHandler();
      props.onClose();
    }
  };

  return (
    <LoginModal onClose={props.onClose}>
      <div className={classes.login}>
        <h3>Welcome Back</h3>
        <form onSubmit={onSubmitHandler} autoComplete="OFF">
          <Input
            label="Enter Email"
            value={enteredEmail}
            type="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            hasError={emailHasError}
          />

          <Input
            label="Enter Password"
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            hasError={passwordHasError}
          />
          <div>
            <input type="checkbox" />
            Keep Me Logged In
          </div>

          <div className={classes.button}>
            <button className={classes.closebutton} onClick={props.onClose}>
              Close
            </button>
            <button
              className={classes.loginbutton}
              disabled={formIsValid ? "" : "disabled"}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </LoginModal>
  );
};

export default React.memo(Login);
