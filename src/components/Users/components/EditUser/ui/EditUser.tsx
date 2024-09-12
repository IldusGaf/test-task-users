import { useGetUserTypeListQuery } from "../../../../../shared/model/api/userTypesApiSlice";
import type { CustomUserType } from "../../../types/customUserType";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "../../../../../shared/config/routerConfig";
import { UserForm } from "../../../ui/UserForm";
import dayjs from "dayjs";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../../../model/api/userListApiSlice";

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: dataUserTypeList, isError: isErrorUserTypeList } =
    useGetUserTypeListQuery();
  const { data: dataUser, isError: isErrorUser } = useGetUserQuery({
    userId: Number(id),
  });
  const [editUser] = useEditUserMutation();

  const onEditUser = async (values: CustomUserType) => {
    try {
      await editUser({
        userId: Number(id),
        ...values,
      }).unwrap();
      navigate(RoutePath.users);
    } catch (error) {
      console.error(error);
    }
  };

  return !isErrorUserTypeList &&
    dataUserTypeList?.data?.length &&
    !isErrorUser &&
    dataUser?.data ? (
    <UserForm
      onFinish={onEditUser}
      dataUserTypeList={dataUserTypeList.data}
      fields={Object.entries(dataUser.data).map(([key, value]) => ({
        name: [key],
        value: key === "last_visit_date" ? dayjs(value, "YYYY-MM-DD") : value,
      }))}
    />
  ) : null;
};
