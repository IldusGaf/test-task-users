import type { IUserType } from "../model/types/userTypes";

export const mapUserTypeList = (dataUserTypeList: IUserType[]) =>
  dataUserTypeList?.reduce((acc: Record<number, IUserType>, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
