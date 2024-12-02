import React, { createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserStore from "./store/userStore";
import RecipeStore from "./store/recipeStor";
 export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ user: new UserStore(), recipe: new RecipeStore() }}>
    <App />
  </Context.Provider>
);

reportWebVitals();
