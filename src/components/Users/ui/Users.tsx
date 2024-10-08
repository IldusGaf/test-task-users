import { Link, Outlet, useMatch } from "react-router-dom";
import { UserList } from "../components/UserList";
import { Flex, Space } from "antd";
import { RoutePath } from "../../../shared/config/routerConfig";
import { UserFilter } from "../components/UserFilter";

export const Users = () => {
  const path = useMatch(RoutePath.users);
  return path ? (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex justify="end">
        <Link to={RoutePath.addUser}>Добавить пользователя</Link>
      </Flex>
      <UserFilter />
      <UserList />
    </Space>
  ) : (
    <Outlet />
  );
};
