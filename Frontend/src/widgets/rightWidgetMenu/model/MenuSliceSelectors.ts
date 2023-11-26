import { RootState } from "shared/api";

export const selectMenuIsOpen = (state: RootState) =>
  state.menuReducer.state.isOpen;
export const selectMenuTodoId = (state: RootState) =>
  state.menuReducer.state.todoId;
