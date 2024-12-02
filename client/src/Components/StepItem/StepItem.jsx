import React from 'react';
import classes from './StepItem.module.css'
const StepItem = ({ stepText, number, img, ...props}) => {
    return (
  <div className={classes.container}> 
   <div className={classes.step__text}>
    <h4> ШАГ №{number}</h4>
      <p> {stepText}</p>
   </div>
   <div className={classes.step__img}>
   <img src={img} alt='фото шага' />
   </div>

  </div>
    );
}

export default StepItem;