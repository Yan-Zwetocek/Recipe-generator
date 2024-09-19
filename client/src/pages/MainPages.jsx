import React from 'react';
import SearchDishForm from '../Components/SearchDishForm/SearchDishForm';
import DishItem from '../Components/DishItem/DishItem';

const MainPages = (props) => {
    return (
  <div> 
    <SearchDishForm/>
    <DishItem/>
  </div>
    );
}

export default MainPages;