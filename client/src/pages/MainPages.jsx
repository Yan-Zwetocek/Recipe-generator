import React, { useEffect, useState } from "react";
import { Context } from "..";
import RecipeItem from "../Components/RecipeItem/RecipeItem";
import SearchRecipeForm from "../Components/SearchRecipeForm/SearchRecipeForm";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import RecipeService from "../Services/recipe-service";
import { Spinner } from "react-bootstrap";

const MainPages = observer((props) => {
  const { user, recipe } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    setIsLoading(true); // Начинаем загрузку

    const fetchData = async () => {
      try {
        // Получаем данные из RecipeService
        const response = await RecipeService.getAll(); // Получаем response от API
        const recipesData = response.data.rows; // Получаем данные рецептов из response
        console.log(recipesData)
        // Устанавливаем данные в MobX store
        recipe.setRecipes(recipesData);

        // Теперь данные в MobX store, больше не нужно setRecipes в useState

      } catch (error) {
        console.error("Ошибка при загрузке рецептов:", error);
        // Обработайте ошибку
      } finally {
        setIsLoading(false); // Заканчиваем загрузку
      }
    };

    fetchData();

  }, [recipe]); // Добавляем recipe в dependency array. Если recipe меняется, useEffect выполнится снова

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  // Получаем observable массив recipes из MobX store
  const recipes = recipe.getRecipes;

  return (
    <div>
      <SearchRecipeForm />
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
});

export default MainPages;