import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseAuth } from "../todoQueryApi/todoInterfaces";
import { ITodo } from "../todoQueryApi/todoInterfaces";

export interface IWorkspace {
  id: number;
  name: string;
  panels: IPanel[];
}

export interface IPanel {
  id: number;
  name: string;
  tasks: ITodo[];
}

const initialState = {
  currentUser: {},
  currentUserWorkspace: {
    id: 1,
    empty: false,
    maxId: 1,
  },
};

const UserSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IResponseAuth>) => {
      state.currentUser = action.payload;
    },
    deleteCurrentUser: (state) => {
      state.currentUser = {
        username: "",
        email: "",
        is_active: true,
        is_superuser: false,
        is_verified: false,
      };
    },
    addWorkspace: (state, action: PayloadAction<number>) => {
      state.currentUserWorkspace.id = action.payload;
    },
    setEmpty: (state, action: PayloadAction<boolean>) => {
      state.currentUserWorkspace.empty = action.payload;
    },
    setMaxId: (state, action: PayloadAction<number>) => {
      if (state.currentUserWorkspace.maxId < action.payload) {
        state.currentUserWorkspace.maxId = action.payload;
      }
    },
  },
});
export default UserSlice.reducer;
export const { saveUser, deleteCurrentUser, addWorkspace, setEmpty, setMaxId } =
  UserSlice.actions;
