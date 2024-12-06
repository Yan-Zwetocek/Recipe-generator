import React, { useEffect } from "react";
import { useInput } from "../../../Hooks/useInput";
import SelectList from "../SelectList/SelectList";
import classes from './IngredientItem.module.css'


const IngredientItem = ({ onDelete, onValidate }) => {
  // Поля с валидацией
  const ingredientName = useInput("", { isEmpty: true, minLengthError: 3 });
  const quantity = useInput("", { isEmpty: true });
  const note = useInput("", { isEmpty: true, minLengthError: 3 });

  // Передача общего статуса валидации
  // useEffect(() => {
  //   const isValid = ingredientName.isValid && quantity.isValid;
  //   if (onValidate) {
  //     onValidate(isValid);
  //   }
  // }, [ingredientName.isValid, quantity.isValid, onValidate]);

  return (
    <div className={classes.container}>
      <div className="form-group">
        <label htmlFor="ingredient_name" className="form-label">
          Ингредиент
        </label>
        <input
          type="text"
          className={`form-control ${ingredientName.isDirty && !ingredientName.isValid ? "is-invalid" : ""}`}
          placeholder="Введите название ингредиента"
          id="ingredient_name"
          value={ingredientName.value}
          onChange={ingredientName.onChange}
          onBlur={ingredientName.onBlur}
          required
        />
        {ingredientName.isDirty && !ingredientName.isValid && (
          <div className="invalid-feedback">{ingredientName.errorText}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="quantity" className="form-label">
          Количество ингредиента
        </label>
        <input
          type="number"
          className={`form-control ${quantity.isDirty && !quantity.isValid ? "is-invalid" : ""}`}
          id="quantity"
          min="0"
          value={quantity.value}
          onChange={quantity.onChange}
          onBlur={quantity.onBlur}
          required
        />
        {quantity.isDirty && !quantity.isValid && (
          <div className="invalid-feedback">{quantity.errorText}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dimension_units" className="form-label">
          Мера веса/объема:
        </label>
        <SelectList id="dimension_units" options={[]} className="form-control" />
      </div>

      <div className="form-group">
        <label htmlFor="note" className="form-label">
          Примечание
        </label>
       
        <textarea
          className={`form-control ${classes.note_input} ${note.isDirty && !note.isValid ? "is-invalid" : ""}`}
          id="note"
          value={note.value}
          onChange={note.onChange}
          onBlur={note.onBlur}
        />
      </div>

      <span className={classes.delete__button} onClick={onDelete}>
        Удалить
      </span>
    </div>
  );
};

export default IngredientItem;
