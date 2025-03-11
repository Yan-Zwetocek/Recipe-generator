import React, { useState } from 'react';
import ColorButton from '../../Components/Ui/ColorButton/ColorButton';
import classes from './AdminPage.module.css'
import CuisineModal from '../../Components/AdminModals/CuisineModal';
import CategoryModal from '../../Components/AdminModals/CategoryModal';
import IngredientModal from '../../Components/AdminModals/IngredientModal';
import DimensionUnitsModal from '../../Components/AdminModals/dimensionUnitsModal';

const AdminPage = (props) => {
  const [cuisineModalActive, setCuisineModalActive] = useState(false)
  const [categoryModalActive, setCategoryModalActive] = useState(false)
  const [ingredientModalActive, setIngredientModalActive] = useState(false)
  const [dimensionUnitsModalActive, setDimensionUnitsModalActive] = useState(false)
    return (
      <div className={classes.container}>  
      <label htmlFor="" className="h3 fw-bold"> Панель администратора </label>
    <ColorButton className={classes.button} onClick={()=> setCuisineModalActive(true)}> Добавить кухню </ColorButton>
    <ColorButton className={classes.button} onClick={()=> setCategoryModalActive(true)}> Добавить категорию </ColorButton>
    <ColorButton className={classes.button} onClick={()=> setIngredientModalActive(true)}> Добавить ингридиент </ColorButton>
    <ColorButton className={classes.button} onClick={()=> setDimensionUnitsModalActive(true)}> Добавить единицу измерения </ColorButton>
    <CuisineModal active={cuisineModalActive} setActive={setCuisineModalActive}/>
    <CategoryModal active={categoryModalActive} setActive={setCategoryModalActive}/>
    <IngredientModal active={ingredientModalActive} setActive={setIngredientModalActive}/>
    <DimensionUnitsModal active={dimensionUnitsModalActive} setActive={setDimensionUnitsModalActive}/>
  </div>
    );
}

export default AdminPage;