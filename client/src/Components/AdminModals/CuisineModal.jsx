import React from "react";
import Modal from "../Ui/Modal/Modal";
import LightButton from "../Ui/LightButton/LightButton";

const CuisineModal = ({ active, setActive }) => {
  return (
    <Modal active={active} setActive={setActive}>
      <label htmlFor="cuisine" className="form-label">
        Добавить новую кухню 
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="Введите название кухни"
        id="cuisine"
        required
      />
      <LightButton style={{margin: '5px'}}> Добавить </LightButton>
    </Modal>
  );
};

export default CuisineModal;
