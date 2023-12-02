import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalState: 0,
};

const ModalWindowColumnId = createSlice({
  name: "@@list",
  initialState,
  reducers: {
    columnModalId: (state, action: PayloadAction<number>) => {
      state.modalState = action.payload;
    },
  },
});

export default ModalWindowColumnId.reducer;
export const { columnModalId } = ModalWindowColumnId.actions;
