import React, { useState, useEffect } from "react";
import classes from "./createStepItem.module.css";
import LightButton from "../LightButton/LightButton";
import { useInput } from "../../../Hooks/useInput";

const CreateStepItem = ({ onDelete, onValidate }) => {
  const [fileName, setFileName] = useState(null);
  const text = useInput("", { isEmpty: true, minLengthError: 10 });

  // useEffect(() => {
  //   if (onValidate) {
  //     onValidate(text.isValid);
  //   }
  // }, [text.isValid, onValidate]);

  // const handleFileChange = (event) => {
  //   setFileName(event.target.files[0].name);
  // };

  return (
    <div className={classes.container}>
      <div className={classes.step__content}>
        <label htmlFor="text">Описание шага</label>
        <textarea
          id="text"
          className={`form-control ${text.isDirty && !text.isValid ? "is-invalid" : ""}`}
          onBlur={(e) => text.onBlur(e)}
          onChange={(e) => text.onChange(e)}
        ></textarea>
        {text.isDirty && !text.isValid && <div className="invalid-feedback">{text.errorText}</div>}
        <span className={classes.delete__button} onClick={() => onDelete()}>
          Удалить
        </span>
      </div>
      <label htmlFor="step__foto-button" className="form-label">
        Выбрать фото шага
      </label>
      <div className="d-flex align-items-center">
        <LightButton className={classes.step__foto__button}>
          Выбрать фото
          <input
            type="file"
            className={classes.step__foto__input}
            accept="image/*"
            // onChange={handleFileChange}
          />
        </LightButton>
        {fileName ? (
          <span className={classes.fileName}>{fileName}</span>
        ) : (
          <span className={classes.fileName}>файла не выбран </span>
        )}
      </div>
    </div>
  );
};

export default CreateStepItem;
