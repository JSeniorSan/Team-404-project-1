import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseAuth } from "../todoQueryApi/TodoServise";

const initialState = {
  user: {},
};

const UserSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IResponseAuth>) => {
      state.user = action.payload;
    },
  },
});
export default UserSlice.reducer;
export const { saveUser } = UserSlice.actions;
