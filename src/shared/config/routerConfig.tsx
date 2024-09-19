import { createHashRouter } from "react-router-dom";
import App from "../../app/App";
import { ErrorPage } from "../../pages/ErrorPage";
import { MainPage } from "../../pages/MainPage";
import { userRoutes } from "../../pages/UserPages/config/routes";
import { LoginPage } from "../../pages/LoginPage";

export enum AppRoutes {
  MAIN = "main",
  USERS = "users",
  ADD_USER = "addUser",
  EDIT_USER = "editUser",
  LOGIN = "login",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.ADD_USER]: "/users/addUser",
  [AppRoutes.EDIT_USER]: "/users/:id",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routerConfig = createHashRouter([
  {
    path: RoutePath.main,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePath.main,
        element: <MainPage />,
      },
      {
        path: RoutePath.login,
        element: <LoginPage />,
      },
      ...userRoutes(),
    ],
  },
]);
