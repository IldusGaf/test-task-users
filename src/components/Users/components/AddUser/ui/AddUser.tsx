import { useGetUserTypeListQuery } from "../../../../../shared/model/api/userTypesApiSlice";
import type { CustomUserType } from "../../../types/customUserType";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../../../shared/config/routerConfig";
import { UserForm } from "../../../ui/UserForm";
import { useAddUserMutation } from "../../../model/api/userListApiSlice";

export const AddUser = () => {
  const { data: dataUserTypeList, isError: isErrorUserTypeList } =
    useGetUserTypeListQuery();
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();

  const onAddUser = async (values: CustomUserType) => {
    try {
      await addUser(values).unwrap();
      navigate(RoutePath.users);
    } catch (error) {
      console.error(error);
    }
  };

  return !isErrorUserTypeList && dataUserTypeList?.data?.length ? (
    <UserForm onFinish={onAddUser} dataUserTypeList={dataUserTypeList.data} />
  ) : null;
};
