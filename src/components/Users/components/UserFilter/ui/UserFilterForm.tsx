import { Button, DatePicker, Form, Input, Select } from "antd";
import { IUserType } from "../../../model/types/userTypes";

interface IUserFilterFormProps<T> {
  onFinish: (value: T) => void;
  dataUserTypeList: IUserType[] | null;
  initialValues?: T;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserFilterForm = <T extends Record<string, any>>({
  onFinish,
  dataUserTypeList,
  initialValues,
}: IUserFilterFormProps<T>) => {
  const { RangePicker } = DatePicker;
  return (
    <Form layout="inline" onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        label="Имя"
        name={"name"}
        labelCol={{
          span: 4,
        }}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        label="Тип"
        name={"type_id"}
        labelCol={{
          span: 3,
        }}
        style={{ width: "20%" }}
      >
        <Select
          allowClear
          options={dataUserTypeList?.map((type) => ({
            value: type.id,
            label: type.name,
          }))}
        ></Select>
      </Form.Item>
      <Form.Item
        label="Дата последнего визита"
        name="last_visit_date"
        labelCol={{
          span: 10,
        }}
      >
        <RangePicker format={"DD.MM.YYYY"} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Поиск
        </Button>
      </Form.Item>
    </Form>
  );
};
