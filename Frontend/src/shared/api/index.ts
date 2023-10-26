import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todoApi } from "./todoQueryApi/TodoServise";
import todoReduser from "./todo/todoSlice";
const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
  todoReduser,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
