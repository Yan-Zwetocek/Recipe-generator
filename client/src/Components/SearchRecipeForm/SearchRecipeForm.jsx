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
  const desiredIngredients = useInput("", { minLengthError: 3 });

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
   const fetchData = async () => {
       try {
         // Получаем данные из RecipeService
         const response = await RecipeService.getAll(selectedCuisineId,selectedCategoryId, recipe.page, recipe.limit ); // Получаем response от API
         const recipesData = response.data.rows; // Получаем данные рецептов из response
         const totalCount = response.data.count; // Получаем данные рецептов из response
         console.log(recipesData)
         // Устанавливаем данные в MobX store
         recipe.setRecipes(recipesData);
         recipe.setTotalCount(totalCount);
 
         
 
       } catch (error) {
         console.error("Ошибка при загрузке рецептов:", error);
         // Обработайте ошибку
       } finally {
         setIsLoading(false); // Заканчиваем загрузку
       }
     };;
  return (
    <div className={classes.container}>
      <h1>Поиск блюд по ингредиентам</h1>
      <form className={`row g-3 ${classes.form}`}>
        <div className="col-md-6">
          <label htmlFor="ingredient" className="form-label">
            Желаемые ингредиенты
          </label>
          {desiredIngredients.isDirty && desiredIngredients.isEmpty && (
            <div className={classes.errorText}>
              {desiredIngredients.errorText}
            </div>
          )}
          <input
            type="text"
            className={`form-control ${
              desiredIngredients.isDirty && desiredIngredients.isEmpty
                ? "is-invalid"
                : ""
            }`}
            id="ingredient"
            placeholder="Введите ингредиент"
            onBlur={(e) => desiredIngredients.onBlur(e)}
            onChange={(e) => desiredIngredients.onChange(e)}
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
            id="ingredient"
            placeholder="Введите ингредиент"
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="cuisine" className="form-label">
            Калории
          </label>
          <SelectList id="category" options={categoryNames} value={selectedCategoryId} onChange={setSelectedCategoryId} />
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
          />
        </div>
        <div className="col-12">
          <LightButton onClick={()=>fetchData(selectedCuisineId, selectedCategoryId )}> Найти рецепты</LightButton>
        </div>
      </form>
    </div>
  );
};

export default observer(SearchRecipeForm);
