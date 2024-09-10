import { Button, DatePicker, Form, Input, Select } from "antd";
import { useGetUserTypeListQuery } from "../../../../shared/model/api/userTypesApiSlice";
import { useAddUserMutation } from "../../UserList/model/api/userListApiSlice";
import { AddUserType } from "../types/addUserType";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../../app/providers/AppRouterProvider/config/routerConfig";

export const AddUser = () => {
  const { data: dataUserTypeList, isError: isErrorUserTypeList } =
    useGetUserTypeListQuery();
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();

  const onAddUser = async (values: AddUserType) => {
    try {
      await addUser(values).unwrap();
      navigate(`/${RoutePath.users}`);
    } catch (error) {
      console.error(error);
    }
  };

  return !isErrorUserTypeList && dataUserTypeList?.data?.length ? (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        width: 600,
      }}
      onFinish={onAddUser}
    >
      <Form.Item label="Логин" name={"login"}>
        <Input />
      </Form.Item>
      <Form.Item label="Пароль" name={"password"}>
        <Input />
      </Form.Item>
      <Form.Item label="Имя" name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label="Тип" name={"type_id"}>
        <Select
          options={dataUserTypeList.data.map((type) => ({
            value: type.id,
            label: type.name,
          }))}
        ></Select>
      </Form.Item>

      <Form.Item name={"last_visit_date"} label="Дата последнего визита">
        <DatePicker />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  ) : null;
};
