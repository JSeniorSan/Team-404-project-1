import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";
import { IPanel } from "shared/api/user/UserSlice";

export interface IPanelsSlice {
  panels: IPanel[];
  tasks: ITodo[];
}

const initialState: IPanelsSlice = {
  panels: [],
  tasks: [],
};

const PanelsSlice = createSlice({
  name: "@@panels",
  initialState,
  reducers: {
    addPanels: (state, action: PayloadAction<IPanel[]>) => {
      state.panels = action.payload;
    },

    addTasks: (state, action: PayloadAction<ITodo[]>) => {
      state.tasks = action.payload;
    },
  },
});

export default PanelsSlice.reducer;
export const { addPanels, addTasks } = PanelsSlice.actions;
