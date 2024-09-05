import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  //useState for password
  const [password, setPassword] = useState();

  //useState for userName
  const [userName, setUserName] = useState();

  //useNavigate to another page
  const nav = useNavigate();

  //PasswordHandler to set the the password on each change
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  //UserHandler to set the userId on each change
  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  //onSubmit it will check for Id password and according to it it will navigate or toast the message
  const onsubmitHandler = (event) => {
    event.preventDefault();
    if (userName === "Best4U" && password === "Best4U") {
      localStorage.setItem("user", true);

      nav("/");
      toast.info("Welcome to Best4U");
    } else {
      toast.error("Something wrong with User Name Or Password");
    }
  };

  return (
    <div className={classes.login}>
      <ToastContainer />
      <h1>Best4U</h1>
      <form>
        <input
          type="text"
          placeholder="Enter Your User Name"
          onChange={userNameHandler}
          className="form-control m-2"
          value={userName}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={passwordHandler}
          className="form-control m-2"
          value={password}
        />
        <button
          type="button"
          onClick={onsubmitHandler}
          className="btn btn-primary"
        >
          Login
        </button>
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "darkblue",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          If You are new Register Here
        </Link>
      </form>
    </div>
  );
};

export default Login;
