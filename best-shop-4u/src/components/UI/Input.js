import classes from "./Input.module.css";
const Input = (props) => {
  return (
    <div className={classes.input}>
      <input
        id={props.label}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={`${props.hasError ? classes.error : ""} ${
          props.value ? classes["has-value"] : ""
        }`}
      />
      <label htmlFor={props.label}>{props.label}</label>
    </div>
  );
};
export default Input;
