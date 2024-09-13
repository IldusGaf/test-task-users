import type { IUser } from "../../../Users/model/types/userListTypes";
import { apiSlice } from "../../../../shared/model/api/apiSlice";
import type { IReturn } from "../../../../shared/types";

export interface ILoginRequest {
  login: string;
  password: string;
}

export const loginApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IReturn<IUser | null>, ILoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation } = loginApi;
