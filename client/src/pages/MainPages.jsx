import React from 'react';
import SearchDishForm from '../Components/SearchDishForm/SearchDishForm';
import RecipeItem from '../Components/RecipeItem/RecipeItem';

const MainPages = (props) => {
    return (
  <div> 
    <SearchDishForm/>
    <RecipeItem/>
  </div>
    );
}

export default MainPages;