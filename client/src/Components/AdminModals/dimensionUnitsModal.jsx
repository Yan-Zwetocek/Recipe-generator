import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";
import classes from './AdminModals.module.css'
import dimensionUnitsService from "../../Services/dimensionUnits-service";
import { useInput } from "../../Hooks/useInput";

const DimensionUnitsModal = ({ active, setActive }) => {
  const dimensionUnit = useInput('', {isEmpty: true, })
  const addDimensionUnits= () =>{
    dimensionUnitsService.crate({name: dimensionUnit.value}).then(
    
    );
    
   }   
  return (
    <Modal active={active} setActive={setActive}>
      <label htmlFor="category" className="form-label">
        Добавить единицу измерения 
      </label>
      {dimensionUnit.isDirty && dimensionUnit.minLengthError && (
          <div className={classes.errorText}> {dimensionUnit.errorText}</div>
        )}
      <input
        type="text"
        className={`form-control ${dimensionUnit.isDirty && !dimensionUnit.isEmpty ? classes.error : ""}`}
        placeholder="Введите единицу измерения "
        id="category"
        onBlur={(e) => dimensionUnit.onBlur(e)}
        onChange={(e) => dimensionUnit.onChange(e)}
        required
      />
      <LightButton disabled={!dimensionUnit.isValid} style={{margin: '5px'}} onClick={addDimensionUnits}> Добавить </LightButton>
    </Modal>
  );
};



export default DimensionUnitsModal;
