import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";
import { useInput } from "../../Hooks/useInput"
import classes from './AdminModals.module.css'
const IngredientModal = ({ active, setActive }) => {
  const ingredientName = ("", { isEmpty: true, minLengthError: 3 });
  const calories = useInput("", { isEmpty: true });
  const protein = useInput("", { isEmpty: true });
  const fat = useInput("", { isEmpty: true });
  const carbs = useInput("", { isEmpty: true });

 
  return (
    <Modal active={active} setActive={setActive}>
      <form>
        <div className="form-group">
          <label htmlFor="ingredient" className="form-label">
            Добавить новый ингредиент
          </label>
          <input
            type="text"
            className={`form-control ${ingredientName.isDirty && !ingredientName.isEmailError ? classes.error : ""}`}
            placeholder="Введите название ингредиента"
            id="ingredient"
            value={ingredientName.value}
            onChange={ingredientName.onChange}
            onBlur={ingredientName.onBlur}
          />
          {ingredientName.isDirty && ingredientName.errorText && (
            <p className={classes.errorText}>{ingredientName.errorText}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="calories" className="form-label">
            Калории (ккал):
          </label>
          <input
            type="number"
             className={`form-control ${calories.isDirty && !calories.isEmpty ? classes.error : ""}`}
            id="calories"
            value={calories.value}
            onChange={calories.onChange}
            onBlur={calories.onBlur}
            min="0"
          />
          {calories.isDirty && calories.errorText && (
            <p className={classes.errorText}>{calories.errorText}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="protein" className="form-label">
            Белки (г):
          </label>
          <input
            type="number"
            className={`form-control ${protein.isDirty && !protein.isEmpty ? classes.error : ""}`}
            id="protein"
            value={protein.value}
            onChange={protein.onChange}
            onBlur={protein.onBlur}
            min="0"
          />
          {protein.isDirty && protein.errorText && (
            <p className={classes.errorText}>{protein.errorText}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="fat" className="form-label">
            Жиры (г):
          </label>
          <input
            type="number"
            className={`form-control ${fat.isDirty && !fat.isEmpty ? classes.error : ""}`}
            id="fat"
            value={fat.value}
            onChange={fat.onChange}
            onBlur={fat.onBlur}
            min="0"
          />
          {fat.isDirty && fat.errorText && (
            <p className={classes.errorText}>{fat.errorText}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="carbs" className="form-label">
            Углеводы (г):
          </label>
          <input
            type="number"
            className={`form-control ${carbs.isDirty && !carbs.isEmailError ? classes.error : ""}`}
            id="carbs"
            value={carbs.value}
            onChange={carbs.onChange}
            onBlur={carbs.onBlur}
            min="0"
          />
          {carbs.isDirty && carbs.errorText && (
            <p className={classes.errorText}>{carbs.errorText}</p>
          )}
        </div>
        <LightButton disabled={!calories.isValid || !carbs.isValid || !fat.isValid || !protein.isValid} style={{ margin: "5px" }}>
          Добавить
        </LightButton>
      </form>
    </Modal>
  );
};

export default IngredientModal;

