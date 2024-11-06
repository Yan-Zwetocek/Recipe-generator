import React from "react";

import RecipeItem from "../Components/RecipeItem/RecipeItem";
import SearchRecipeForm from "../Components/SearchRecipeForm/SearchRecipeForm";

const MainPages = (props) => {
  return (
    <div>
      <SearchRecipeForm />
      <RecipeItem />
    </div>
  );
};

export default MainPages;
