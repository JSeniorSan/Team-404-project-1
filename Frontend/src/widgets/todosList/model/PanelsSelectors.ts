import { RootState } from "shared/api";

export const selectCurrentTask = (state: RootState) => {
  if (state.panelReducer.tasks) {
    const current = state.panelReducer.tasks.find((elem) => {
      return elem.id === state.menuReducer.state.todoId;
    });
    console.log(current, state.menuReducer.state.todoId);

    return current;
  }
};
