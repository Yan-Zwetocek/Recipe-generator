import React, { useState } from "react";
import classes from "./CreateRecipePage.module.css";
import ColorButton from "../../Components/Ui/ColorButton/ColorButton";
import LightButton from "../../Components/Ui/LightButton/LightButton";
import SelectList from "../../Components/Ui/SelectList/SelectList";
import IngredientItem from "../../Components/Ui/IngredientItem/IngredientItem";
import CreateStepItem from "../../Components/Ui/CreateStepItem/createStepItem";
import { useInput } from "../../Hooks/useInput";

const CreateRecipePage = (props) => {
  const [fileName, setFileName] = useState(null);
  const [ingredients, setIngredients] = useState([{}, {}]);
  const [steps, setSteps] = useState([{}, {}]);
  const [stepValidation, setStepValidation] = useState([]);
  const [ingredientValidation, setIngredientValidation] = useState([]);

  // Используем хук useInput для полей
  const recipeName = useInput("", { isEmpty: true, minLengthError: 3 });
  const recipeDescription = useInput("", { isEmpty: true, minLengthError: 10 });
  const timeToPrepare = useInput("", { isEmpty: true });

  const handleFileChange = (event) => {
    setFileName(event.target.files[0].name);
  };

  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 2) {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    } else {
      alert(" В рецепте должно быть как минимум 2 ингредиента");
    }
  };

  const handleDeleteSteps = (index) => {
    if (steps.length > 2) {
      const updatedSteps = [...steps];
      updatedSteps.splice(index, 1);
      setSteps(updatedSteps);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const areAllIngredientsValid = ingredientValidation.every(Boolean);
    const areAllStepsValid = stepValidation.every(Boolean);
    
    if (recipeName.isValid && recipeDescription.isValid && timeToPrepare.isValid && areAllIngredientsValid && areAllStepsValid) {
      alert("рецепт успешно отправлена!");
      
    } else {
      alert("Исправьте ошибки в форме.");
    }
  };
  

  const handleIngredientValidation = (index, isValid) => {
    const updatedValidation = [...ingredientValidation];
    updatedValidation[index] = isValid; // Обновляем статус для конкретного ингредиента
    setIngredientValidation(updatedValidation);
  };

  const handleStepValidation = (index, isValid) => {
    const updatedValidation = [...stepValidation];
    updatedValidation[index] = isValid; // Обновляем статус для конкретного шага
    setStepValidation(updatedValidation);
  };
  

  return (
    <div className={classes.container}>
      <label htmlFor="form" className="h3 fw-bold">
        Добавить рецепт
      </label>
      <form className={classes.form} id="form" onSubmit={handleSubmit}>
        <label htmlFor="recipe_name" className="form-label">
          Название рецепта
        </label>
        <input
          type="text"
          className={`form-control ${
            recipeName.isDirty && recipeName.minLengthError ? classes.error : ""
          }`}
          placeholder="Введите название"
          id="recipe_name"
          onBlur={(e) => recipeName.onBlur(e)}
          onChange={(e) => recipeName.onChange(e)}
        />
        {recipeName.isDirty && recipeName.minLengthError && (
          <div className={classes.errorText}>{recipeName.errorText}</div>
        )}

        <label htmlFor="recipe_description" className="form-label">
          Описание рецепта
        </label>
        <textarea
          className={`form-control ${
            recipeDescription.isDirty && recipeDescription.minLengthError
              ? classes.error
              : ""
          }`}
          id="recipe_description"
          rows="3"
          value={recipeDescription.value}
          onChange={recipeDescription.onChange}
          onBlur={recipeDescription.onBlur}
        ></textarea>
        {recipeDescription.isDirty && recipeDescription.minLengthError && (
          <div className={classes.errorText}>{recipeDescription.errorText}</div>
        )}

        <label htmlFor="time_to_prepare" className="form-label">
          Время приготовления в минутах
        </label>
        <input
          type="number"
          className={`form-control ${classes.short__input} ${
            timeToPrepare.isDirty && timeToPrepare.isEmpty ? classes.error : ""
          }`}
          id="time_to_prepare"
          value={timeToPrepare.value}
          onChange={timeToPrepare.onChange}
          onBlur={timeToPrepare.onBlur}
          min="0"
        />
        {timeToPrepare.isDirty && timeToPrepare.isEmpty && (
          <div className={classes.errorText}>{timeToPrepare.errorText}</div>
        )}

        {/* Остальная часть формы остается неизменной */}
        <label htmlFor="ingredient__form" className="h3 fw-bold">
          Добавить ингредиент
        </label>
        <div id="ingredient__form" className={classes.ingredient__form}>
          {ingredients.map((ingredient, index) => (
            <IngredientItem
              onValidate={(isValid) =>
                handleIngredientValidation(index, isValid)
              }
              key={index}
              onDelete={() => handleDeleteIngredient(index)}
            />
          ))}
          <LightButton onClick={addIngredients}>
            Добавить ингредиент
          </LightButton>
        </div>
        <label htmlFor="stepForm" className="h3 fw-bold">
          Добавить шаги
        </label>
        <div id="stepForm" className={classes.step__form}>
          {steps.map((step, index) => (
            <CreateStepItem
              key={index}
              onDelete={() => handleDeleteSteps(index)}
              onValidate={(isValid) => handleStepValidation(index, isValid)}
            />
          ))}
          <LightButton onClick={() => addSteps()}>Добавить шаг</LightButton>
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
              onChange={handleFileChange}
            />
          </ColorButton>
          {fileName ? (
            <span className={classes.fileName}>{fileName}</span>
          ) : (
            <span className={classes.fileName}>файла не выбран </span>
          )}
        </div>
        <ColorButton type="submit" className={classes.submitButton}>
          Сохранить рецепт
        </ColorButton>
      </form>
    </div>
  );
};

export default CreateRecipePage;
