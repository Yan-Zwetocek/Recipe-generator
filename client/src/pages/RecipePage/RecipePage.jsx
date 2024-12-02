import React from "react";
import { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import classes from "./RecipePage.module.css";
import StepItem from "../../Components/StepItem/StepItem";
import CommentSection from "../../Components/Ui/CommentSection/CommentSection";
import RecipeNutrition from "../../Components/RecipeNutrition/RecipeNutrition ";

const RecipePage = observer(() => {
  const { recipe } = useContext(Context);
  const currentRecipe = recipe._recipes[0];
  const ingredients = currentRecipe.ingredients
  const totalBJUAndCalories = ingredients.reduce((acc, ingredient) => {
    if (ingredient.nutrition) {
      acc.protein += ingredient.nutrition.protein || 0;
      acc.fat += ingredient.nutrition.fat || 0;
      acc.carbs += ingredient.nutrition.carbs || 0;
      acc.calories += ingredient.nutrition.calories || 0;
    }
    return acc;
  }, { protein: 0, fat: 0, carbs: 0,  calories: 0 });
  return (
    <div className={classes.container}>
      <div className={classes.user__info}>
      <h2>Рецепт добавил </h2>
        <h3> {currentRecipe.user.userName}</h3>
        <div className={classes.user__avatar}>
          <img src={currentRecipe.user.avatar} alt="" />
        </div>
      </div>
      <div className={classes.recipe__info}>
        <h1> {currentRecipe.name}</h1>
        <div className={classes.recipe__img}>
          <img
            src="https://100foto.club/uploads/posts/2022-05/1653182402_4-100foto-club-p-pitstsa-margarita-s-kolbasoi-5.jpg"
            alt="Фото рецепта"
          />
        </div>
        <div className={classes.recipe__ingredients}>
          <h3>Ингредиенты для: {currentRecipe.name}</h3>
         {< ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}
              <span> -</span>
              <span> {ingredient.quantity}</span>
              </li>
            ))}
          </ul> }
          <RecipeNutrition carbs={totalBJUAndCalories.carbs} fat={totalBJUAndCalories.fat} calories={totalBJUAndCalories.calories} protein={totalBJUAndCalories.protein} />
        </div>
        <h3> Шаги рецепта</h3>
        <div className={classes.recipe__steps}>
          {currentRecipe.steps.map((step, index) => (
            <StepItem
              key={index} 
              stepText={step.text}
              number={index + 1} 
              img={step.imageUrl}
            />
          ))}
        </div>
        <CommentSection/>
      </div>
    </div>
  );
});

export default RecipePage;
