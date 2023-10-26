import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { status: boolean } = {
  status: false,
};

export const TodoSlice = createSlice({
  name: "@@modal",
  initialState,
  reducers: {
    switchModalWindow: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { switchModalWindow } = TodoSlice.actions;
export default TodoSlice.reducer;
