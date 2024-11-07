import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";
const isAuth = false;
const AppRouter = (props) => {
  return (
    <Routes>
      {isAuth &&
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
      <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
    </Routes>
  );
};

export default AppRouter;
