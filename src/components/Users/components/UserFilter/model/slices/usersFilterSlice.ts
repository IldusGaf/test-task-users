import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { IUserFilterStateType } from "../types/userFilterStateType";
import dayjs from "dayjs";

export type IUserFilterState = {
  selectedFilterData: IUserFilterStateType;
};

const initialState: IUserFilterState = {
  selectedFilterData: {
    last_visit_date: [
      dayjs().startOf("year").toISOString(),
      dayjs().toISOString(),
    ],
  },
};

export const usersFilterSlice = createSlice({
  name: "usersFilter",
  initialState,
  reducers: {
    setSelectedFilterData: (
      state,
      action: PayloadAction<IUserFilterStateType>
    ) => {
      state.selectedFilterData = action.payload;
    },
  },
});

export const { setSelectedFilterData } = usersFilterSlice.actions;
export const { reducer: userFilterReducer } = usersFilterSlice;
