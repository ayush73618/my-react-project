import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>All @copyright Reserved by BestSHOP4U </p>
      <div className={classes.socials}>
        <a href="/">
          <i className="fab fa-instagram "></i>
        </a>
        <a href="/">
          <i className="fab fa-facebook "></i>
        </a>
        <a href="/">
          <i className="fab fa-youtube "></i>
        </a>
        <a href="/">
          <i className="fab fa-linkedin "></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
