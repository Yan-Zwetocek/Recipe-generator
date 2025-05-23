import React, { useContext, useEffect, useState } from "react";
import classes from "./SearchRecipeForm.module.css";
import LightButton from "../Ui/LightButton/LightButton";
import SelectList from "../Ui/SelectList/SelectList";
import { useInput } from "../../Hooks/useInput";
import { observer } from "mobx-react-lite";
import CuisinesService from "../../Services/cuisines-service";
import CategoryService from "../../Services/category-service ";
import RecipeService from "../../Services/recipe-service";
import { Context } from "../..";
import { Spinner } from "react-bootstrap";

const SearchRecipeForm = (props) => {
  const [cuisineNames, setCuisineNames] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [selectedCuisineId, setSelectedCuisineId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchIngredients = useInput("", { minLengthError: 3 });
  const excludeIngredients = useInput("", { minLengthError: 3 });

  useEffect(() => {
    CuisinesService.getAll().then((response) => {
      const names = response.data.map((cuisine) => cuisine.name);
      setCuisineNames(names);
    });
    CategoryService.getAll().then((response) => {
      const names = response.data.map((category) => category.name);
      setCategoryNames(names);
    });
  }, []);
  const {recipe} =useContext(Context)
  if (isLoading) {
    return <Spinner animation="border" />;
  }
 const searchByIngredients = (searchIngredients, excludeIngredients) => {
  // Проверка на обязательные ингредиенты
  if (!searchIngredients) {
    console.warn("Не указаны обязательные ингредиенты для поиска.");
    recipe.setRecipes([]);
    return;
  }

  console.log("Поиск по ингредиентам:", searchIngredients);
  console.log("Исключить ингредиенты:", excludeIngredients);

  const allRecipes = recipe._constantRecipes;
  if (!Array.isArray(allRecipes)) {
    console.error("Некорректный формат данных рецептов.");
    return;
  }

  // Обработка обязательных ингредиентов
  const includeIngredients = searchIngredients
    .split(",")
    .map((ingr) => ingr.trim().toLowerCase())
    .filter((ingr) => ingr.length > 0);

  // Обработка исключаемых ингредиентов
  const excludeIngredientsArray = excludeIngredients
    ? excludeIngredients
        .split(",")
        .map((ingr) => ingr.trim().toLowerCase())
        .filter((ingr) => ingr.length > 0)
    : [];

  if (includeIngredients.length === 0) {
    console.warn("Не найдено валидных обязательных ингредиентов после обработки.");
    recipe.setRecipes([]);
    return;
  }

  const matchingRecipes = allRecipes.filter((r) => {
    if (!Array.isArray(r.ingredients)) {
      console.warn(`Рецепт "${r.name || 'Без названия'}" не имеет корректных ингредиентов.`);
      return false;
    }

    const recipeIngredientNames = r.ingredients
      .map((ingredient) => ingredient.name?.toLowerCase())
      .filter(Boolean);

    // Проверка на присутствие всех обязательных ингредиентов
    const hasAllIncluded = includeIngredients.every((searchIng) =>
      recipeIngredientNames.some((ingredientName) =>
        ingredientName.includes(searchIng)
      )
    );

    // Проверка на отсутствие всех исключенных ингредиентов
    const hasNoExcluded = excludeIngredientsArray.every((excludeIng) =>
      recipeIngredientNames.every((ingredientName) =>
        !ingredientName.includes(excludeIng)
      )
    );

    return hasAllIncluded && hasNoExcluded;
  });

  console.log(`Найдено рецептов: ${matchingRecipes.length}`, matchingRecipes);

  recipe.setRecipes(matchingRecipes);
};

   const fetchData = async () => {
       try {
         // Получаем данные из RecipeService
         const response = await RecipeService.getAll(selectedCuisineId,selectedCategoryId, recipe.page, recipe.limit ); // Получаем response от API
         const recipesData = response.data.rows; // Получаем данные рецептов из response
         const totalCount = response.data.count; // Получаем данные рецептов из response
         searchByIngredients(searchIngredients.value, excludeIngredients.value)
         console.log(recipesData)
         recipe.setTotalCount(0);

 
         
 
       } catch (error) {
         console.error("Ошибка при загрузке рецептов:", error);
         // Обработайте ошибку
       } finally {
         setIsLoading(false); // Заканчиваем загрузку
       }
     };;
      const searchReset= () =>{
       window.location.reload();
      } 
  return (
    <div className={classes.container}>
      <h1>Поиск блюд по ингредиентам</h1>
      <form className={`row g-3 ${classes.form}`}>
        <div className="col-md-6">
          <label htmlFor="ingredient" className="form-label">
            Желаемые ингредиенты
          </label>
          {searchByIngredients.isDirty && searchIngredients.isEmpty && (
            <div className={classes.errorText}>
              {searchIngredients.errorText}
            </div>
          )}
          <input
            type="text"
            className={`form-control ${
              searchIngredients.isDirty && searchIngredients.isEmpty
                ? "is-invalid"
                : ""
            }`}
            id="searchIngredients"
            placeholder="Введите ингредиент через запятую"
            onBlur={(e) => searchIngredients.onBlur(e)}
            onChange={(e) => searchIngredients.onChange(e)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ingredient" className="form-label">
            {" "}
            Исключить ингредиенты
          </label>
          <input
            type="text"
            className="form-control"
            id="excludeIngredients"
            placeholder="Введите ингредиент через запятую "
             onBlur={(e) => excludeIngredients.onBlur(e)}
            onChange={(e) => excludeIngredients.onChange(e)}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="cuisine" className="form-label">
            Калории
          </label>
          <SelectList id="category" key={categoryNames} options={categoryNames} value={selectedCategoryId} onChange={setSelectedCategoryId} />
        </div>
        <div className="col-md-4">
          <label htmlFor="category" className="form-label">
            Кухня
          </label>
          <SelectList
            className="text-dark"
            id="cuisine"
            value={selectedCuisineId}
            onChange={setSelectedCuisineId}
            options={cuisineNames}
            key={cuisineNames}
          />
        </div>
        <div className="col-12">
          <LightButton onClick={()=>fetchData(selectedCuisineId, selectedCategoryId )}> Найти рецепты</LightButton>
          <LightButton onClick={()=>searchReset()}> Сбросить поиск</LightButton>
        </div>
      </form>
    </div>
  );
};

export default observer(SearchRecipeForm);
