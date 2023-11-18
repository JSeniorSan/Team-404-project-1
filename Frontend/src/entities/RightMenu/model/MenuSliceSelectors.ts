import { RootState } from "shared/api";

export const selectMenuState = (state: RootState) => state.menuReduceer.state;
