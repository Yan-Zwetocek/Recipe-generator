import React from 'react'; 
import classes from './SearchRecipeForm.module.css'; 
import LightButton from '../Ui/LightButton/LightButton';

const SearchRecipeForm = (props) => { 
    return ( 
        <div className={classes.container}>  
            <h1>Поиск блюд по ингредиентам</h1> 
            <form className={`row g-3 ${classes.form}`}>
                <div className="col-md-6">
                    <label htmlFor="ingredient" className="form-label">Желаемые ингредиенты</label>
                    <input type="text" className="form-control" id="ingredient" placeholder="Введите ингредиент" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="ingredient" className="form-label"> Исключить ингредиенты</label>
                    <input type="text" className="form-control" id="ingredient" placeholder="Введите ингредиент" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="cuisine" className="form-label">Кухня</label>
                    <select id="cuisine" className="form-select">
                        <option selected>Выберите кухню...</option>
                        <option value="italian">Итальянская</option>
                        <option value="chinese">Китайская</option>
                        <option value="indian">Индийская</option>
                    </select>
                </div>
                <div className="col-12">
                      <LightButton> Найти рецепты</LightButton>
                </div>
            </form> 
        </div> 
    ); 
} 

export default SearchRecipeForm;
