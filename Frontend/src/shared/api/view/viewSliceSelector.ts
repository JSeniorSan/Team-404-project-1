import { RootState } from "..";

export const selectAllColums = (state: RootState) => state.viewReducer.colums;
export const selectView = (state: RootState) => state.viewReducer.widget;
