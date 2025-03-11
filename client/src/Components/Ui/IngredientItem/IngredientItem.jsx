import React, { useEffect, useState } from "react";
import { useInput } from "../../../Hooks/useInput";
import SelectList from "../SelectList/SelectList";
import classes from "./IngredientItem.module.css";
import IngredientService from "../../../Services/ingredient-service";
import DimensionUnitsService from "../../../Services/dimensionUnits-service";

const IngredientItem = ({ onDelete, onUpdate }) => {
  const quantity = useInput("", { isEmpty: true });
  const note = useInput("", { isEmpty: true, minLengthError: 3 });

  const [ingredients, setIngredients] = useState([]);
  const [dimensionUnits, setDimensionUnits] = useState([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState("");
  const [selectedUnitName, setSelectedUnitName] = useState("");

  useEffect(() => {
    IngredientService.getAll().then((response) => {
      setIngredients(response.data); // [{ id, name }]
    });

    DimensionUnitsService.getAll().then((response) => {
      setDimensionUnits(response.data); // [{ id, name }]
    });
  }, []);

  const handleIngredientChange = (id) => {
    const idInt = parseInt(id, 10);
    const selected = ingredients.find((ing) => ing.id === idInt);
    if (selected) {
      setSelectedIngredientId(selected.id);
      onUpdate("ingredientId", selected.id);
      console.log(selected)
    }
  };

  const handleUnitChange = (id) => {
    const idInt = parseInt(id, 10);
    const selected = dimensionUnits.find((unit) => unit.id === idInt);
    if (selected) {
      setSelectedUnitName(idInt);
      onUpdate("dimensionUnitId", selected.id); // Передаём `id`, а не `name`
      console.log(selected)
    }
  };

  return (
    <div className={classes.container}>
      <div className="form-group">
        <label htmlFor="ingredient_name" className="form-label">
          Ингредиент
        </label>
        <SelectList
          id="ingredient_name"
          options={ingredients.map((ing) => ing.name)}
          value={selectedIngredientId}
          onChange={handleIngredientChange}
        />
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
          onChange={(e) => {
            quantity.onChange(e);
            onUpdate("quantity", e.target.value);
          }}
          onBlur={quantity.onBlur}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dimension_units" className="form-label">
          Единица измерения
        </label>
        <SelectList
          id="ingredient_name"
          options={dimensionUnits.map((unit) => unit.name)}
          value={selectedUnitName}
          onChange={handleUnitChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="note" className="form-label">
          Примечание
        </label>
        <textarea
          className={`form-control ${classes.note_input} ${note.isDirty && !note.isValid ? "is-invalid" : ""}`}
          id="note"
          value={note.value}
          onChange={(e) => {
            note.onChange(e);
            onUpdate("note", e.target.value);
          }}
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
 