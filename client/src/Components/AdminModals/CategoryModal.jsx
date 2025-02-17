import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";
import { useInput } from "../../Hooks/useInput";
import classes from './AdminModals.module.css'
import  CategoryService from '../../Services/category-service '

const CategoryModal = ({ active, setActive }) => {
  const category = useInput('', {isEmpty: true, minLengthError:3 }) 
  const addCategory = () =>{
      CategoryService.crate({name: category.value}).then(
      
      );
      console.log(category)
     }   
  return (
    <Modal active={active} setActive={setActive}>
      <label htmlFor="category" className="form-label">
        Добавить новую категорию  
      </label>
      {category.isDirty && category.minLengthError && (
          <div className={classes.errorText}> {category.errorText}</div>
        )}
      <input
        type="text"
        className={`form-control ${category.isDirty && !category.isEmpty ? classes.error : ""}`}
        placeholder="Введите название категории"
        id="category"
        onBlur={(e) => category.onBlur(e)}
        onChange={(e) => category.onChange(e)}
        required
      />
      <LightButton disabled={!category.isValid} onClick={addCategory} style={{margin: '5px'}}> Добавить </LightButton>
    </Modal>
  );
};

export default CategoryModal;
