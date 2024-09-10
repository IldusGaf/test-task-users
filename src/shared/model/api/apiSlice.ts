import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tagTypes = ["userList", "userTypeList"];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes,
  endpoints: () => ({}),
});
