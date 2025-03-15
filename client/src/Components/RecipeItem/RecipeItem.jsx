import React from "react";
import classes from "./RecipeItem.module.css";
import ColorButton from "../Ui/ColorButton/ColorButton";
import { Image } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { RECIPE_ROUTE } from "../../utils/consts";
const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate()
  return (
    <div className={classes.container}>
      <div className={classes.dish__box}>
        <h1>{recipe.name}</h1>
        <div className={classes.dish__info}>
          <div className={classes.picture__box}>
        <Image src={ process.env.REACT_APP_API_URL + recipe.recipe_img}/>
          </div>
        </div>
        <p>
            {recipe.description}
        </p>
      <ColorButton onClick={()=> navigate(RECIPE_ROUTE +'/' + recipe.id)}>Полный рецепт</ColorButton>
      </div>
    </div>
  );
};

export default RecipeItem;
