import { RootState } from "..";

export const selectUser = (state: RootState) => state.userReducer.currentUser;

export const selectWorkspaceData = (state: RootState) => {
  return state.userReducer.currentUserWorkspace.id;
};
