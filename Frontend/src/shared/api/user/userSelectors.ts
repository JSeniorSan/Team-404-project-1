import { RootState } from "..";

export const selectUser = (state: RootState) => state.userReducer.currentUser;
export const selectUserTodos = (state: RootState) =>
  state.userReducer.currentUserTodos;
