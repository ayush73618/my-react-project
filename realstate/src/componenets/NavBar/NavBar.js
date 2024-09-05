import React, { useEffect, useState } from "react";
import classes from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../Store/login";

import { Link, useNavigate } from "react-router-dom";
import WishList from "../utilities/WishList";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const loggedUser = useSelector((state) => state.loginReducer.loggedUser);
  const navigate = useNavigate();
  const [showHamLink, setShowHamLink] = useState(false);
  const [windowsDimension, setWindowsDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const showHamLinks = () => {
    setShowHamLink((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const showLoginModal = () => {
    setShowHamLink(false);
  };

  const logout = () => {
    dispatch(loginActions.logout());

    navigate("/");
  };

  const detectSize = () => {
    setWindowsDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    if (windowsDimension.innerWidth < 850) {
      setShowHamLink(true);
    } else {
      setShowHamLink(false);
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowsDimension]);

  return (
    <>
      <div
        className={!showHamLink ? "" : classes.backDrop}
        onClick={showHamLinks}
      ></div>
      <nav className={classes.nav}>
        <div className={classes["logo-div"]}>
          <Link to="/">
            <h2 className={classes.logo}>Real State</h2>
          </Link>
        </div>
        <div className={classes["hamburger-menu"]} onClick={showHamLinks}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <ul
          className={!showHamLink ? `${classes.navLink}` : `${classes.hamLink}`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li className={classes.dropdown}>
              {loggedUser.firstName} <i className="fa-solid fa-angle-down"></i>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/wishlist">
                <WishList />
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="login" onClick={showLoginModal}>
                Login/Signup
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="##" onClick={logout}>
                Log out
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="sellProduct">Sell</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
