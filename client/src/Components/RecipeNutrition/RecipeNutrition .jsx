import React from 'react';

const RecipeNutrition = ({ calories, protein, carbs, fat }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Питательная ценность</th>
          <th>Количество</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Калории</td>
          <td>{calories} ккал</td>
        </tr>
        <tr>
          <td>Белки (Б)</td>
          <td>{protein} г</td>
        </tr>
        <tr>
          <td>Углеводы (У)</td>
          <td>{carbs} г</td>
        </tr>
        <tr>
          <td>Жиры (Ж)</td>
          <td>{fat} г</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RecipeNutrition;

