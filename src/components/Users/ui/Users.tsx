import { Link } from "react-router-dom";
import { UserList } from "../UserList";
import { Flex } from "antd";
import { RoutePath } from "../../../app/providers/AppRouterProvider/config/routerConfig";

export const Users = () => {
  return (
    <>
      <Flex justify="end">
        <Link to={RoutePath.addUser}>Добавить пользователя</Link>
      </Flex>
      <UserList />
    </>
  );
};
