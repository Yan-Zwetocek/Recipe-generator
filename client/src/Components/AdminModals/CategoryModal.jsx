import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";

const CategoryModal = ({ active, setActive }) => {
  return (
    <Modal active={active} setActive={setActive}>
      <label htmlFor="category" className="form-label">
        Добавить новую категорию  
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="Введите название категории"
        id="category"
        required
      />
      <LightButton style={{margin: '5px'}}> Добавить </LightButton>
    </Modal>
  );
};

export default CategoryModal;
