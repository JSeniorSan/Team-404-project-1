import { RootState } from "..";

export const selectView = (state: RootState) => state.viewReducer.widget;
