import type { RootState } from "../../../../../../app/providers/StoreProvider/config/store";

export const getSelectedFilterData = (state: RootState) =>
  state.usersFilter.selectedFilterData;
