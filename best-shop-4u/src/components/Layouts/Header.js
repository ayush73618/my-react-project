import React, { useState, useEffect, useCallback } from "react";
import Login from "../USERLOGIN/Login";
import CartButton from "./CartButton";
import classes from "./Header.module.css";

import { GiHamburgerMenu } from "react-icons/gi";

import MyOrder from "../UI/MyOrder";
const Header = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [showmedia, setShowMedia] = useState(false);
  const [orderModel, setOrderModel] = useState(false);
  const [windowsDimension, setWindowsDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const loginCloseHandler = () => {
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const userActiveHandler = () => {
    if (isActive) {
      setIsActive(false);
      sessionStorage.clear();
    } else {
      setIsActive(true);
    }
  };

  const myOrderHandler = useCallback(() => {
    setOrderModel((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn")) {
      setIsActive(true);
    }
  }, []);

  const detectSize = () => {
    setWindowsDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    if (windowsDimension.innerWidth < 850) {
      setShowMedia(true);
    } else {
      setShowMedia(false);
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowsDimension]);

  return (
    <>
      <nav className={classes.nav}>
        <h3 className={classes.logo}>BestSHOP4U</h3>

        <div className={classes.search}>
          <input type="text" placeholder="Search here" />
          <button>
            <i className="fas fa-search "></i>
          </button>
        </div>
        <ul
          className={
            !showmedia ? classes.links : `${classes.links} ${classes.hamLink}`
          }
        >
          <li>
            <a href="/">
              <i className="fas fa-house"></i>
              Home
            </a>
          </li>
          {isActive && (
            <li className={classes.dropdown}>
              <i className="fas fa-user"> </i> My Account
              <span className={classes.rotate}>
                <i className="fas fa-angle-down"></i>
              </span>
              <ul className={classes.dropdownmenu}>
                <li>My Profiles</li>
                <li>
                  <button onClick={myOrderHandler}>My Orders</button>
                </li>
                <li>Help</li>
              </ul>
            </li>
          )}

          {isActive && (
            <li>
              <CartButton onClick={props.onCart} />
            </li>
          )}
          <li>
            {!isActive && <button onClick={loginHandler}>Login</button>}
            {isActive && <button onClick={userActiveHandler}>Logout</button>}
          </li>
        </ul>

        <div className={classes["hamburger-menu"]}>
          <button
            onClick={() => {
              setShowMedia(!showmedia);
            }}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>
      {isLoggedIn && (
        <Login
          onClose={loginCloseHandler}
          isActiveHandler={userActiveHandler}
        />
      )}

      {orderModel && <MyOrder onClose={myOrderHandler} />}
    </>
  );
};

export default Header;
