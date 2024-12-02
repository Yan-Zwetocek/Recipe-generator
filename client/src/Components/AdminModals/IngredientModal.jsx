import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";

const IngredientModal = ({ active, setActive }) => {
  return (
    <Modal active={active} setActive={setActive}>
      <div className="form-group">
        <label htmlFor="ingredient" className="form-label">
          Добавить новый ингредиент
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Введите название ингредиента"
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
      <div className="form-group">
        <label htmlFor="protein" className="form-label">
          Белки (г):
        </label>
        <input
          type="number"
          className="form-control"
          id="protein"
          min="0"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="fat" className="form-label">
          Жиры (г):
        </label>
        <input
          type="number"
          className="form-control"
          id="fat"
          min="0"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="carbs" className="form-label">
          Углеводы (г):
        </label>
        <input
          type="number"
          className="form-control"
          id="carbs"
          min="0"
          required
        />
      </div>
      <LightButton style={{ margin: "5px" }}>Добавить</LightButton>
    </Modal>
  );
};

export default IngredientModal;

