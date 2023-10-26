import { RootState } from "..";

export const modalWindowSelector = (state: RootState) =>
  state.todoReduser.status;
