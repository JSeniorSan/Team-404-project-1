import { configureStore } from "@reduxjs/toolkit";
import { TodoSlice } from "./todo/todoSlice";

export const store = configureStore({
  reducer: TodoSlice.reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
