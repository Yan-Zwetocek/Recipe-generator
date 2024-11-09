import React, { useState } from "react";
import classes from "./AuthPage.module.css";
import LoginForm from "../../Components/LoginForm/LoginForm";
import LightButton from "../../Components/Ui/LightButton/LightButton";

const AuthPage = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <LoginForm>Зарегистрироваться</LoginForm>
        <label htmlFor="recipe_name" className="form-label">
        Имя пользователя 
        </label>
        <input
          type="text"
          className="form-control"
          placeholder=" Ведите имя или ник"
          id="name"
          required
        />

        <LightButton className={classes.ava__button}>
          Выберите фото
          <input
            type="file"
            className={classes.ava__input}
            accept="image/*"
            onChange={handleFileChange} // Добавлено событие onChange
          />
        </LightButton>

        <div className={classes.ava__prev}>
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthPage;

