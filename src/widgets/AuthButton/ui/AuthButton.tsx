import { Link } from "react-router-dom";
import { RoutePath } from "../../../shared/config/routerConfig";
import { useAuth } from "../../../shared/hooks/useAuth";
import { Flex, Typography } from "antd";

export const AuthButton = () => {
  const { user, logout } = useAuth();
  return user?.name ? (
    <Flex gap={8} color="white" align="center" style={{ color: "white" }}>
      <Typography style={{ color: "inherit" }}>
        Добро пожаловать, {user.name}
      </Typography>
      <Link to={RoutePath.main} onClick={logout}>
        Выйти
      </Link>
    </Flex>
  ) : (
    <Link to={RoutePath.login}>Войти</Link>
  );
};
