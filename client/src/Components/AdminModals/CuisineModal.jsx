import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";
import { useInput } from "../../Hooks/useInput";
import classes from './AdminModals.module.css'

const CuisineModal = ({ active, setActive }) => {
  const cuisine = useInput('', {isEmpty: true, minLengthError: 10 }) 
  return (
    <Modal active={active} setActive={setActive}>
      <label htmlFor="category" className="form-label">
        Добавить новую категорию  
      </label>
      {cuisine.isDirty && cuisine.minLengthError && (
          <div className={classes.errorText}> {cuisine.errorText}</div>
        )}
      <input
        type="text"
        className={`form-control ${cuisine.isDirty && !cuisine.isEmpty ? classes.error : ""}`}
        placeholder="Введите название кухни"
        id="category"
        onBlur={(e) => cuisine.onBlur(e)}
        onChange={(e) => cuisine.onChange(e)}
        required
      />
      <LightButton disabled={!cuisine.isValid} style={{margin: '5px'}}> Добавить </LightButton>
    </Modal>
  );
};



export default CuisineModal;
