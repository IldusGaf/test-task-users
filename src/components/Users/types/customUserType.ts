import { User } from "../components/UserList/model/types/userListTypes";

export type CustomUserType = Omit<User, "id">;
