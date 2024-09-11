import { Button, DatePicker, Form, FormProps, Input, Select } from "antd";
import { UserType } from "../../../shared/types/userTypes";

interface UserFormProps<T> {
  onFinish: (value: T) => void;
  dataUserTypeList: UserType[] | null;
  fields?: FormProps["fields"];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserForm = <T extends Record<string, any>>({
  onFinish,
  dataUserTypeList,
  fields,
}: UserFormProps<T>) => {
  return (
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
      onFinish={onFinish}
      fields={fields}
    >
      <Form.Item
        label="Логин"
        name={"login"}
        rules={[{ required: true, message: "Введите данные!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name={"password"}
        rules={[{ required: true, message: "Введите данные!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Имя"
        name={"name"}
        rules={[{ required: true, message: "Введите данные!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Тип"
        name={"type_id"}
        rules={[{ required: true, message: "Выберите значение!" }]}
      >
        <Select
          options={dataUserTypeList?.map((type) => ({
            value: type.id,
            label: type.name,
          }))}
        ></Select>
      </Form.Item>
      <Form.Item
        name={"last_visit_date"}
        label="Дата последнего визита"
        rules={[{ required: true, message: "Выберите дату!" }]}
      >
        <DatePicker format={"DD.MM.YYYY"} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
