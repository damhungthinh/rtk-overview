import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./config";
import user from "./features/users/slices";

// Config Redux store
const store = configureStore({
  reducer: {
    user,
    // Redux Toolkit Query for api fetch
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  const { api } = store.getState();
  console.log(api);
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
