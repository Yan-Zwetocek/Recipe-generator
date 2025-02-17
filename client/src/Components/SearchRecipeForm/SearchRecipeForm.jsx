import React, { useEffect, useState } from "react";
import classes from "./SearchRecipeForm.module.css";
import LightButton from "../Ui/LightButton/LightButton";
import SelectList from "../Ui/SelectList/SelectList";
import { useInput } from "../../Hooks/useInput";
import { observer } from "mobx-react-lite";
import CuisinesService from "../../Services/cuisines-service";
import CategoryService from "../../Services/category-service ";

const SearchRecipeForm = (props) => {
  const [cuisineNames, setCuisineNames] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

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
  const desiredIngredients = useInput("", { isEmpty: true });
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
          <SelectList id="category" options={categoryNames} />
        </div>
        <div className="col-md-4">
          <label htmlFor="category" className="form-label">
            Кухня
          </label>
          <SelectList
            className="text-dark"
            id="cuisine"
            options={cuisineNames}
          />
        </div>
        <div className="col-12">
          <LightButton> Найти рецепты</LightButton>
        </div>
      </form>
    </div>
  );
};

export default observer(SearchRecipeForm);
