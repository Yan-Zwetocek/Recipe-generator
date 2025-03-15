import React, { useEffect, useState } from "react"; // useState нужен для индикатора загрузки
import { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import classes from "./RecipePage.module.css";
import StepItem from "../../Components/StepItem/StepItem";
import CommentSection from "../../Components/Ui/CommentSection/CommentSection";
import RecipeNutrition from "../../Components/RecipeNutrition/RecipeNutrition ";
import RecipeService from "../../Services/recipe-service";
import { useParams } from "react-router-dom";
import { Image, Spinner } from "react-bootstrap";
import authService from "../../Services/auth-service";

const RecipePage = observer(() => {
  const { id } = useParams();
  const { recipe } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [recipeCreateUser, setRecipeCreateUser] = useState(null); // Добавляем состояние для currentRecipe

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await RecipeService.getById(id);
        setCurrentRecipe(response.data);
        console.log(currentRecipe);
      } catch (error) {
        console.error("Ошибка при загрузке рецепта:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await authService.getUserById(currentRecipe.userId);
        setRecipeCreateUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchUserData();
  }, []);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (!currentRecipe) {
    return <div>Рецепт не найден</div>;
  }
  const ingredients = currentRecipe.ingredients;

  const totalBJUAndCalories = ingredients.reduce((acc, ingredient) => {
    if (ingredient) {
      const quantity = ingredient.recipeIngredients[0].quantity;
  
     
  
      const proteinCalories = Math.round(ingredient.protein_content * quantity * 4);
      const fatCalories = Math.round(ingredient.fat_content * quantity * 9);
      const carbCalories = Math.round(ingredient.carbohydrate_content * quantity * 4);
  
      acc.calories += proteinCalories + fatCalories + carbCalories;
      acc.protein += ingredient.protein_content * quantity; // Убрали Math.round()
      acc.fat += ingredient.fat_content * quantity; // Убрали Math.round()
      acc.carbs += ingredient.carbohydrate_content * quantity; // Убрали Math.round()
    }
    return acc;
  }, { protein: 0, fat: 0, carbs: 0, calories: 0 });
  
  

  return (
    <div className={classes.container}>
      <div className={classes.user__info}>
        <h2>Рецепт добавил</h2>
        {recipeCreateUser.role === "USER" ? (
          <>
            <h3>{recipeCreateUser.username}</h3>
            <div className={classes.user__avatar}>
              {recipeCreateUser.avatar ? (
                <img src={recipeCreateUser.avatar} alt="аватар пользователя" />
              ) : (
                <img
                  src="/logo/chef-svgrepo-com (1).svg"
                  alt="аватар пользователя"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <h3>Поварёнок</h3>
            <div className={classes.user__avatar}>
              <img
                src="/logo/chef-svgrepo-com (1).svg"
                alt="аватар пользователя"
              />
            </div>
          </>
        )}
      </div>
      <div className={classes.recipe__info}>
        <h1>{currentRecipe.name}</h1>
        <p>{currentRecipe.description}</p>
        <div className={classes.recipe__img}>
          <Image
            src={process.env.REACT_APP_API_URL + currentRecipe.recipe_img}
          />
        </div>
        <div className={classes.recipe__ingredients}>
          <h3>Ингредиенты для: {currentRecipe.name}</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name}
                <span> -</span>
                <span>
                  {ingredient.recipeIngredients?.[0]?.quantity || "N/A"}
                </span>
                <span>
                  {ingredient.recipeIngredients?.[0]?.dimension_unit?.name ||
                    "N/A"}
                </span>
              </li>
            ))}
          </ul>
          <h3>Пищевая ценность на 100 грамм</h3>
          <RecipeNutrition
            carbs={totalBJUAndCalories.carbs}
            fat={totalBJUAndCalories.fat}
            calories={totalBJUAndCalories.calories}
            protein={totalBJUAndCalories.protein}
          />
        </div>
        <h3>Шаги рецепта</h3>
        <div className={classes.recipe__steps}>
          {currentRecipe.recipe_steps.map((step, index) => (
            <StepItem
              key={index}
              stepText={step.description}
              number={index + 1}
              img={step.step_image}
            />
          ))}
        </div>
        <CommentSection />
      </div>
    </div>
  );
});

export default RecipePage;
