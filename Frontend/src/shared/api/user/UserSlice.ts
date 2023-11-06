import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseAuth } from "../todoQueryApi/TodoServise";

export interface IWorkspace {
  id: number;
  name: string;
  panels: IPanel[];
}

export interface IPanel {
  id: number;
  name: string;
  tasks: ITask[];
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

const initialState = {
  currentUser: {},
  currentUserWorkspace: {},
};

const UserSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IResponseAuth>) => {
      state.currentUser = action.payload;
    },
    deleteCurrentUser: (state) => {
      state.currentUser = {};
    },
    addWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      state.currentUserWorkspace = action.payload;
    },
  },
});
export default UserSlice.reducer;
export const { saveUser, deleteCurrentUser, addWorkspace } = UserSlice.actions;
