import { IUser } from "../model/types/userListTypes";

export type CustomUserType = Omit<IUser, "id">;
