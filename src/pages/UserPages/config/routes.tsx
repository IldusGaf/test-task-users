import type { RouteObject } from "react-router-dom";
import { RoutePath } from "../../../shared/config/routerConfig";
import { AddUserPage } from "../pages/AddUserPage/index";
import { UsersPage } from "../ui/UsersPage";
import { EditUserPage } from "../pages/EditUserPage";

export const userRoutes: () => RouteObject[] = () => [
  {
    path: RoutePath.users,
    element: <UsersPage />,
  },
  {
    path: RoutePath.addUser,
    element: <AddUserPage />,
  },
  {
    path: RoutePath.editUser,
    element: <EditUserPage />,
  },
];
