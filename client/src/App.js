import React, { useContext, useEffect, useState } from "react"; // Не забудьте импортировать React!
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import AppRouter from "./Components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { Spinner } from "react-bootstrap";
import AdminPage from "./pages/AdminPage/AdminPage";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true); // Начинаем с true

  useEffect(() => {
    if (localStorage.getItem('token')) {
      user.checkAuth().finally(() => setLoading(false));
    } else {
      setLoading(false); // Если токена нет, сразу выключаем загрузку
    }
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});
 export default App