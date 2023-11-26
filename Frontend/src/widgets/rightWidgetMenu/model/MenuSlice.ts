import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IState {
  isOpen: boolean;
  todoId: number | null;
}
export interface IMenu {
  state: IState;
}

const initialState: IMenu = {
  state: {
    isOpen: false,
    todoId: null,
  },
};

const MenuSlice = createSlice({
  name: "@@menu",
  initialState,
  reducers: {
    switchState: (state, action: PayloadAction<IState>) => {
      state.state = action.payload;
    },
  },
});

export default MenuSlice.reducer;
export const { switchState } = MenuSlice.actions;
