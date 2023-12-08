import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeWorkspace: 0,
};

const WorkspaceHighlights = createSlice({
  name: "@@activeWorkspace",
  initialState,
  reducers: {
    switchActive: (state, action: PayloadAction<number>) => {
      state.activeWorkspace = action.payload;
    },
  },
});

export default WorkspaceHighlights.reducer;
export const { switchActive } = WorkspaceHighlights.actions;
