import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todoApi } from "./todoQueryApi/TodoServise";
import todoReduser from "./modal/modalSlice";
import userReducer from "./user/UserSlice";
import viewReducer from "./view/ViewSlice";
import menuReduceer from "entities/RightMenu/model/MenuSlice";
const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
  todoReduser,
  userReducer,
  viewReducer,
  menuReduceer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
