import React from "react";  
import { Button, Nav, Navbar } from "react-bootstrap";  
import classes from './Heder.module.css';  
import LightButton from "../Ui/LightButton/LightButton";
import Input from "../Ui/Input/Input";
  
const Heder = (props) => {  
  return (  
    <Navbar collapseOnSelect expand="lg" className={classes.heder}>  
      <Navbar.Brand>  
        <img src="/logo/chef-svgrepo-com (1).svg" alt="logo" className={classes.logo} />  
      </Navbar.Brand>  
      <Navbar.Toggle aria-controls="response__navbar-nav" />  
  
      <Navbar.Collapse id="response__navbar-nav">  
        <Nav className="mr-auto"> 
          <Input placeholder="Поиск блюд по названию" type='text'/> 
        </Nav>  
        <Nav className="ms-auto">  
          <br/>
        <LightButton> Войти </LightButton>  
        </Nav>  
      </Navbar.Collapse>  
    </Navbar>  
  );  
};  
  
export default Heder;  
