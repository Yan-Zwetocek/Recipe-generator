
import React, { useEffect, useState } from "react";
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
  const [recipeCreateUser, setRecipeCreateUser] = useState(null);
  const [error, setError] = useState(null); // Состояние для хранения ошибки

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Сбрасываем ошибку при новом запросе
      try {
        const recipeResponse = await RecipeService.getById(id);
        setCurrentRecipe(recipeResponse.data);

        const userResponse = await authService.getUserById(
          recipeResponse.data.userId
        );
        setRecipeCreateUser(userResponse.data);
      } catch (e) {
        console.error("Ошибка при загрузке данных:", e);
        setError("Не удалось загрузить данные. Попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!currentRecipe) {
    return <div>Рецепт не найден</div>;
  }

  const ingredients = currentRecipe.ingredients;

  const totalBJUAndCalories = ingredients.reduce(
    (acc, ingredient) => {
      if (ingredient) {
        const quantity = ingredient.recipeIngredients[0].quantity;

        const proteinCalories = Math.round(
          ingredient.protein_content * quantity * 4
        );
        const fatCalories = Math.round(ingredient.fat_content * quantity * 9);
        const carbCalories = Math.round(
          ingredient.carbohydrate_content * quantity * 4
        );

        acc.calories += proteinCalories + fatCalories + carbCalories;
        acc.protein += ingredient.protein_content * quantity;
        acc.fat += ingredient.fat_content * quantity;
        acc.carbs += ingredient.carbohydrate_content * quantity;
      }
      return acc;
    },
    { protein: 0, fat: 0, carbs: 0, calories: 0 }
  );

  return (
    <div className={classes.container}>
      <div className={classes.user__info}>
        <h2>Рецепт добавил</h2>
        {recipeCreateUser ? ( // Проверяем, что recipeCreateUser существует
          recipeCreateUser?.role === "USER" ? ( // Используем опциональную цепочку
            <>
              <h3>{recipeCreateUser?.username}</h3> {/* Используем опциональную цепочку */}
              <div className={classes.user__avatar}>
                {recipeCreateUser?.avatar ? ( // Используем опциональную цепочку
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
          )
        ) : (
           <Spinner animation="border" />
        )}
      </div>
      <div className={classes.recipe__info}>
        <h1>{currentRecipe.name}</h1>
        <p>{currentRecipe.description}</p>
        <span> Время приготовления</span>
        <span> - </span>
        <span>{currentRecipe.time_to_prepare}</span>
        <span> минут </span>
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
                  {
                    ingredient.recipeIngredients?.[0]?.dimension_unit?.name ||
                    "N/A"
                  }
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
        <CommentSection recipeId={id} />
      </div>
    </div>
  );
});

export default RecipePage;
