import { Button } from 'react-bootstrap';
import React from 'react';
import classes from './LightButton.module.css'

    const LightButton = ({props, children}) => {
    return (
  <Button {...props} className={classes.button}> {children} </Button>
    );
}

export default LightButton;