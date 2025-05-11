import React, { useContext } from 'react';
import classes from './PaginationList.module.css'; // Замените на реальный путь к вашему CSS module
 // Замените на реальный путь к вашему компоненту ColorButton
import { Context } from '../..';
import ColorButton from '../Ui/ColorButton/ColorButton';

const PaginationList = (props) => {
  const { recipe } = useContext(Context);
  const totalCount = Math.ceil(recipe.totalCount / recipe.limit);
  console.log(totalCount)
  const pages = [];
  for (let i = 0; i < totalCount; i++) {
    pages.push(i + 1);
  }

  const handlePageClick = (page) => {
    recipe.setPage(page); // Обновляем страницу в Context
  }

  return (
    <div className={classes.customPageItem}>
      {pages.map(page => (
        <ColorButton
          key={page} // Добавляем key для оптимизации рендеринга
          onClick={() => handlePageClick(page)} // Добавляем обработчик клика
          className={recipe.page === page ? classes.active: classes.button } // Добавляем класс для выбранной страницы
        >
          {page}
        </ColorButton>
      ))}
    </div>
  );
};

export default PaginationList;