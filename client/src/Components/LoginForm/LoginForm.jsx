import React from "react";
import classes from "./LoginForm.module.css";
import LightButton from "../Ui/LightButton/LightButton";
import { useInput } from "../../Hooks/useInput";

const LoginForm = ({ isReg, children }) => {
  const password = useInput("", { minLengthError: 8, isEmpty: true });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const username = useInput("", { minLengthError: 2, isEmpty: true });
  return (
    <form className={`${classes.form}`}>
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        {email.isDirty && email.isEmailError && (
          <div className={classes.errorText}> {email.errorText}</div>
        )}
        <input
          type="text"
          className={`form-control ${email.isDirty && !email.isEmailError ? classes.error : ""}`}
          placeholder="Введите email"
          id="email"
          onBlur={(e) => email.onBlur(e)}
          onChange={(e) => email.onChange(e)}
          required
        />
        <label htmlFor="password" className="form-label">
          Пароль
        </label>
        {password.isDirty && password.minLengthError && (
          <div className={classes.errorText}> {password.errorText}</div>
        )}
        <input
          type="text"
          className={`form-control ${password.isDirty && !password.minLengthError ? classes.error : ""}`}
          placeholder="Введите пароль"
          id="password"
          onBlur={(e) => password.onBlur(e)}
          onChange={(e) => password.onChange(e)}
          required
        />
        {isReg && ( // Условный рендеринг поля имени пользователя
          <>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Имя пользователя
              </label>
              {username.isDirty && username.minLengthError && (
                <div className={classes.errorText}>{username.errorText}</div>
              )}
              <input
                type="text"
                className= {`form-control ${username.isDirty && !username.minLengthError ? classes.error : ""}`}
                placeholder="Введите имя или ник"
                id="username"
                onBlur={(e) => username.onBlur(e)}
                onChange={(e) => username.onChange(e)}
                required
              />
            </div>
          </>
        )}
      </div>
      <div className="col-md-6">
        <LightButton
          disabled={!email.isValid || !password.isValid || !username.isValid}
          className={classes.button}
        >
          {children}
        </LightButton>
      </div>
    </form>
  );
};

export default LoginForm;
