import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "../../pages/SignInPage";
import App from "../../app/App";
import { ErrorPage } from "../../pages/ErrorPage";
import { MainPage } from "../../pages/MainPage";
import { userRoutes } from "../../pages/UserPages/config/routes";

export enum AppRoutes {
  MAIN = "main",
  USERS = "users",
  ADD_USER = "addUser",
  EDIT_USER = "editUser",
  SIGNIN = "signin",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.ADD_USER]: "/users/addUser",
  [AppRoutes.EDIT_USER]: "/users/:id",
  [AppRoutes.SIGNIN]: "/signin",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routerConfig = createBrowserRouter([
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
        path: RoutePath.signin,
        element: <SignInPage />,
      },
      ...userRoutes(),
    ],
  },
]);
