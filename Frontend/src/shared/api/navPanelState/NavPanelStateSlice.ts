import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeNavElement: "",
};

const NavPanelStateSlice = createSlice({
  name: "@@activeWorkspace",
  initialState,
  reducers: {
    switchPanelState: (state, action: PayloadAction<string>) => {
      state.activeNavElement = action.payload;
    },
  },
});

export default NavPanelStateSlice.reducer;
export const { switchPanelState } = NavPanelStateSlice.actions;
