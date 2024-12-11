import React, { useState } from "react";
import { useInput } from "../../../Hooks/useInput";
import classes from "./PasswordInput.module.css";
import { Button } from "react-bootstrap";

const PasswordInput = ({props, password}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const changePasswordVisibility = (e, bool) => {
    e.preventDefault();
    setPasswordVisibility(bool);
  };
  console.log(password.errorText)
  return (
    <div>
      {password.isDirty && password.minLengthError && (
          <div className={classes.errorText}> {password.errorText}</div>
        )}
      <div className={classes.inputBox}>
        <input
          type={passwordVisibility ? "text" : "password"}
          className={`form-control ${
            password.isDirty && !password.isEmailError ? classes.error : ""
          }`}
          placeholder="Введите пароль  "
          id="password"
          onBlur={(e) => password.onBlur(e)}
          onChange={(e) => password.onChange(e)}
          required
        />
        {!passwordVisibility ? (
          <button
            onClick={(e) => changePasswordVisibility(e, true)}
            className={classes.button}
          >
            <img src="\icon\eye-password-show-svgrepo-com.svg" alt="lllll" />
          </button>
        ) : (
          <button
            onClick={(e) => changePasswordVisibility(e, false)}
            className={classes.button}
          >
            <img src="\icon\eye-password-hide-svgrepo-com.svg" alt="lllll" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
