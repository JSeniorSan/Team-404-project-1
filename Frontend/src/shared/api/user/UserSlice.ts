import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseAuth } from "../todoQueryApi/TodoServise";

const initialState = {
  currentUser: {},
  currentUserTodos: [],
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
  },
});
export default UserSlice.reducer;
export const { saveUser, deleteCurrentUser } = UserSlice.actions;
