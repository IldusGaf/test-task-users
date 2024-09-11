import { Link } from "react-router-dom";
import { UserList } from "../components/UserList";
import { Flex } from "antd";
import { RoutePath } from "../../../shared/config/routerConfig";

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
