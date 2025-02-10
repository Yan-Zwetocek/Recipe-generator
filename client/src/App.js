import React, { useContext, useEffect, useState } from "react"; // Не забудьте импортировать React!
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import AppRouter from "./Components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { Spinner } from "react-bootstrap";

const App = () => {
  const { user } = useContext(Context); // Вызываем useContext ВНУТРИ компонента
  const [loading, setLoading] = useState(false);
  useEffect(() => { 
    if (localStorage.getItem('token')) {
      user.checkAuth().then((value) => {
        setLoading(true)
      }).finally(() => {
        setLoading(false); // Stop loading
      });
    }
  }, []);
 if(loading){
  return <Spinner/>
 }
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default observer(App); // Оборачиваем React-компонент в observer
