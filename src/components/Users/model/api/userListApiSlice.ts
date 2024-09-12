import { DELETE, PATCH, POST } from "../../../../shared/const/common";
import { apiSlice } from "../../../../shared/model/api/apiSlice";
import type { IReturn } from "../../../../shared/types";
import type { IUserFilterStateType } from "../../components/UserFilter/model/types/userFilterStateType";
import type { IUser } from "../types/userListTypes";

const userListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query<
      IReturn<IUser[] | null>,
      IUserFilterStateType | null
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach((params) => {
            if (params[1]) {
              if (!Array.isArray(params[1])) {
                searchParams.append(params[0], params[1]?.toString());
              } else {
                params[1]?.forEach((q) =>
                  searchParams.append(params[0], String(q))
                );
              }
            }
          });
        }

        return `/user?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map((user) => ({
                type: "userList" as const,
                id: user.id,
              })),
              { type: "userList", id: "LIST" },
            ]
          : [{ type: "userList", id: "LIST" }],
    }),
    getUser: builder.query<IReturn<IUser | null>, { userId: number }>({
      query: ({ userId }) => `/user/${userId}`,
      providesTags: (result) =>
        result && result.data && result.data.id
          ? [
              {
                type: "userList",
                id: result.data.id,
              },
              {
                type: "user",
                id: "LIST",
              },
              { type: "userList", id: "LIST" },
            ]
          : [
              { type: "userList", id: "LIST" },
              {
                type: "user",
                id: "LIST",
              },
            ],
    }),
    addUser: builder.mutation<IReturn<IUser | null>, Omit<IUser, "id">>({
      query: (formBody) => {
        return {
          url: `/user`,
          method: POST,
          body: formBody,
        };
      },
      invalidatesTags: (result) =>
        result && result.data && result.data.id
          ? [
              {
                type: "userList",
                id: result.data.id,
              },
              { type: "userList", id: "LIST" },
            ]
          : [{ type: "userList", id: "LIST" }],
    }),
    editUser: builder.mutation<
      IReturn<IUser | null>,
      { userId: number } & Partial<Pick<IUser, "type_id" | "name">>
    >({
      query: (formBody) => {
        const { userId, ...formData } = formBody;
        return {
          url: `/user/${userId}`,
          method: PATCH,
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result && result.data && result.data.id
          ? [
              {
                type: "userList",
                id: result.data.id,
              },
            ]
          : [{ type: "userList", id: "LIST" }],
    }),

    deleteUser: builder.mutation<IReturn<IUser | null>, { userId: number }>({
      query: ({ userId }) => ({
        url: `/user/${userId}`,
        method: DELETE,
      }),
      invalidatesTags: (result) =>
        result && result.data && result.data.id
          ? [
              {
                type: "userList",
                id: result.data.id,
              },
            ]
          : [{ type: "userList", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserListQuery,
  useAddUserMutation,
  useGetUserQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = userListApiSlice;
