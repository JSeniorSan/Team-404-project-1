import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  widget: "List",
  colums: { TODO: [], INWORK: [], COMPLITED: [] },
};

const ViewSlice = createSlice({
  name: "@@view",
  initialState,
  reducers: {
    switchWidget: (state, action: PayloadAction<string>) => {
      state.widget = action.payload;
    },
  },
});

export default ViewSlice.reducer;
export const { switchWidget } = ViewSlice.actions;
