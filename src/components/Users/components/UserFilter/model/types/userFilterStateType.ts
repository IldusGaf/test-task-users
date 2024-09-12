import type { IUser } from "../../../../model/types/userListTypes";

export type IUserFilterStateType = Partial<
  Pick<IUser, "name" | "type_id"> & {
    last_visit_date: string[];
  }
>;
