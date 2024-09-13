import { Popconfirm, Space, Table } from "antd";
import type { ColumnType } from "antd/es/table";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useGetUserTypeListQuery } from "../../../../../shared/model/api/userTypesApiSlice";
import type { IUserType } from "../../../model/types/userTypes";
import { getSelectedFilterData } from "../../UserFilter";
import { useTypedSelector } from "../../../../../shared/hooks/store";
import {
  useDeleteUserMutation,
  useGetUserListQuery,
} from "../../../model/api/userListApiSlice";
import type { IUser } from "../../../model/types/userListTypes";
import { useAuth } from "../../../../../shared/hooks/useAuth";

export const UserList = () => {
  const selectedFilterData = useTypedSelector(getSelectedFilterData);

  const { data: dataUserList, isError: isErrorUserList } =
    useGetUserListQuery(selectedFilterData);

  const { data: dataUserTypeList } = useGetUserTypeListQuery();

  const { user, logout } = useAuth();

  const modifydataUserTypeList = dataUserTypeList?.data?.reduce(
    (acc: Record<number, IUserType>, item) => {
      acc[item.id] = item;
      return acc;
    },
    {}
  );

  const userType: Record<number, IUserType> = {};

  dataUserTypeList?.data?.forEach((element) => {
    userType[element.id] = element;
  });

  const [deleteUser] = useDeleteUserMutation();

  const onDeleteUser = async (id: number) => {
    try {
      await deleteUser({
        userId: id,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnType<IUser>[] = [
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
      render: (typeId) => <span>{userType[typeId]?.name ?? typeId}</span>,
    },
    {
      title: "Логин",
      dataIndex: "login",
      key: "login",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Имя пользователя",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
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
        const allowAllEdit =
          user && modifydataUserTypeList?.[user.type_id].allow_edit;
        const allowMySelf = user && user.id === record.id;
        return (user && allowAllEdit) || allowMySelf ? (
          <Space>
            <Link to={`/users/${record.id}`}>Редактировать</Link>
            <Popconfirm
              title="Вы уверены?"
              onConfirm={() => {
                onDeleteUser(record.id);
                logout();
              }}
            >
              <a>Удалить</a>
            </Popconfirm>
          </Space>
        ) : null;
      },
    },
  ];

  return !isErrorUserList && dataUserList?.data ? (
    <Table
      columns={columns}
      dataSource={dataUserList.data}
      size="small"
      rowKey={(record) => record.id}
      pagination={{ defaultPageSize: 9 }}
    />
  ) : null;
};
