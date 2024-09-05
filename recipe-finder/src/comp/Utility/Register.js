import React, { useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  //UseState use for setting user and password
  const [registerUser, setRegisterUser] = useState();
  const [pass, setPass] = useState();

  const nav = useNavigate();

  //set password at each change in input element
  const passHandler = (event) => {
    setPass(event.target.value);
  };

  //Set username at each change in input element
  const registerUserHandler = (event) => {
    setRegisterUser(event.target.value);
  };

  //While Submit the Register Form it will check for username and password it it's correct or not
  const onsubmitHandler = (event) => {
    event.preventDefault();
    //If login SuccessFull then set the local storage and navigate to home page and toast welcome message
    if (registerUser === "Admin" && pass === "Password") {
      localStorage.setItem("user", true);
      nav("/");
      toast.info("Welcome ");
    }
    //If There is an Error then toast the Error message
    else {
      toast.error("User Name Or Password Does not Match");
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      <h2>Join Best4U</h2>
      <form onSubmit={onsubmitHandler}>
        <input
          type="text"
          placeholder="Enter UserName"
          onChange={registerUserHandler}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={passHandler}
          required
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
