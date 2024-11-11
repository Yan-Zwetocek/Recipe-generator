import React, { useState } from "react";
import classes from "./CreateRecipePage.module.css";
import ColorButton from "../../Components/Ui/ColorButton/ColorButton";
import LightButton from "../../Components/Ui/LightButton/LightButton";
import SelectList from "../../Components/Ui/SelectList/SelectList";
import IngredientItem from "../../Components/Ui/IngredientItem/IngredientItem";
import StepItem from "../../Components/Ui/StepItem/StepItem";

const CreateRecipePage = (props) => {
  const [fileName, setFileName] = useState(null);
  const [ingredients, setIngredients] = useState([{}, {}]);
  const [steps, setSteps] = useState([{}, {}]);

  const handleFileChange = (event) => {
    setFileName(event.target.files[0].name);
  };
  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 2) {
      const updatedIngredients = [...ingredients]; // Создаем копию массива
      updatedIngredients.splice(index, 1); // Удаляем элемент по индексу
      setIngredients(updatedIngredients); // Обновляем состояние
    } else {
      alert(" В рецепте должно быть как минимум 2 ингредиента");
    }
  };
  const handleDeleteSteps = (index) => {
    if (steps.length > 2) {
      const updatedSteps = [...steps]; // Создаем копию массива
      updatedSteps.splice(index, 1); // Удаляем элемент по индексу
      setSteps(updatedSteps); // Обновляем состояние
    } else {
      alert(" В рецепте должно быть как минимум 2 шага");
    }
  };
  const addIngredients = () => {
    setIngredients([...ingredients, {}]);
  };
  const addSteps = () => {
    setSteps([...steps, {}]);
  };

  return (
    <div className={classes.container}>
      <label htmlFor="form" className="h3 fw-bold">
        {" "}
        Добавить рецепт
      </label>
      <form className={classes.form} id="form">
        <label htmlFor="recipe_name" className="form-label">
          Название рецепта
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Введите название"
          id="recipe_name"
          required
        />
        <label htmlFor="recipe_description" className="form-label">
          Описание рецепта
        </label>
        <textarea
          class="form-control"
          id="recipe_description "
          rows="3"
        ></textarea>

        <label htmlFor="time_to_prepare" className="form-label">
          Время приготовления в минутах
        </label>
        <input
          type="number"
          className={`form-control ${classes.short__input}`}
          id="time_to_prepare"
          min="0"
          required
        />
        <label htmlFor="cuisine" className="form-label">
          Кухня
        </label>
        <SelectList
          id="cuisine"
          options={[]}
          className={classes.short__input}
        />
        <label htmlFor="category" className="form-label">
          Категория
        </label>
        <SelectList
          id="category"
          options={[]}
          className={classes.short__input}
        />
        <br />
        <label htmlFor="ingredient__form" className="h3 fw-bold">
          {" "}
          Добавить ингредиент{" "}
        </label>
        <div id="ingredient__form" className={classes.ingredient__form}>
          {ingredients.map((ingredient, index) => (
            <IngredientItem
              key={index}
              onDelete={() => handleDeleteIngredient(index)}
            />
          ))}
          <LightButton onClick={addIngredients}>
            {" "}
            Добавить ингредиент{" "}
          </LightButton>
        </div>
        <label htmlFor="stepForm" className="h3 fw-bold">
          {" "}
          Добавить шаги{" "}
        </label>
        <div id="stepForm" className={classes.step__form}>
          {steps.map((step, index) => (
            <StepItem key={index} onDelete={() => handleDeleteSteps(index)} />
          ))}
          <LightButton onClick={() => addSteps()}> Добавить шаг</LightButton>
        </div>
        <label htmlFor="foto__button" className="form-label">
          Основное фото рецепта
        </label>
        <div className="d-flex align-items-center">
          <ColorButton id="foto__button" className={classes.foto__button}>
            Выбрать фото
            <input
              type="file"
              className={classes.foto__input}
              accept="image/*"
              onChange={handleFileChange} // Добавлено событие onChange
            />
          </ColorButton>
          {fileName ? (
            <span className={classes.fileName}>{fileName}</span>
          ) : (
            <span className={classes.fileName}>файла не выбран </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateRecipePage;