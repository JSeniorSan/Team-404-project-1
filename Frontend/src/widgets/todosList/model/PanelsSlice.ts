import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panels: [],
};

const PanelsSlice = createSlice({
  name: "@@panels",
  initialState,
  reducers: {
    addPanels: (state, action) => {
      state.panels = action.payload;
    },
  },
});

export default PanelsSlice.reducer;
