import React, { useContext, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import classes from "./Heder.module.css";
import LightButton from "../Ui/LightButton/LightButton";
import Input from "../Ui/Input/Input";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import Modal from "../Ui/Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import { NavLink } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../../utils/consts";

const Header = observer(() => {
  const [ modelActive, setModalActive ] = useState(false);
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
            <LightButton onClick={()=>setModalActive(true)}> Войти </LightButton>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal active={modelActive} setActive={setModalActive}>
       <LoginForm> Войти</LoginForm>
       <div> Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}onClick={()=>setModalActive(false)} > Зарегистрируйтесь </NavLink> </div>
      </Modal>
    </Navbar>
  );
});

export default Header;
