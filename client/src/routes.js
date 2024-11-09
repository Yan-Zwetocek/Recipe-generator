import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import RecipePage from "./pages/RecipePage";
import FavoritesPage from "./pages/FavoritesPage";
import MainPages from "./pages/MainPages";
import { ADMIN_ROUTE, CREATE_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, RECIPE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <AdminPage/>,
  },
  {
    path: FAVORITES_ROUTE,
    element: <FavoritesPage/>,
  },
  {
    path: CREATE_ROUTE,
    element: <CreateRecipePage/>,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    element: <MainPages/>,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <AuthPage/>,
  },
  {
    path: LOGIN_ROUTE,
    element: <AuthPage/>,
  },
  {
    path: RECIPE_ROUTE +'/:id',
    element: <RecipePage/>,
  },
];
