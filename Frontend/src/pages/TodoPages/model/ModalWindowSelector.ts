import { RootState } from "shared/api";

export const selectModalWindowState = (state: RootState) =>
  state.modalWindowColumnIdReducer.modalState;
