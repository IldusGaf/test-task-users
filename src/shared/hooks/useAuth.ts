import { useMemo } from "react";
import { getUser, clearCredentials } from "../../components/Login";
import { useAppDispatch, useTypedSelector } from "./store";

export const useAuth = () => {
  const user = useTypedSelector(getUser);
  const dispatch = useAppDispatch();

  const logout = () => dispatch(clearCredentials());

  return useMemo(() => ({ user, logout }), [user, logout]);
};
