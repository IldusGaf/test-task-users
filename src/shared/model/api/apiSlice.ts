import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tagTypes = ["userList", "userTypeList", "user"];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes,
  endpoints: () => ({}),
});
