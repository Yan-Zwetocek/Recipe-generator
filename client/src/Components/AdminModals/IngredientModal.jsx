import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";

const IngredientModal = ({ active, setActive }) => {
  return (
    <Modal active={active} setActive={setActive}>
      <div className="form-group"> 
        <label htmlFor="ingredient" className="form-label">
          Добавить новый ингридиент 
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Введите название ингридиента"
          id="ingredient"
          required
        />
      </div>
      <div className="form-group"> 
        <label htmlFor="calories" className="form-label">
          Калории (ккал):
        </label>
        <input
          type="number"
          className="form-control" 
          id="calories"
          min="0"
          required
        />
      </div>
      <LightButton style={{margin: '5px'}}> Добавить </LightButton>
    </Modal>
  );
};

export default IngredientModal;

