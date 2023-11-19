import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: false,
  todoId: null,
};

const MenuSlice = createSlice({
  name: "@@menu",
  initialState,
  reducers: {
    switchState: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
  },
});

export default MenuSlice.reducer;
export const { switchState } = MenuSlice.actions;
