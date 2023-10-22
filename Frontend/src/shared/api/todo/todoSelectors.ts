import { RootState } from "..";

export const selectStatus = (state: RootState) => state.status;

export const selectAllTodos = (state: RootState) => state.intities;

export const selectErrors = (state: RootState) => state.errors;
