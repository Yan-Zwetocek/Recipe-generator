import React, { useContext, useEffect, useState } from "react";
import classes from "./CreateRecipePage.module.css";
import ColorButton from "../../Components/Ui/ColorButton/ColorButton";
import LightButton from "../../Components/Ui/LightButton/LightButton";
import SelectList from "../../Components/Ui/SelectList/SelectList";
import IngredientItem from "../../Components/Ui/IngredientItem/IngredientItem";
import CreateStepItem from "../../Components/Ui/CreateStepItem/createStepItem";
import { useInput } from "../../Hooks/useInput";
import CuisinesService from "../../Services/cuisines-service";
import CategoryService from "../../Services/category-service ";
import RecipeService from "../../Services/recipe-service";
import { Context } from "../..";


const CreateRecipePage = () => {
  const [file, setFile] = useState(null);
  const [steps, setSteps] = useState([
    { description: "", file: null },
    { description: "", file: null },
  ]);
  const [cuisine, setCuisine] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCuisineId, setSelectedCuisineId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [ingredients, setIngredients] = useState([
    {  quantity: "" },
    {  quantity: "" },
  ]);
    const { user,  } = useContext(Context);
    const userId = user._user.data.id
  
  useEffect(() => {
    CuisinesService.getAll().then((response) => {
      const cuisineName = response.data.map((cuisine) => cuisine.name);
      const cuisineId = response.data.map((cuisine) => cuisine.id);
      setCuisine(cuisineName);
    });
    CategoryService.getAll().then((response) => {
      const categoryName = response.data.map((category) => category.name);
      const categoryId = response.data.map((category) => category.id);
      setCategory(categoryName)
    });
    
  }, []);
  const recipeName = useInput("", { isEmpty: true, minLengthError: 3 });
  const recipeDescription = useInput("", { isEmpty: true, minLengthError: 10 });
  const timeToPrepare = useInput("", { isEmpty: true });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 2) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    } else {
      alert("В рецепте должно быть минимум 2 ингредиента");
    }
  };

  const handleDeleteSteps = (index) => {
    if (steps.length > 2) {
      setSteps(steps.filter((_, i) => i !== index));
    } else {
      alert("В рецепте должно быть минимум 2 шага");
    }
  };

  const updateIngredient = (index, key, value) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [key]: value } : ing))
    );
  };
  const handleIngredientUpdate = (index, field, value) => {
    setIngredients((prev) => {
      const updated = [...prev];
      if (!updated[index]) updated[index] = {};
      updated[index][field] = value;
      return updated;
    });
  };
   

  const updateStep = (index, text, file) => {
    setSteps((prev) =>
      prev.map((step, i) =>
        i === index ? { ...step, description: text, file: file } : step
      )
    );
  };

  const addRecipe = async (e) => {
    e.preventDefault();
  
    if (recipeName.minLengthError) {
      alert("Введите название рецепта!");
      return;
    }
    
    if (recipeDescription.minLengthError) {
      alert("Введите описание рецепта!");
      return;
    }
    
    if (timeToPrepare.isEmpty) {
      alert("Укажите время на приготовление!");
      return;
    }
    
    if (!selectedCuisineId) {
      alert("Выберите кухню!");
      return;
    }
    
    if (!selectedCategoryId) {
      alert("Выберите категорию!");
      return;
    }
    
     const missingIngredient = ingredients.find(ing => !ing.ingredientId || !ing.quantity || !ing.dimensionUnitId);
     if (missingIngredient) {
       alert("Заполните все ингредиенты корректно!" , ingredients.id, ingredients.quantity);
       console.log( ingredients[0], ingredients[0].quantity)
       return;
     }
    
    const missingStep = steps.find(step => !step.description);
    if (missingStep) {
      alert("Заполните все шаги!");
      return;
    }
    
    
    
  
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", recipeName.value);
    formData.append("description", recipeDescription.value);
    formData.append("time_to_prepare", timeToPrepare.value);
    formData.append("cuisineId", selectedCuisineId);
    formData.append("categoryId", selectedCategoryId);
  
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredientIds[${index}]`, ingredient.ingredientId);
      formData.append(`quantities[${index}]`, ingredient.quantity);
      formData.append(`dimensionUnitIds[${index}]`, ingredient.dimensionUnitId); // Теперь передаём ID единицы измерения
      formData.append(`notes[${index}]`, ingredient.note || "");
    });
  
    steps.forEach((step, index) => {
      formData.append(`steps[${index}][description]`, step.description);
      if (step.file) {
        formData.append(`steps[${index}][file]`, step.file);
      }
    });
  
    if (file) {
      formData.append("recipe_img", file);
    }
  
    try {
      console.log([...formData.entries()]);
      await RecipeService.create(formData);
      alert("Рецепт успешно создан!");
    } catch (e) {
      console.error("Ошибка при создании рецепта:", e);
      alert("Ошибка при отправке данных");
    }
  };

  return (
    <div className={classes.container}>
      <h3 className="fw-bold">Добавить рецепт</h3>
      <form className={classes.form}>
        <label>Название рецепта</label>
        <input
          type="text"
          className={`form-control ${
            recipeName.isDirty && recipeName.minLengthError ? classes.error : ""
          }`}
          placeholder="Введите название"
          onBlur={recipeName.onBlur}
          onChange={recipeName.onChange}
        />
        {recipeName.isDirty && recipeName.minLengthError && (
          <div className={classes.errorText}>{recipeName.errorText}</div>
        )}

        <label>Описание рецепта</label>
        <textarea
          className={`form-control ${
            recipeDescription.isDirty && recipeDescription.minLengthError
              ? classes.error
              : ""
          }`}
          rows="3"
          onBlur={recipeDescription.onBlur}
          onChange={recipeDescription.onChange}
        ></textarea>
        {recipeDescription.isDirty && recipeDescription.minLengthError && (
          <div className={classes.errorText}>{recipeDescription.errorText}</div>
        )}

        <label>Время приготовления (мин.)</label>
        <input
          type="number"
          className={`form-control ${
            timeToPrepare.isDirty && timeToPrepare.isEmpty ? classes.error : ""
          }`}
          onBlur={timeToPrepare.onBlur}
          onChange={timeToPrepare.onChange}
          min="0"
        />
        {timeToPrepare.isDirty && timeToPrepare.isEmpty && (
          <div className={classes.errorText}>{timeToPrepare.errorText}</div>
        )}

        <SelectList
          options={cuisine}
          value={selectedCuisineId}
          onChange={setSelectedCuisineId}
          key={selectedCuisineId}
        />
        <SelectList
          options={category}
          value={selectedCategoryId}
          onChange={setSelectedCategoryId}
          key={selectedCategoryId}
        />

<div className={classes.ingredient__form }>
          {ingredients.map((ingredient, index) => (
            <IngredientItem
             className={classes.ingredient__form}
              key={index}
              ingredient={ingredient}
              onUpdate={(key, value) => updateIngredient(index, key, value)}
              onDelete={() => handleDeleteIngredient(index)}
            />
          ))}
          <LightButton
            onClick={() =>
              setIngredients([...ingredients, { id: null, quantity: "" }])
            }
          >
            Добавить ингредиент
          </LightButton>
  
</div>
        <h3 className="fw-bold">Добавить шаги</h3>
       <div className={classes.step__form}>
          {steps.map((step, index) => (
            <CreateStepItem
              key={index}
              onDelete={() => handleDeleteSteps(index)}
              onUpdate={(text, file) => updateStep(index, text, file)}
            />
          ))}
          <LightButton
            onClick={() => setSteps([...steps, { description: "", file: null }])}
            className={classes}
          >
            Добавить шаг
          </LightButton>
  
       </div>
        <label>Основное фото рецепта</label>
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
          <span>{file ? file.name : "файл не выбран"}</span>
        </div>

        <ColorButton type="submit" onClick={addRecipe}>
          Сохранить рецепт
        </ColorButton>
      </form>
    </div>
  );
};

export default CreateRecipePage;
