import React from "react";
import ReactDom from "react-dom";
import classes from "./LoginModal.module.css";
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlays = (props) => {
  return (
    <div className={`${classes.modal} ${classes.bump}`}>
      <div>{props.children}</div>
    </div>
  );
};

const overlays = document.getElementById("overlays");

const LoginModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(<BackDrop onClose={props.onClose} />, overlays)}
      {ReactDom.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        overlays
      )}
    </>
  );
};

export default LoginModal;
