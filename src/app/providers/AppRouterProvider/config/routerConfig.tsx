import { createBrowserRouter, Link } from "react-router-dom";
import { SignInPage } from "../../../../pages/SignInPage";
import App from "../../../App";
import { ErrorPage } from "../../../../pages/ErrorPage";
import { MainPage } from "../../../../pages/MainPage";
import { UsersPage } from "../../../../pages/UsersPage";
import { AddUserPage } from "../../../../pages/UsersPage/AddUserPage";
export enum AppRoutes {
  MAIN = "main",
  USERS = "users",
  ADD_USER = "addUser",
  SIGNIN = "signin",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.USERS]: "users",
  [AppRoutes.ADD_USER]: "/users/addUser",
  [AppRoutes.SIGNIN]: "signin",
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
        handle: {
          // you can put whatever you want on a route handle
          // here we use "crumb" and return some elements,
          // this is what we'll render in the breadcrumbs
          // for this route
          crumb: () => <Link to="/messages">Messages</Link>,
        },
      },
      {
        path: RoutePath.users,
        element: <UsersPage />,
      },
      {
        path: RoutePath.addUser,
        element: <AddUserPage />,
      },
      {
        path: RoutePath.signin,
        element: <SignInPage />,
      },
    ],
  },
]);
