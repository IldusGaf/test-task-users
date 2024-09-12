import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../shared/model/api/apiSlice";
import { userFilterReducer } from "../../../../components/Users/components/UserFilter";

export const store = configureStore({
  reducer: {
    usersFilter: userFilterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
