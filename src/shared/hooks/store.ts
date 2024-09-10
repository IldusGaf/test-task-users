import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
} from "../../app/providers/StoreProvider/config/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
