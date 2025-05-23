import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
const AppRouter = (props) => {
  const { user } = useContext(Context);
console.log(user._isAuth)
  return (
    <Routes>
      {user._isAuth &&
        authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
            exact
          />
        ))}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
          exact
        />
      ))}
      <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
    </Routes>
  );
};

export default observer(AppRouter) ;
