import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todoApi } from "./todoQueryApi/TodoServise";
import todoReduser from "./modal/modalSlice";
import userReducer from "./user/UserSlice";
import menuReducer from "widgets/rightWidgetMenu/model/MenuSlice";
import modalWindowColumnIdReducer from "pages/TodoPages/model/ModalWindowSlice";
import navPanelStateReducer from "shared/api/navPanelState/NavPanelStateSlice";
import { persistStore, persistReducer } from "redux-persist";
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
  menuReducer,
  modalWindowColumnIdReducer,
  navPanelStateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(todoApi.middleware),
  devTools: true,
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
