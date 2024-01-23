import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseAuth } from "../todoQueryApi/todoInterfaces";

export type currentUserType = {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  username: string;
};
export type userWorkspaceType = {
  id: number;
  empty: boolean;
  maxId: number;
};

export type initStateType = {
  currentUser: currentUserType;
  currentUserWorkspace: userWorkspaceType;
};

const initialState: initStateType = {
  currentUser: {} as currentUserType,
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
      state.currentUser = {} as currentUserType;
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
