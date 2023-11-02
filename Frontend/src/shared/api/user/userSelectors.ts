import { RootState } from "..";

export const selectUser = (state: RootState) => state.userReducer.currentUser;
