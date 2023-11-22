import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todoApi } from "./todoQueryApi/TodoServise";
import todoReduser from "./modal/modalSlice";
import userReducer from "./user/UserSlice";
import viewReducer from "./view/ViewSlice";
import menuReducer from "entities/RightMenu/model/MenuSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["menuReducer"],
};

const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
  todoReduser,
  userReducer,
  viewReducer,
  menuReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(todoApi.middleware),
  devTools: true,
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
