import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../../Users/model/types/userListTypes";
import { USER_LOCALSTORAGE_KEY } from "../../../../shared/const/localStorage";

type AuthState = {
  user: IUser | null;
};

const userFromLS = localStorage.getItem(USER_LOCALSTORAGE_KEY);

const initialState: AuthState = {
  user: userFromLS ? JSON.parse(userFromLS) : null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        // чтобы не хранить в браузере пароль, токен генерировать не стал
        JSON.stringify({ ...payload, password: "" })
      );
    },
    clearCredentials: (state) => {
      state.user = null;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
});

export const { setCredentials, clearCredentials } = loginSlice.actions;

export const { reducer: authReducer } = loginSlice;
