import React, { useEffect, useState } from "react";
import classes from "./PicDisplay.module.css";

const displayImages = [
  "./Asset/img/laptop/1.jpg",
  "./Asset/img/mobiles/2.jpg",
  "./Asset/img/laptop/3.jpg",
  "./Asset/img/mobiles/4.jpg",
  "./Asset/img/laptop/5.png",
  "./Asset/img/mobiles/6.jpg",
];
const PicDisplay = () => {
  const [picArr, setPicArr] = useState("");
  const [i, setI] = useState(0);
  const [bump, setBump] = useState(false);
  // const [top, setTop] = useState(false);

  let btnclass = "";

  useEffect(() => {
    setBump(true);
    setPicArr(displayImages[i]);
    const timer = setTimeout(() => {
      setBump(false);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [i]);

  btnclass = bump ? classes.bump : "";
  useEffect(() => {
    const intervel = setInterval(() => {
      let j = i;
      ++j;
      if (j >= 5) {
        setI(0);
      } else {
        setI(j);
      }
    }, 3000);

    setPicArr(displayImages[i]);

    return () => clearInterval(intervel);
  }, [i]);

  // function scrollFunction() {
  //   if (
  //     document.body.scrollTop > 20 ||
  //     document.documentElement.scrollTop > 20
  //   ) {
  //     setTop(false);
  //   } else {
  //     setTop(true);
  //   }
  // }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <section className={classes.container}>
      <div className={`${classes["front-display-image"]} ${btnclass}`}>
        <span>
          <button className={classes.next} type="button" title="next">
            <i className="fas fa-angle-right fa-2x"></i>
          </button>
        </span>

        <div className={classes.slides}>
          <a href="/">
            <img src={picArr} alt="" />
          </a>
        </div>
      </div>
      <button
        onClick={topFunction}
        id="myBtn"
        className={classes.myBtn}
        title="Go to Top"
      >
        <i className="fas fa-arrow-up fa-2x"></i>
      </button>

      <div className={classes.help}>
        <button title="Help">
          <i className="fas fa-user fa-2x"></i>
        </button>
        <div className={classes.chatwithus}>
          <h3>Need Help</h3>
          <p>Raise a Query</p>
          <p>
            Check with Help Page <a href="/">Here</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default React.memo(PicDisplay);
