import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

interface ILoginFormProps<T> {
  onFinish: (value: T) => void;
  fields?: FormProps["fields"];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoginForm = <T extends Record<string, any>>({
  onFinish,
  fields,
}: ILoginFormProps<T>) => {
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
