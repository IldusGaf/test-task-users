import { useNavigate } from "react-router-dom";
import type { ILoginRequest } from "../model/api/loginApiSlice";
import { useLoginMutation } from "../model/api/loginApiSlice";
import { RoutePath } from "../../../shared/config/routerConfig";
import { LoginForm } from "./LoginForm";
import { setCredentials } from "../model/slices/loginSlice";
import { useAppDispatch } from "../../../shared/hooks/store";
import { Flex, Typography } from "antd";

export const Login = () => {
  const [login, { isError }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogin = async (values: ILoginRequest) => {
    try {
      const user = await login(values).unwrap();
      if (user?.data) {
        dispatch(setCredentials(user.data));
        navigate(RoutePath.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex vertical>
      <LoginForm onFinish={onLogin} />
      {isError && (
        <Typography.Text type="danger">
          Неверный логин или пароль!
        </Typography.Text>
      )}
    </Flex>
  );
};
