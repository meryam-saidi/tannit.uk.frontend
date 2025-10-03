import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accountReducer from "./accountSlice";
import { attachAuthToken } from "../api/axiosInstance";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
  },
});

attachAuthToken(() => store.getState().auth.token); // ← injection après création

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
