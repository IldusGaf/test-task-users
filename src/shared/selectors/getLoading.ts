import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/providers/StoreProvider/config/store";

export const getLoading = (state: RootState) =>
  Object.values(state.api.queries).some(
    (entry) => entry?.status == QueryStatus.pending
  );
