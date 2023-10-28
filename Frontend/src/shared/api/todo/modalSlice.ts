import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { status: boolean } = {
  status: false,
};

export const ModalSlice = createSlice({
  name: "@@modal",
  initialState,
  reducers: {
    switchModalWindow: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { switchModalWindow } = ModalSlice.actions;
export default ModalSlice.reducer;
