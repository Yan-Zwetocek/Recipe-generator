import React from "react";
import classes from "./LoginForm.module.css";
import LightButton from "../Ui/LightButton/LightButton";

const LoginForm = ({ children }) => {
  return (
    <form className={`${classes.form}`}>
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Введите email"
          id="email"
          required
        />
        <label htmlFor="password" className="form-label">
          Пароль
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Введите пароль"
          id="password"
          required
        />
      </div>
      <div className="col-md-6">
        <LightButton className={classes.button}>{children}</LightButton>
      </div>
    </form>
  );
};

export default LoginForm;
