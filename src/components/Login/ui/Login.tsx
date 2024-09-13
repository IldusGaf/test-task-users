import { useNavigate } from "react-router-dom";
import type { ILoginRequest} from "../model/api/loginApiSlice";
import { useLoginMutation } from "../model/api/loginApiSlice";
import { RoutePath } from "../../../shared/config/routerConfig";
import { LoginForm } from "./LoginForm";
import { setCredentials } from "../model/slices/loginSlice";
import { useAppDispatch } from "../../../shared/hooks/store";

export const Login = () => {
  const [login] = useLoginMutation();
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

  return <LoginForm onFinish={onLogin} />;
};
