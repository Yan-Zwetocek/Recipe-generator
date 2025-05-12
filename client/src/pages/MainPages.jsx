import React, { useEffect, useState } from "react";
import { Context } from "..";
import RecipeItem from "../Components/RecipeItem/RecipeItem";
import SearchRecipeForm from "../Components/SearchRecipeForm/SearchRecipeForm";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import RecipeService from "../Services/recipe-service";
import { Spinner } from "react-bootstrap";
import PaginationList from "../Components/PaginationItem/PaginationList";

const MainPages = observer((props) => {
  const { user, recipe } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки


  useEffect(() => {
    setIsLoading(true); // Начинаем загрузку

    const fetchData = async () => {
      try {
        // Получаем данные из RecipeService
        const response = await RecipeService.getAll(null, null, recipe._page, recipe._limit); // Получаем response от API
        const recipesData = response.data.rows; // Получаем данные рецептов из response
        const pageCount = response.data.count; // Получаем данные рецептов из response
      
        // Устанавливаем данные в MobX store
        recipe.setTotalCount(pageCount);
        recipe.setConstantPage(pageCount);
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

  }, [recipe, recipe._page, ]); 
   useEffect(() => {
    setIsLoading(true); // Начинаем загрузку

    const fetchAllRecipe = async () => {
      try {
        // Получаем данные из RecipeService
        const response = await RecipeService.getAll(); // Получаем response от API
        const recipesData = response.data.rows; // Получаем данные рецептов из response

        // Устанавливаем данные в MobX store
        
        recipe.setConstantRecipes(recipesData);
       

        // Теперь данные в MobX store, больше не нужно setRecipes в useState

      } catch (error) {
        console.error("Ошибка при загрузке рецептов:", error);
        // Обработайте ошибку
      } finally {
        setIsLoading(false); // Заканчиваем загрузку
      }
    };

    fetchAllRecipe();

  }, []); // Добавляем recipe в dependency array. Если recipe меняется, useEffect выполнится снова


  if (isLoading) {
    return <Spinner animation="border" />;
  }

  // Получаем observable массив recipes из MobX store


return (
  <div>
    <SearchRecipeForm />
    {recipe._recipes.map((recipe) => (
      <RecipeItem key={recipe.id} recipe={recipe} />
    ))}
    <PaginationList />
    
  </div>
);


});

export default MainPages;