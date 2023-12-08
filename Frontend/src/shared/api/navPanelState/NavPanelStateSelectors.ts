import { RootState } from "..";

export const selectNavPanelState = (state: RootState) =>
  state.navPanelStateReducer.activeNavElement;
