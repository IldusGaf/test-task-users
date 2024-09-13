import { UserFilterForm } from "./UserFilterForm";
import { useGetUserTypeListQuery } from "../../../../../shared/model/api/userTypesApiSlice";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../../shared/hooks/store";
import { setSelectedFilterData } from "../model/slices/usersFilterSlice";
import type { Dayjs } from "dayjs";
import type { IUserFilterStateType } from "../model/types/userFilterStateType";
import dayjs from "dayjs";
import { getSelectedFilterData } from "..";

type UserFilterFormType = Omit<IUserFilterStateType, "last_visit_date"> & {
  last_visit_date?: Dayjs[];
};

export const UserFilter = () => {
  const { data: dataUserTypeList, error: isErrorUserTypeList } =
    useGetUserTypeListQuery();

  const initialSelectedFilterData = useTypedSelector(getSelectedFilterData);

  const dispatch = useAppDispatch();

  const onApplyFilter = (values: UserFilterFormType) => {
    dispatch(
      setSelectedFilterData({
        ...values,
        last_visit_date: values.last_visit_date?.map((date) =>
          date.toISOString()
        ),
      })
    );
  };

  return (
    <>
      {!isErrorUserTypeList && dataUserTypeList?.data?.length && (
        <UserFilterForm<UserFilterFormType>
          onFinish={onApplyFilter}
          dataUserTypeList={dataUserTypeList.data}
          initialValues={{
            ...initialSelectedFilterData,
            last_visit_date: initialSelectedFilterData.last_visit_date?.map(
              (string) => dayjs(string)
            ),
          }}
        />
      )}
    </>
  );
};
