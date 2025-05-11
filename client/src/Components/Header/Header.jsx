import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import classes from "./Heder.module.css";
import LightButton from "../Ui/LightButton/LightButton";
import Input from "../Ui/Input/Input";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import Modal from "../Ui/Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import { NavLink, useNavigate } from "react-router-dom";
import {
  REGISTRATION_ROUTE,
  CREATE_ROUTE,
  MAIN_ROUTE,
  ADMIN_ROUTE,
} from "../../utils/consts";
import RecipeService from "../../Services/recipe-service";

const Header = observer(() => {
  const [roleChecked, setRoleChecked] = useState(false);
  const [modelActive, setModalActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const { user, recipe } = useContext(Context);
  const navigate = useNavigate(); // Добавили useNavigate

  useEffect(() => {
    const fetchData = async ()=>{
      try{
        const response = await RecipeService.getAll(); 
        setRecipeList(response.data.rows)
      

      }
      catch(e){
       alert(e)
      }
    }
    fetchData()
  }, []);

  
  useEffect(() => {
    if (user._isAuth) {
      setModalActive(false);
      if (user.user.data?.role === "ADMIN") {
        setRoleChecked(true);
      } else {
        setRoleChecked(false);
      }
    }
  }, [user._isAuth]);


  useEffect(() => {
    const debounce = setTimeout(async () => {
      const filteredRecipe = await searchRecipe(searchTerm); // ⏳ ждём результат
      if(filteredRecipe==! undefined){
        recipe.setRecipes(filteredRecipe);

      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const searchRecipe = async (searchText) => {
    if (!searchText) {
       recipe.setRecipes(recipe._constantRecipes);
       recipe.setTotalCount(recipe._constantPage);
       
      return;
    } else {
      const foundRecipe = recipeList.filter(({ name }) => 
        name.toLowerCase().includes(searchText.toLowerCase())
      );
      recipe.setRecipes(foundRecipe);
      recipe.setTotalCount(0);
      return foundRecipe;
    
      
    }
  };
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
          <Input
            placeholder="Поиск блюд по названию"
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Nav>
        <Nav className="ms-auto">
          <br />
          <LightButton
            className={classes.button}
            onClick={() => navigate(CREATE_ROUTE)}
          >
            Добавить рецепт
          </LightButton>
          {roleChecked ? (
            <LightButton
              className={classes.button}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Админ панель
            </LightButton>
          ) : null}

          {user._isAuth ? (
            <LightButton onClick={() => user.logout()}> Выйти </LightButton>
          ) : (
            <LightButton onClick={() => setModalActive(true)}>
              {" "}
              Войти{" "}
            </LightButton>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal active={modelActive} setActive={setModalActive}>
        <LoginForm isReg={false} className={classes.button}>
          {" "}
          Войти
        </LoginForm>
        <div>
          {" "}
          Нет аккаунта?{" "}
          <NavLink
            to={REGISTRATION_ROUTE}
            onClick={() => setModalActive(false)}
          >
            {" "}
            Зарегистрируйтесь{" "}
          </NavLink>{" "}
        </div>
      </Modal>
    </Navbar>
  );
});

export default Header;
