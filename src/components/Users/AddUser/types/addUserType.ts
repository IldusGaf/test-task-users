import { User } from "../../UserList/model/types/userListTypes";

export type AddUserType = Omit<User, "id">;
