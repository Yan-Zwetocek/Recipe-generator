import React, { useContext } from "react";
import classes from "./LoginForm.module.css";
import LightButton from "../Ui/LightButton/LightButton";
import { useInput } from "../../Hooks/useInput";
import PasswordInput from "../Ui/PasswordInput/PasswordInput";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../../utils/consts";
import { Context } from "../..";
const LoginForm = ({ isReg, children }) => {
  const password = useInput("", { minLengthError: 8, isEmpty: true });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const username = useInput("", { minLengthError: 2, isEmpty: true });
  const { user } = useContext(Context);
  const navigate = useNavigate(); 
  const checkRegistration = async (email, password, username) => {
    try {
      if (isReg) {
        if (email.isValid && password.isValid && username.isValid) {
          user.registration(email, password, username);
          navigate(MAIN_ROUTE)
        }
      } else {
        user.login(email, password);
      }
    } catch (e) {
      alert(e.message);
    }
  };
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
          className={`form-control ${
            email.isDirty && !email.isEmailError ? classes.error : ""
          }`}
          placeholder="Введите email"
          id="email"
          onBlur={(e) => email.onBlur(e)}
          onChange={(e) => email.onChange(e)}
          required
        />
        <label htmlFor="password" className="form-label">
          Пароль
        </label>
        <PasswordInput password={password} />
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
                className={`form-control ${
                  username.isDirty && !username.minLengthError
                    ? classes.error
                    : ""
                }`}
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
          disabled={
            !email.isValid ||
            !password.isValid ||
            (isReg ? !username.isValid : false)
          }
          className={classes.button}
          onClick={() => checkRegistration(email, password, username)}
        >
          {children}
        </LightButton>
      </div>
    </form>
  );
};

export default LoginForm;
