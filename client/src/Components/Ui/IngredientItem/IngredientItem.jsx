import React from "react";
import classes from "./IngredientItem.module.css";
import SelectList from "../SelectList/SelectList";

const IngredientItem = ({onDelete, ...props}) => {
  return (
    <div className={classes.container}>
      <div className="form-group"> 
        <label htmlFor="ingredient_name" className="form-label">
          Ингредиент
        </label>
        <input
          type="text"
          className="form-control" 
          placeholder="Введите название ингредиента"
          id="ingredient_name"
          required
        />
      </div>
      <div className="form-group"> 
        <label htmlFor="quantity" className="form-label">
          Количество ингредиента
        </label>
        <input
          type="number"
          className="form-control" 
          id="quantity"
          min="0"
          required
        />
      </div>
      <div className="form-group"> 
        <label htmlFor="quantity" className="form-label">
          Мера веса/объема:
        </label>
        <SelectList
          id="dimension_units"
          options={[]}
          className="form-control" 
        />
      </div>
      <div className="form-group"> 
        <label htmlFor="note" className="form-label">
          Примечание 
        </label>
        <textarea
          className={`form-control ${classes.note_input}`} 
          id="note"
        />
      </div>
      <span className={classes.delete__button} onClick={onDelete}>Удалить</span> 
    </div>
  );
};


export default IngredientItem;

