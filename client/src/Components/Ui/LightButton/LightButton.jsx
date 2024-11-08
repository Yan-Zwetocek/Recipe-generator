import { Button } from 'react-bootstrap';
import React from 'react';
import classes from './LightButton.module.css'

const LightButton = ({ children, ...props }) => {
  return (
    <Button {...props} className={`${classes.button} ${props.className}`}> 
      {children} 
    </Button>
  );
};

export default LightButton; 
