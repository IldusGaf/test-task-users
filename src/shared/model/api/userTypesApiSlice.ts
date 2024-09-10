import { IReturn } from "../../types";
import { UserType } from "../../types/userTypes";
import { apiSlice } from "./apiSlice";

const userTypeListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserTypeList: builder.query<IReturn<UserType[] | null>, void>({
      query: () => "/userTypes",
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map((userType) => ({
                type: "userTypeList" as const,
                id: userType.id,
              })),
              { type: "userTypeList", id: "LIST" },
            ]
          : [{ type: "userTypeList", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserTypeListQuery } = userTypeListApiSlice;
