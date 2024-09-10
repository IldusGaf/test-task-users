import { Form, Popconfirm, Space, Table, Typography } from "antd";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserListQuery,
} from "../model/api/userListApiSlice";
import { ColumnType } from "antd/es/table";
import { User } from "../model/types/userListTypes";
import { format } from "date-fns";
import { useState } from "react";
import { AnyObject } from "antd/es/_util/type";
import { EditableCell } from "../components/EditableCell";

type CustomColumnsType<RecordType = AnyObject> = (ColumnType<RecordType> & {
  editable?: boolean;
})[];

export const UserList = () => {
  const { data: dataUserList, isError: isErrorUserList } = useGetUserListQuery(
    {}
  );
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null>(null);

  const isEditing = (record: User) => record.id === editingKey;
  const edit = (record: User) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const onSaveUser = async (id: number) => {
    try {
      const editedData = await form.validateFields();
      await editUser({
        userId: id,
        ...editedData,
      }).unwrap();
      setEditingKey(null);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteUser = async (id: number) => {
    try {
      await deleteUser({
        userId: id,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: CustomColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Тип пользователя",
      dataIndex: "type_id",
      key: "type_id",
      render: (text) => <span>{text}</span>,
      editable: true,
    },
    {
      title: "Имя пользователя",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
      editable: true,
    },
    {
      title: "Дата последнего визита",
      dataIndex: "last_visit_date",
      key: "last_visit_date",
      render: (text) => <span>{format(new Date(text), "dd.MM.yyyy")}</span>,
    },
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Typography.Link
              onClick={() => onSaveUser(record.id)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Сохранить
            </Typography.Link>
            <Popconfirm title="Вы уверены?" onConfirm={cancel}>
              <a>Отмена</a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== null}
              onClick={() => edit(record)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Редактировать
            </Typography.Link>
            <Popconfirm
              title="Вы уверены?"
              onConfirm={() => onDeleteUser(record.id)}
            >
              <a>Удалить</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns: CustomColumnsType<User> = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: User) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    } as ColumnType<User>;
  });

  return !isErrorUserList && dataUserList?.data?.length ? (
    <Form form={form} component={false}>
      <Table
        columns={mergedColumns}
        dataSource={dataUserList.data}
        size="small"
        rowClassName="editable-row"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  ) : null;
};
