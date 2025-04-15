import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";
import { useInput } from "../../Hooks/useInput";
import classes from './AdminModals.module.css'
import CuisinesService from "../../Services/cuisines-service";

const CuisineModal = ({ active, setActive }) => {
  const cuisine = useInput('', {isEmpty: true, minLengthError: 10 })
  const addCuisine = () =>{
    CuisinesService.crate({name: cuisine.value}).then(
      alert('Кухня  успешно добавлена')
    );
    console.log(cuisine)
   }   
  return (
    <Modal active={active} setActive={setActive}>
      <label htmlFor="category" className="form-label">
        Добавить новую кухни  
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
      <LightButton disabled={!cuisine.isValid} style={{margin: '5px'}} onClick={addCuisine}> Добавить </LightButton>
    </Modal>
  );
};



export default CuisineModal;
