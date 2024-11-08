import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import classes from "./Heder.module.css";
import LightButton from "../Ui/LightButton/LightButton";
import Input from "../Ui/Input/Input";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const Header = observer( () => {
  const { user } = useContext(Context);
  console.log(user._isAuth);
  return (
    <Navbar collapseOnSelect expand="lg" className={classes.heder}>
      <Navbar.Brand>
        <img
          src="/logo/chef-svgrepo-com (1).svg"
          alt="logo"
          className={classes.logo}
          />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="response__navbar-nav" />

      <Navbar.Collapse id="response__navbar-nav">
        <Nav className="mr-auto">
          <Input placeholder="Поиск блюд по названию" type="text" />
        </Nav>
        <Nav className="ms-auto">
          <br />
          <LightButton> Добавить рецепт </LightButton>

          {user._isAuth ? (
            <LightButton> Выйти </LightButton>
          ) : (
            <LightButton>
              {" "}
              Войти{" "}
            </LightButton>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Header
