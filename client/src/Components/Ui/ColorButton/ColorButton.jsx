import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './ColorButton.module.css'

const ColorButton = ({ children, ...props}) => {
    return (
    <Button {...props} className={classes.button}> {children} </Button>
    );
}

export default ColorButton;