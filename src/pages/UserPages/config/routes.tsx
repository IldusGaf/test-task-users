import { Link, type RouteObject } from "react-router-dom";
import { RoutePath } from "../../../shared/config/routerConfig";
import { AddUserPage } from "../pages/AddUserPage/index";
import { UsersPage } from "../ui/UsersPage";
import { EditUserPage } from "../pages/EditUserPage";

export const userRoutes: () => RouteObject[] = () => {
  return [
    {
      path: RoutePath.users,
      element: <UsersPage />,
      handle: {
        crumb: () => <Link to={RoutePath.users}>{"Пользователи"}</Link>,
      },
      children: [
        {
          path: RoutePath.addUser,
          element: <AddUserPage />,
          handle: {
            crumb: () => <Link to={RoutePath.addUser}>{"Добавление"}</Link>,
          },
        },
        {
          path: RoutePath.editUser,
          element: <EditUserPage />,
          handle: {
            crumb: (data: string) => (
              <Link to={`${RoutePath.users}/${data}`}>{"Редактирование"}</Link>
            ),
          },
        },
      ],
    },
  ];
};
