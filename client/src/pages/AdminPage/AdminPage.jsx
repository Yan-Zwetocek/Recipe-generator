import React, { useState } from 'react';
import ColorButton from '../../Components/Ui/ColorButton/ColorButton';
import classes from './AdminPage.module.css'
import CuisineModal from '../../Components/AdminModals/CuisineModal';
import CategoryModal from '../../Components/AdminModals/CategoryModal';
import IngredientModal from '../../Components/AdminModals/IngredientModal';

const AdminPage = (props) => {
  const [cuisineModalActive, setCuisineModalActive] = useState(false)
  const [categoryModalActive, setCategoryModalActive] = useState(false)
  const [ingredientModalActive, setIngredientModalActive] = useState(false)
    return (
      <div className={classes.container}>  
      <label htmlFor="" className="h3 fw-bold"> Панель администратора </label>
    <ColorButton className={classes.button} onClick={()=> setCuisineModalActive(true)}> Добавить кухню </ColorButton>
    <ColorButton className={classes.button} onClick={()=> setCategoryModalActive(true)}> Добавить категорию </ColorButton>
    <ColorButton className={classes.button} onClick={()=> setIngredientModalActive(true)}> Добавить ингридиент </ColorButton>
    <CuisineModal active={cuisineModalActive} setActive={setCuisineModalActive}/>
    <CategoryModal active={categoryModalActive} setActive={setCategoryModalActive}/>
    <IngredientModal active={ingredientModalActive} setActive={setIngredientModalActive}/>
  </div>
    );
}

export default AdminPage;